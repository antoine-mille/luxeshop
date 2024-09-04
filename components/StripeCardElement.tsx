"use client"

import { CardElement } from "@stripe/react-stripe-js"

const StripeCardElement = () => {
  return (
    <CardElement
      options={{
        hidePostalCode: true,
      }}
    />
  )
}

export { StripeCardElement }
