import { formattedPrice } from "@/lib/utils"

type TotalOrderProps = {
  numberOfItems: number
  totalPriceWithDiscount: number
}

const TotalOrder = ({
  numberOfItems,
  totalPriceWithDiscount,
}: TotalOrderProps) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-black">Subtotal, {numberOfItems} items</p>
      <p className="text-lg text-orange">
        {formattedPrice(totalPriceWithDiscount)}
      </p>
    </div>
  )
}

export { TotalOrder }
