import Image from "next/image"
import Link from "next/link"
import { ProductWithPriceAndDiscount } from "@/components/ProductWithPriceAndDiscount"
import { Product } from "@prisma/client"

type CheckoutProductCardProps = {
  quantity: number
  product: Product
  imageUrl: string
  rate: number
}

const CheckoutProductCard = ({
  quantity,
  product,
  imageUrl,
  rate,
}: CheckoutProductCardProps) => {
  return (
    <Link
      href={`/products?productId=${product.id}`}
      className="flex gap-2 rounded-md border border-transparent p-4 hover:border-gray-light/40 [@media(max-width:508px)]:flex-col [@media(max-width:508px)]:items-center"
    >
      <Image
        src={imageUrl}
        alt={`Image of ${product.name}`}
        width={728}
        height={666}
        className="aspect-[364_333] max-w-48"
      />
      <div className="flex flex-col gap-1.5">
        <p className="line-clamp-2">{product.name}</p>
        <p className="line-clamp-3 text-left text-sm text-gray-light ">
          {product.description}
        </p>
        <ProductWithPriceAndDiscount
          initialPrice={product.price}
          rate={rate}
          className="flex-row-reverse items-center gap-3.5"
        >
          <p className="ml-auto text-sm text-gray-light">x{quantity}</p>
        </ProductWithPriceAndDiscount>
      </div>
    </Link>
  )
}

export { CheckoutProductCard }
