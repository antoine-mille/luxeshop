import { prisma } from "@/lib/prisma"
import { Discount, ProductDiscount } from "@prisma/client"
import { DiscountRow } from "@/components/DiscountRow"
import { cn } from "@/lib/merge"
import { ProductGridLayout } from "@/components/layouts/ProductGridLayout"

type DiscountLayoutProps = {
  discount: Discount
  productsDiscount: ProductDiscount[]
  className?: string
}

const DiscountLayout = async ({
  discount,
  productsDiscount,
  className,
}: DiscountLayoutProps) => {
  // Get the products that are currently being discounted
  const initialData = await prisma.product.findMany({
    take: 8,
    where: {
      id: {
        in: productsDiscount.map(
          (productDiscount) => productDiscount.productId
        ),
      },
    },
    include: {
      Image: {
        where: {
          isMain: true,
        },
      },
    },
  })

  // Find the discount rate for a product
  const findRateByProductId = (productId: string) => {
    return productsDiscount.find(
      (productDiscount) => productDiscount.productId === productId
    )?.rate
  }

  // Convert the data to the format that the ProductsLayout component expects
  const products = initialData.map((product) => ({
    ...product,
    imageUrl: product.Image[0].imageUrl,
    rate: findRateByProductId(product.id),
  }))

  return (
    <section className={cn("flex flex-col gap-4", className)}>
      <DiscountRow discount={discount} />
      <ProductGridLayout products={products} />
    </section>
  )
}

export { DiscountLayout }
