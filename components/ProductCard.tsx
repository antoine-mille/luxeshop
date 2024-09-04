import { hasUserLiked } from "@/lib/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import { Badge } from "@/components/Badge"
import { LikeButton } from "@/components/LikeButton"
import { auth } from "@/auth"
import Link from "next/link"
import { ProductWithPriceAndDiscount } from "./ProductWithPriceAndDiscount"

type ProductCardProps = {
  product: Product
  imageUrl: string
  rate?: number
}

const ProductCard = async ({
  product,
  imageUrl,
  rate = 0,
}: ProductCardProps) => {
  const session = await auth()

  const isLiked = await hasUserLiked(product.id, session?.user?.id)

  return (
    <Link
      href={`/products?productId=${product.id}`}
      className="group relative w-full rounded-xl border border-gray-light/40 px-4 pb-4 text-sm"
    >
      <div className="relative">
        <Image
          src={imageUrl}
          width={728}
          height={666}
          alt={`Image of ${product.name}`}
          className="aspect-[364_333] size-full"
        />
        {rate > 0 && (
          <Badge className="absolute right-0 top-0 translate-y-1/2">
            {`${rate * 100}% off`}
          </Badge>
        )}
      </div>
      <ProductWithPriceAndDiscount
        className="mt-3.5"
        initialPrice={product.price}
        rate={rate}
      >
        <p className="truncate text-gray-light">{product.name}</p>
      </ProductWithPriceAndDiscount>
      <LikeButton
        isLiked={isLiked}
        className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 opacity-0 hover:opacity-100 group-hover:opacity-100"
        productId={product.id}
        userId={session?.user?.id}
      />
    </Link>
  )
}

export { ProductCard }
