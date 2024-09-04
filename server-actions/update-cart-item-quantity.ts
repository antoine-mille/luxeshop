"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateCartItemQuantity(
  cartItemId: string,
  quantity: number
) {
  try {
    await prisma.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity,
      },
    })
    revalidatePath("/cart")
    return true
  } catch (error) {
    console.error(`Error on updateCartItemQuantity: ${error}`)
    return false
  }
}
