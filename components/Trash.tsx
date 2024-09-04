"use client"

import { deleteCartItem } from "@/server-actions/delete-cart-item"
import { CartItem } from "@prisma/client"
import { Trash } from "lucide-react"

type TrashProps = {
  cartItem: CartItem
}

const TrashCartItem = ({ cartItem }: TrashProps) => {
  const handleClick = async () => {
    await deleteCartItem(cartItem.id)
  }

  return (
    <Trash
      className="absolute right-3 top-3 size-5 cursor-pointer text-red-500 transition-colors duration-300 hover:text-red-600"
      onClick={handleClick}
    />
  )
}

export { TrashCartItem }
