"use client"

import { Discount } from "@prisma/client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useIsClient } from "usehooks-ts"
import { Badge } from "@/components/Badge"
import { getTimeRemaining } from "@/lib/utils"

type DiscountRowProps = {
  discount: Discount
}

const DiscountRow = ({ discount }: DiscountRowProps) => {
  if (!discount.isPromoted || !discount.discountExpiration) {
    throw new Error("Discount must be promoted and have an expiration date")
  }

  const initialTimeRemaining = getTimeRemaining(discount.discountExpiration)
  const [formattedExpiration, setFormattedExpiration] =
    useState(initialTimeRemaining)
  const isClient = useIsClient()

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFormattedExpiration(getTimeRemaining(discount.discountExpiration!))
    }, 1000)

    return () => clearInterval(intervalId)
  }, [discount.discountExpiration])

  return (
    <div className="flex items-center gap-3">
      <h2 className="text-xl font-medium text-black">{discount.name}</h2>
      <div className="flex select-none items-center gap-1.5 text-xs">
        <p className="text-gray-light">Ends in</p>
        <Badge className="min-w-20 bg-red-500 px-0 text-center text-white">
          {isClient ? formattedExpiration : "00 : 00 : 00"}
        </Badge>
      </div>
      <Link
        href="#"
        className="ml-auto text-sm text-orange transition-colors duration-300 hover:text-orange/80"
      >
        See all
      </Link>
    </div>
  )
}

export { DiscountRow }
