"use client"

import { cn } from "@/lib/merge"
import { updateLike } from "@/server-actions/update-like"
import { Heart } from "lucide-react"

type LikeButtonProps = {
  isLiked: boolean
  className?: string
  userId?: string
  productId: string
}

const LikeButton = ({
  isLiked,
  className,
  userId,
  productId,
}: LikeButtonProps) => {
  if (!userId) return null

  const handleClick = async (event: React.MouseEvent) => {
    event.preventDefault()
    await updateLike(productId, userId)
  }

  return (
    <Heart
      className={cn(
        "fill-white cursor-pointer text-red-500 transition-all duration-300",
        isLiked && "fill-red-500 hover:fill-red-600 hover:text-red-600",
        !isLiked && "hover:fill-red-500",
        className
      )}
      onClick={(event) => handleClick(event)}
    />
  )
}

export { LikeButton }
