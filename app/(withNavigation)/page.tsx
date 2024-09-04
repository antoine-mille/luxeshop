import { Header } from "@/components/Header"
import { DiscountLayout } from "@/components/layouts/DiscountLayout"
import { SearchLayout } from "@/components/layouts/SearchLayout"
import { ShortCategoriesLayout } from "@/components/layouts/ShortCategoriesLayout"
import { prisma } from "@/lib/prisma"

export default async function Home() {
  // Get the first 8 categories
  const categories = await prisma.category.findMany({
    take: 8,
  })

  // Get the discount that is currently being promoted
  const discounts = await prisma.discount.findMany({
    take: 3,
    where: {
      isPromoted: true,
    },
    include: {
      ProductDiscount: true,
    },
  })

  return (
    <main className="flex size-full flex-col gap-4 p-3">
      <Header />
      <SearchLayout />
      <ShortCategoriesLayout categories={categories} className="mt-2" />
      {discounts.map((discount) => (
        <DiscountLayout
          key={discount.id}
          discount={discount}
          productsDiscount={discount.ProductDiscount}
          className="mt-4"
        />
      ))}
    </main>
  )
}
