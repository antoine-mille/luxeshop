"use server"

import { prisma } from "@/lib/prisma"
import { PaymentIntentResult } from "@stripe/stripe-js"
import { redirect } from "next/navigation"

type HandlePaymentProps = {
  data: {
    paymentIntentResult: PaymentIntentResult | undefined
    orderId: string
  }
}

export async function handlePayment({
  data: { paymentIntentResult, orderId },
}: HandlePaymentProps) {
  if (!paymentIntentResult) {
    console.error("No payment intent result")
    redirect(`/order/failed?orderId=${orderId}`)
  }
  try {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        orderStatus: paymentIntentResult.error ? "CANCELLED" : "COMPLETED",
      },
    })
  } catch (error) {
    console.error(`Error handling payment: ${error}`)
  } finally {
    redirect(
      `/order/${!paymentIntentResult.error ? "success" : "failed"}?orderId=${orderId}`
    )
  }
}
