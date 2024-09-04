"use client"

import { Button } from "@/components/ui/Button"
import { useToast } from "@/hooks/use-toast"
import { addToCart } from "@/server-actions/add-to-cart"
import { ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"

type CartButtonProps = {
  productId: string
  userId?: string
}

const CartButton = ({ productId, userId }: CartButtonProps) => {
  const router = useRouter()
  const { toast } = useToast()

  if (!userId) return null

  const handleClick = async () => {
    const isSuccess = await addToCart(productId, userId)
    if (!isSuccess) {
      toast({
        title: "Error",
        description: "An error occurred while adding the product to your cart",
        variant: "destructive",
      })
      return
    }
    router.push("/cart")
  }

  return (
    <Button
      className="min-w-36 hover:bg-gray-light/10"
      icons={{
        leadingComponent: () => <ShoppingBag className="size-5" />,
      }}
      onClick={handleClick}
    >
      Add to Cart
    </Button>
  )
}

export { CartButton }
