import { Product } from "@prisma/client"
import { cn } from "@/lib/merge"
import { ProductCard } from "@/components/ProductCard"

type ProductWithImageAndDiscount = Product & {
  imageUrl: string
  rate?: number
}

type ProductGridLayoutProps = {
  products: ProductWithImageAndDiscount[]
  className?: string
}

const ProductGridLayout = async ({
  products,
  className,
}: ProductGridLayoutProps) => {
  return (
    <div className={cn("grid grid-cols-2 gap-4 auto-rows-fr", className)}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          imageUrl={product.imageUrl}
          rate={product.rate}
        />
      ))}
    </div>
  )
}

export { ProductGridLayout }
