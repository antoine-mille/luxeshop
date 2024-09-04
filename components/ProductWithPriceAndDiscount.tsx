import { formattedPrice, getPriceWithDiscount } from "@/lib/utils"

import { Badge } from "@/components/Badge"
import { cn } from "@/lib/merge"

type ProductWithPriceAndDiscountProps = {
  initialPrice: number
  rate: number
  withBadge?: boolean
  className?: string
  children?: React.ReactNode
}

const ProductWithPriceAndDiscount = ({
  initialPrice,
  rate,
  withBadge = false,
  className,
  children,
}: ProductWithPriceAndDiscountProps) => {
  const defaultPrice = formattedPrice(initialPrice)
  const formattedPriceWithDiscount =
    rate > 0
      ? formattedPrice(getPriceWithDiscount(initialPrice, rate))
      : defaultPrice

  const formattedRate = `${rate * 100}% off`

  if (withBadge) {
    return (
      <>
        <div className="flex items-center gap-3">
          <p className="text-xl font-medium text-black">
            {formattedPriceWithDiscount}
          </p>
          {rate > 0 && <Badge>{formattedRate}</Badge>}
        </div>
        {rate > 0 && (
          <p className="text-gray-light line-through">{defaultPrice}</p>
        )}
      </>
    )
  }

  return (
    <div className={cn("mt-3.5 flex flex-col gap-1", className)}>
      {children}
      <p className="text-lg font-medium text-black">
        {formattedPriceWithDiscount}
      </p>
      {rate > 0 && (
        <p className="text-gray-light line-through">{defaultPrice}</p>
      )}
    </div>
  )
}

export { ProductWithPriceAndDiscount }
