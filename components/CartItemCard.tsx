import { auth } from "@/auth"
import { cn } from "@/lib/merge"
import Image from "next/image"
import { ProductWithPriceAndDiscount } from "@/components/ProductWithPriceAndDiscount"
import { LikeButton } from "@/components/LikeButton"
import { hasUserLiked } from "@/lib/utils"
import { CartInputNumber } from "@/components/ui/InputNumber"
import { CartItem, Product } from "@prisma/client"
import { TrashCartItem } from "@/components/Trash"

type CartItemCardProps = {
  imageUrl: string
  product: Product
  rate: number
  cartItem: CartItem
  className?: string
}

const CartItemCard = async ({
  imageUrl,
  product: { id: productId, name: productName, price: productPrice },
  rate,
  cartItem,
  className,
}: CartItemCardProps) => {
  const session = await auth()

  const isLiked = await hasUserLiked(productId, session?.user?.id)

  return (
    <div
      className={cn(
        "border border-gray-light/40 w-full p-4 rounded-md flex flex-col gap-4 [@media(min-width:421px)]:flex-row relative",
        className
      )}
    >
      <Image
        src={imageUrl}
        width={728}
        height={666}
        alt={`Image of ${productName}`}
        className="aspect-[364_333] h-36 w-fit [@media(max-width:420px)]:mx-auto"
      />
      <div className="flex flex-1 flex-col gap-1">
        <p className="line-clamp-1 text-gray-light">{productName}</p>
        <ProductWithPriceAndDiscount
          initialPrice={productPrice}
          rate={rate}
          withBadge
        />
        <div className="mt-2 flex justify-between">
          <LikeButton
            isLiked={isLiked}
            productId={productId}
            userId={session?.user?.id}
          />
          <CartInputNumber cartItem={cartItem} />
        </div>
      </div>
      <TrashCartItem cartItem={cartItem} />
    </div>
  )
}

export { CartItemCard }
