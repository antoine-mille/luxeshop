"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateLike(productId: string, userId: string) {
  try {
    const existingLike = await prisma.userProductLike.findUnique({
      where: {
        userId_productId: {
          productId,
          userId,
        },
      },
    })

    if (existingLike) {
      await prisma.userProductLike.delete({
        where: {
          userId_productId: {
            productId,
            userId,
          },
        },
      })
    } else {
      await prisma.userProductLike.create({
        data: {
          productId,
          userId,
        },
      })
    }

    revalidatePath("/")
  } catch (error) {
    console.error(`Error updating like: ${error}`)
  }
}
