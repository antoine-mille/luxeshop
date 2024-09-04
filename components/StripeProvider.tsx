"use client"

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

type StripeProviderProps = {
  children: React.ReactNode
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
)

const StripeProvider = ({ children }: StripeProviderProps) => {
  return <Elements stripe={stripePromise}>{children}</Elements>
}

export { StripeProvider }
