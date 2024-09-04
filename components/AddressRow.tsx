"use client"

import { MapPin } from "lucide-react"

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer"

import { Address } from "@prisma/client"
import { CreateAddressForm } from "@/components/CreateAddressForm"
import { useState } from "react"
import { SelectAddress } from "@/components/SelectAddress"

type AddressRowProps = {
  userId?: string
  addresses: Address[]
  isJustAddress?: boolean
}

const AddressRow = ({
  userId,
  addresses,
  isJustAddress = false,
}: AddressRowProps) => {
  const mainAddress = addresses.filter((address) => address.isDefault).at(0)

  const formattedAddress = mainAddress
    ? `${mainAddress.street}, ${mainAddress.city}, ${mainAddress.postalCode}`
    : "No address found"

  const [isCreating, setIsCreating] = useState(addresses.length <= 0)

  return (
    <Drawer onClose={() => setIsCreating(addresses.length <= 0)}>
      <DrawerTrigger>
        {!isJustAddress && (
          <div className="flex items-center gap-1.5">
            <MapPin className="size-6" />
            <p className="truncate text-sm font-normal text-gray-light">
              Deliver to &nbsp;
              <span className="text-black">{formattedAddress}</span>
            </p>
          </div>
        )}
        {isJustAddress && (
          <p className="text-start text-sm text-black">{formattedAddress}</p>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {!isCreating ? "Change address" : "Add address"}
          </DrawerTitle>
          <DrawerDescription>
            {!isCreating
              ? "Select an address from your saved addresses"
              : "Add a new address to your account"}
          </DrawerDescription>
        </DrawerHeader>

        {!isCreating && (
          <SelectAddress
            addresses={addresses}
            onAddNew={() => setIsCreating(true)}
          />
        )}

        {isCreating && (
          <CreateAddressForm
            className="pb-4"
            userId={userId}
            onAddressCreated={() => {
              setIsCreating(false)
            }}
          />
        )}
      </DrawerContent>
    </Drawer>
  )
}

export { AddressRow }
