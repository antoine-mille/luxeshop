import { auth } from "@/auth"
import { CartButton } from "@/components/CartButton"
import { CheckoutButton } from "@/components/CheckoutButton"
import { Footer } from "@/components/Footer"
import { LikeButton } from "@/components/LikeButton"
import { PageHeader } from "@/components/PageHeader"
import { ProductCarousel } from "@/components/ProductCarousel"
import { ProductWithPriceAndDiscount } from "@/components/ProductWithPriceAndDiscount"
import { prisma } from "@/lib/prisma"

import { hasUserLiked } from "@/lib/utils"

type ProductsProps = {
  searchParams: {
    productId: string
  }
}

export default async function Search({
  searchParams: { productId },
}: ProductsProps) {
  const session = await auth()

  const initialData = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      Image: true,
      ProductDiscount: true,
    },
  })

  if (!initialData) {
    throw new Error("Product not found")
  }

  const rate = initialData.ProductDiscount?.rate || 0

  const isLiked = await hasUserLiked(initialData.id, session?.user?.id)

  return (
    <main className="flex size-full flex-col gap-8 p-3">
      <Footer>
        <CartButton productId={productId} userId={session?.user?.id} />
        <CheckoutButton />
      </Footer>
      <PageHeader title="Detail Product" />
      <ProductCarousel images={initialData.Image} />
      <div className="flex items-center justify-between">
        <p className="truncate text-lg text-black">{initialData.name}</p>
        <LikeButton
          isLiked={isLiked}
          productId={initialData.id}
          userId={session?.user?.id}
        />
      </div>
      <div className="flex flex-col gap-1">
        <ProductWithPriceAndDiscount
          initialPrice={initialData.price}
          rate={rate}
          withBadge
        />

        <div className="mt-2 flex flex-col gap-2">
          <h3 className="font-medium text-black">Description Product</h3>
          <p className="line-clamp-4 text-sm text-gray-light">
            {initialData.description}
          </p>
        </div>
      </div>
    </main>
  )
}
