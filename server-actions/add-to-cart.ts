"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function addToCart(productId: string, userId: string) {
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        userId,
        status: "ACTIVE",
      },
      include: {
        CartItem: {
          where: {
            productId,
          },
        },
      },
    })

    if (!cart) {
      await prisma.cart.create({
        data: {
          userId,
          status: "ACTIVE",
          CartItem: {
            create: {
              productId,
              quantity: 1,
            },
          },
        },
      })
    } else {
      const cartItem = cart.CartItem[0]
      if (!cartItem) {
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            quantity: 1,
          },
        })
      } else {
        await prisma.cartItem.update({
          where: {
            id: cartItem.id,
          },
          data: {
            quantity: cartItem.quantity + 1,
          },
        })
      }
    }
  } catch (error) {
    console.error(`Error on addToCart: ${error}`)
    return false
  }

  revalidatePath("/")
  return true
}
