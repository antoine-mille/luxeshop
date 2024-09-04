"use server"

import { prisma } from "@/lib/prisma"
import { stripe } from "@/lib/stripe"

type CartItem = {
  product: {
    price: number
    ProductDiscount: {
      rate: number
    } | null
  }
  quantity: number
}

function getTotalPrice(cartItems: CartItem[]) {
  return cartItems.reduce((acc, { product, quantity }) => {
    const price = product.price
    const discountRate = product.ProductDiscount?.rate || 0
    const discount = price * discountRate
    const discountedPrice = price - discount
    return acc + discountedPrice * quantity
  }, 0)
}

type CreateOrderProps = {
  data: {
    userId: string
    cartId: string
    shippingAddressId: string
    shippingMethodId: string
    note?: string
  }
}

export async function createOrder({
  data: { userId, cartId, shippingAddressId, shippingMethodId, note },
}: CreateOrderProps) {
  try {
    const createdOrder = await prisma.order.create({
      data: {
        userId,
        cartId,
        shippingAddressId,
        shippingMethodId,
        note,
      },
      select: {
        id: true,
        shippingMethod: {
          select: {
            price: true,
          },
        },
      },
    })

    const cart = await prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        status: "COMPLETED",
      },
      select: {
        CartItem: {
          select: {
            quantity: true,
            product: {
              select: {
                price: true,
                ProductDiscount: {
                  select: {
                    rate: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        stripeCustomerId: true,
      },
    })

    if (!user) {
      console.error(`User not found: ${userId}`)
      return null
    }

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount:
        Math.round(
          getTotalPrice(cart.CartItem) + createdOrder.shippingMethod.price
        ) * 100,
      currency: "eur",
      customer: user.stripeCustomerId || undefined,
      payment_method_types: ["card"],
    })

    if (!paymentIntent) {
      console.error(
        `Failed to create payment intent for order: ${createdOrder.id}`
      )
      return null
    }

    const orderWithPaymentIntent = await prisma.order.update({
      where: {
        id: createdOrder.id,
      },
      data: {
        paymentIntentId: paymentIntent.id,
      },
    })

    return {
      order: orderWithPaymentIntent,
      clientSecret: paymentIntent.client_secret,
    }
  } catch (error) {
    console.error(`Error on createOrder: ${error}`)
    return null
  }
}
