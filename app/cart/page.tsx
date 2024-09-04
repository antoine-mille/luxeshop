import { auth } from "@/auth"
import { CartItemCard } from "@/components/CartItemCard"
import { CheckoutButton } from "@/components/CheckoutButton"
import { Footer } from "@/components/Footer"
import { PageHeader } from "@/components/PageHeader"
import { getUserCart } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default async function Cart() {
  const session = await auth()
  const userCart = await getUserCart(session?.user?.id)

  // Sort by article price and then by name
  const items = userCart?.CartItem.sort(
    (a, b) =>
      b.product.price - a.product.price ||
      a.product.name.localeCompare(b.product.name)
  )

  return (
    <main className="flex size-full flex-col gap-6 p-3 text-sm">
      <Footer>
        <CheckoutButton className="min-w-[80%]" />
      </Footer>
      <PageHeader title="My Cart" />

      {items && items.length > 0 && (
        <section className="flex flex-col gap-3">
          {items?.map((cartItem) => {
            const { id, product } = cartItem
            const imageUrl = product.Image.at(0)?.imageUrl

            if (!imageUrl)
              throw new Error(
                `Product with id ${product.id} does not have an main image`
              )

            return (
              <CartItemCard
                key={id}
                imageUrl={imageUrl}
                product={product}
                rate={product.ProductDiscount?.rate || 0}
                cartItem={cartItem}
              />
            )
          })}
        </section>
      )}

      {(!items || items.length === 0) && (
        <>
          <p className="text-sm text-gray-500">
            Your cart is empty.
            <Link
              href="/"
              className="transition-all duration-300 hover:text-orange hover:underline hover:underline-offset-1"
            >
              Start adding items to it!
            </Link>
          </p>
          <Image
            src="no-results.svg"
            alt="No results found"
            width={300}
            height={300}
            className="mx-auto"
          />
        </>
      )}
    </main>
  )
}
