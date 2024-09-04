import { MapPin } from "lucide-react"
import { Badge } from "@/components/Badge"
import { AddressRow } from "@/components/AddressRow"
import { Address } from "@prisma/client"

type AddressCheckoutProps = {
  userId?: string
  addresses: Address[]
}

const AddressCheckout = ({ userId, addresses }: AddressCheckoutProps) => {
  return (
    <section className="grid w-full auto-cols-auto grid-cols-[auto_1fr] grid-rows-1 rounded-md border border-gray-light/40 p-4">
      <MapPin className="mr-4 size-6 w-fit text-orange" />
      <div className="flex flex-col gap-4">
        <p className="font-medium text-black">Shipping Address</p>
        <div className="flex gap-2">
          <Badge className="max-h-6">Home</Badge>
          <AddressRow userId={userId} addresses={addresses} isJustAddress />
        </div>
      </div>
    </section>
  )
}

export { AddressCheckout }
