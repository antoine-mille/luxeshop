"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteCartItem(cartItemId: string) {
  try {
    await prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    })
    revalidatePath("/cart")
  } catch (error) {
    console.error(`Error deleting cart item: ${error}`)
  }
}
