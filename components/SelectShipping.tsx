"use client"

import { cn } from "@/lib/merge"
import { formattedPrice } from "@/lib/utils"
import { useOrderStore } from "@/stores/order.store"
import { ShippingMethod } from "@prisma/client"
import { useShallow } from "zustand/react/shallow"

type SelectShippingProps = {
  shippingMethods: ShippingMethod[]
}

const SelectShipping = ({ shippingMethods }: SelectShippingProps) => {
  const getEstimatedArrive = (shippingMethod: ShippingMethod) => {
    const currentDate = new Date()
    return `${currentDate.getDate() + shippingMethod.estimatedDeliveryTime - 1} - ${currentDate.getDate() + shippingMethod.estimatedDeliveryTime} ${currentDate.toLocaleString("en-US", { month: "long" })}`
  }

  const [shippingMethod, setShippingMethod] = useOrderStore(
    useShallow((state) => [state.shippingMethod, state.setShippingMethod])
  )

  const handleClick = (currentShippingMethod: ShippingMethod) => {
    if (currentShippingMethod.id !== shippingMethod?.id) {
      setShippingMethod(currentShippingMethod)
    }
  }

  return (
    <>
      {shippingMethods.map((currentShippingMethod) => (
        <button
          key={currentShippingMethod.id}
          className={cn(
            "flex border border-gray-light/40 rounded-md p-4",
            shippingMethod?.id === currentShippingMethod.id && "border-orange"
          )}
          onClick={() => handleClick(currentShippingMethod)}
        >
          <div className="flex flex-1 flex-col gap-1 text-sm">
            <p>{currentShippingMethod.name}</p>
            <p className="text-gray-light">
              Estimated arrive {getEstimatedArrive(currentShippingMethod)}
            </p>
          </div>
          <p className="flex items-center justify-center text-sm">
            {formattedPrice(currentShippingMethod.price)}
          </p>
        </button>
      ))}
    </>
  )
}

export { SelectShipping }
