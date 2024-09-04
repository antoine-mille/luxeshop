import { auth } from "@/auth"
import { AddressCheckout } from "@/components/AddressCheckout"
import { CheckoutProductCard } from "@/components/CheckoutProductCard"
import { NoteOrder } from "@/components/NoteOrder"
import { PageHeader } from "@/components/PageHeader"
import { SelectShipping } from "@/components/SelectShipping"
import { TotalOrder } from "@/components/TotalOrder"
import { prisma } from "@/lib/prisma"
import { getPriceWithDiscount } from "@/lib/utils"
import Link from "next/link"
import { StripeCardElement } from "@/components/StripeCardElement"
import { CheckoutFooter } from "@/components/CheckoutFooter"

export default async function CheckoutPage() {
  const session = await auth()

  const addresses = await prisma.address.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      id: "asc",
    },
  })

  const cart = await prisma.cart.findFirst({
    where: {
      userId: session?.user?.id,
      status: "ACTIVE",
    },
    include: {
      CartItem: {
        include: {
          product: {
            include: {
              Image: true,
              ProductDiscount: true,
            },
          },
        },
      },
    },
  })

  const methods = await prisma.shippingMethod.findMany()

  // Get total items of cart
  const numberOfItems = cart?.CartItem.reduce((acc, item) => {
    return acc + item.quantity
  }, 0)

  const totalPriceWithDiscount =
    cart?.CartItem.reduce((acc, item) => {
      const price = item.product.price
      const discount = item.product.ProductDiscount?.rate || 0
      const discountedPrice = getPriceWithDiscount(price, discount)
      return acc + discountedPrice * item.quantity
    }, 0) || 0

  return (
    <main className="flex size-full flex-col gap-8 p-3">
      <CheckoutFooter
        data={{
          userId: session?.user?.id,
          cartId: cart?.id,
          shippingAddressId: addresses
            .filter((address) => address.isDefault)
            .at(0)?.id,
          totalPriceWithDiscount,
        }}
      />
      <PageHeader title="Checkout" />
      <AddressCheckout userId={session?.user?.id} addresses={addresses} />
      <section className="flex flex-col gap-3">
        {cart?.CartItem.map((item) => (
          <CheckoutProductCard
            key={item.product.id}
            quantity={item.quantity}
            product={item.product}
            imageUrl={item.product.Image[0].imageUrl}
            rate={item.product.ProductDiscount?.rate || 0}
          />
        ))}
      </section>
      <section className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg text-black">Select Shipping</h2>
          <Link
            href="#"
            className="cursor-pointer text-sm text-orange transition-colors duration-300 hover:text-orange/80"
          >
            See all options
          </Link>
        </div>
        <SelectShipping shippingMethods={methods} />
        <NoteOrder />
        <TotalOrder
          numberOfItems={numberOfItems || 0}
          totalPriceWithDiscount={totalPriceWithDiscount}
        />
      </section>

      <section className="mb-3 flex flex-col gap-3">
        <h2 className="text-lg text-black">Payment Method</h2>
        <StripeCardElement />
      </section>
    </main>
  )
}
