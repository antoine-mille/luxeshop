"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

type Params = {
  city: string
  street: string
  postalCode: string
  userId: string
}

export async function saveAddress({
  city,
  street,
  postalCode,
  userId,
}: Params) {
  try {
    const address = await prisma.address.create({
      data: {
        city,
        street,
        postalCode,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })

    revalidatePath("/")

    return address
  } catch (error) {
    console.error(error)
    return null
  }
}
