"use client"

import { useToast } from "@/hooks/use-toast"
import { updateCartItemQuantity } from "@/server-actions/update-cart-item-quantity"
import { CartItem } from "@prisma/client"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"

type InputNumberProps = {
  defaultValue?: number
  onChange?: (value: number) => void
}

const InputNumber = ({ defaultValue = 1, onChange }: InputNumberProps) => {
  const [value, setValue] = useState(defaultValue)

  const handleClick = (type: "plus" | "minus") => {
    const newValue = type === "plus" ? value + 1 : value - 1

    if (type === "plus" ? newValue <= 99 : newValue >= 1) {
      setValue(newValue)
      onChange?.(newValue)
    }
  }

  const iconClasses =
    "size-6 border border-orange rounded-md p-1 text-orange cursor-pointer transition-colors duration-300 hover:bg-orange/10"

  return (
    <div className="flex select-none items-center">
      <Minus className={iconClasses} onClick={() => handleClick("minus")} />
      <p className="min-w-10 text-center text-base">{value}</p>
      <Plus className={iconClasses} onClick={() => handleClick("plus")} />
    </div>
  )
}

type CartInputNumberProps = {
  cartItem: CartItem
}

const CartInputNumber = ({ cartItem }: CartInputNumberProps) => {
  const { toast } = useToast()

  const handleChange = async (value: number) => {
    const isSuccess = await updateCartItemQuantity(cartItem.id, value)
    if (!isSuccess) {
      toast({
        title: "Error",
        description: "Failed to update cart item quantity",
        variant: "destructive",
      })
    }
  }

  return (
    <InputNumber defaultValue={cartItem.quantity} onChange={handleChange} />
  )
}

export { InputNumber, CartInputNumber }
