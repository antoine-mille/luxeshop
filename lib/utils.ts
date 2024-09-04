import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { prisma } from "@/lib/prisma"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/-+/g, "-") // Replace multiple - with single -
}

export function getTimeRemaining(expirationDate: Date) {
  const now = new Date()
  const timeDifference = new Date(expirationDate).getTime() - now.getTime()

  if (timeDifference <= 0) {
    return "00 : 00 : 00"
  }

  const hours = String(Math.floor(timeDifference / (1000 * 60 * 60))).padStart(
    2,
    "0"
  )
  const minutes = String(
    Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
  ).padStart(2, "0")
  const seconds = String(
    Math.floor((timeDifference % (1000 * 60)) / 1000)
  ).padStart(2, "0")

  return `${hours} : ${minutes} : ${seconds}`
}

export function getPriceWithDiscount(price: number, discountRate: number) {
  return price - price * discountRate
}

export function formattedPrice(price: number) {
  return price.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  })
}

export function createSearchTsQuery(search: string) {
  return search
    .split(" ")
    .map((word) => `${word}:*`)
    .join(" & ")
}

export async function hasUserLiked(productId: string, userId?: string) {
  if (!userId) {
    return false
  }

  const isLiked = await prisma.userProductLike.findUnique({
    where: {
      userId_productId: {
        productId,
        userId,
      },
    },
  })

  return !!isLiked
}

export async function getUserCart(userId?: string) {
  if (!userId) {
    return null
  }

  const cartWithItems = await prisma.cart.findFirst({
    where: {
      userId,
      status: "ACTIVE",
    },
    include: {
      CartItem: {
        include: {
          product: {
            include: {
              ProductDiscount: true,
              Image: {
                select: {
                  imageUrl: true,
                },
                where: {
                  isMain: true,
                },
              },
            },
          },
        },
      },
    },
  })

  return cartWithItems || null
}
