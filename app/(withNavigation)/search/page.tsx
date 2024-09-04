import { BackButton } from "@/components/BackButton"
import { ProductGridLayout } from "@/components/layouts/ProductGridLayout"
import { SearchInput } from "@/components/SearchInput"
import { prisma } from "@/lib/prisma"
import { createSearchTsQuery } from "@/lib/utils"
import Image from "next/image"

type SearchProps = {
  searchParams: {
    q: string
  }
}

export default async function Search({ searchParams }: SearchProps) {
  const { q } = searchParams

  const initialData = await prisma.product.findMany({
    where: {
      name: {
        search: createSearchTsQuery(q),
      },
    },
    include: {
      Image: {
        where: {
          isMain: true,
        },
      },
      ProductDiscount: true,
    },
  })

  // Convert the data to the format that the ProductsLayout component expects
  const products = initialData.map((product) => ({
    ...product,
    imageUrl: product.Image[0].imageUrl,
    rate: product.ProductDiscount?.rate,
  }))

  return (
    <main className="flex size-full flex-col gap-8 p-3">
      <div className="flex items-center gap-4">
        <BackButton />
        <SearchInput defaultValue={q} className="flex-1" />
      </div>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-medium text-black">
          Search results for {`"${q}"`}
        </h2>
        {products.length === 0 && (
          <>
            <p className="text-sm text-gray-500">
              No results found for your search.
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
        {products.length > 0 && <ProductGridLayout products={products} />}
      </section>
    </main>
  )
}
