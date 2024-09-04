"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/merge"
import { useOrderStore } from "@/stores/order.store"
import { useShallow } from "zustand/react/shallow"
import { useToast } from "@/hooks/use-toast"
import { createOrder } from "@/server-actions/create-order"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import { handlePayment } from "@/server-actions/handle-payment"

type CheckoutButtonProps = {
  className?: string
  isSubmit?: boolean
  submitData?: {
    userId?: string
    cartId?: string
    shippingAddressId?: string
  }
}

const CheckoutButton = ({
  className,
  isSubmit = false,
  submitData,
}: CheckoutButtonProps) => {
  const router = useRouter()
  const [shippingMethod, note] = useOrderStore(
    useShallow((state) => [state.shippingMethod, state.note])
  )
  const { toast } = useToast()
  const stripe = useStripe()
  const elements = useElements()

  const handleClick = () => {
    if (isSubmit) {
      handleSubmit()
    } else {
      router.push("/checkout")
    }
  }

  const handleSubmit = async () => {
    if (!shippingMethod) {
      toast({
        title: "Error",
        description: "Please select a shipping method",
        variant: "destructive",
      })
      return
    }
    if (!submitData) {
      console.error("No submit data")
      return
    }
    const { userId, cartId, shippingAddressId } = submitData
    if (!userId || !cartId || !shippingAddressId) {
      console.error("Missing submit data")
      return
    }
    const cardElement = elements?.getElement("card")
    if (!cardElement) {
      console.error("No card element")
      return
    }
    const orderRes = await createOrder({
      data: {
        userId,
        cartId,
        shippingAddressId,
        shippingMethodId: shippingMethod.id,
        note,
      },
    })

    if (!orderRes) {
      toast({
        title: "Error",
        description: "Failed to create order",
        variant: "destructive",
      })
      return
    }

    const { order, clientSecret } = orderRes

    try {
      const paymentIntentResult = await stripe?.confirmCardPayment(
        clientSecret || "",
        {
          payment_method: {
            card: cardElement,
          },
        }
      )

      await handlePayment({
        data: {
          paymentIntentResult,
          orderId: order.id,
        },
      })
    } catch (error) {
      console.log(`Error when confirming card payment: ${error}`)
    }
  }

  return (
    <Button
      className={cn(
        "bg-orange text-white min-w-36 hover:bg-orange/90",
        className
      )}
      onClick={handleClick}
    >
      Checkout
    </Button>
  )
}

export { CheckoutButton }
