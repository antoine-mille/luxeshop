"use client"

import { Footer } from "@/components/Footer"
import { formattedPrice } from "@/lib/utils"
import { CheckoutButton } from "@/components/CheckoutButton"
import { useOrderStore } from "@/stores/order.store"
import { useShallow } from "zustand/react/shallow"

type CheckoutFooterProps = {
  data: {
    userId: string | undefined
    cartId: string | undefined
    shippingAddressId: string | undefined
    totalPriceWithDiscount: number
  }
}

const CheckoutFooter = ({
  data: { userId, cartId, shippingAddressId, totalPriceWithDiscount },
}: CheckoutFooterProps) => {
  const shippingMethod = useOrderStore(
    useShallow((state) => state.shippingMethod)
  )

  return (
    <Footer className="justify-around px-4">
      <div>
        <p className="text-sm text-gray-light">Total</p>
        <p className="text-base text-black">
          {formattedPrice(
            totalPriceWithDiscount + (shippingMethod?.price || 0)
          )}
        </p>
      </div>
      <CheckoutButton
        isSubmit
        submitData={{
          userId,
          cartId,
          shippingAddressId,
        }}
      />
    </Footer>
  )
}

export { CheckoutFooter }
