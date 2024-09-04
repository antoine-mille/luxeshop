"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

type UpdateUserAddressInput = {
  userId: string
  addressId: string
  isDefault: boolean
}

export async function updateUserAddress({
  userId,
  addressId,
  isDefault,
}: UpdateUserAddressInput) {
  try {
    // Update the user address
    await prisma.address.update({
      where: {
        id: addressId,
        userId,
      },
      data: {
        isDefault,
      },
    })

    if (isDefault) {
      // Update the other addresses to not be default
      await prisma.address.updateMany({
        where: {
          userId,
          id: {
            not: addressId,
          },
        },
        data: {
          isDefault: false,
        },
      })
    }

    revalidatePath("/")

    return true
  } catch (error) {
    console.error(`Failed to update user address: ${error}`)
    return null
  }
}
