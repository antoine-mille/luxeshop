"use client"

import { Address } from "@prisma/client"
import { Button } from "@/components/ui/Button"
import { MapPin } from "lucide-react"
import { Switch } from "@/components/ui/Switch"
import { updateUserAddress } from "@/server-actions/update-user-address"

type SelectAddressProps = {
  addresses: Address[]
  onAddNew?: () => void
}

const SelectAddress = ({ addresses, onAddNew }: SelectAddressProps) => {
  const handleSelect = async (address: Address, checked: boolean) => {
    const isSuccess = await updateUserAddress({
      userId: address.userId,
      addressId: address.id,
      isDefault: checked,
    })
    if (!isSuccess) {
      console.error("Failed to update user address")
    }
  }

  const handleClick = (event: React.MouseEvent, address: Address) => {
    const switches = document.querySelectorAll(
      "[role='switch'][data-is-switch-address]"
    )
    const otherSwitches = Array.from(switches).filter(
      (s) => s !== event.target && s.getAttribute("data-state") === "checked"
    )
    otherSwitches.forEach((s: Element) => (s as HTMLButtonElement).click())

    const isDefault =
      (event.target as HTMLElement).getAttribute("data-state") === "checked"
    handleSelect(address, !isDefault)
  }

  return (
    <div className="mx-auto pb-4">
      {addresses.map((address) => (
        <div
          key={address.id}
          className="mb-2 flex items-center gap-4 text-sm text-black"
        >
          <p className="font-medium">
            {address.street}, {address.city}, {address.postalCode}
          </p>
          <Switch
            data-is-switch-address
            className="ml-auto"
            defaultChecked={address.isDefault}
            onClick={(event) => handleClick(event, address)}
          />
        </div>
      ))}
      <Button
        icons={{
          leadingComponent: () => <MapPin className="size-4" />,
        }}
        className="mx-auto mt-6 bg-orange text-sm text-white hover:bg-orange/90"
        onClick={onAddNew}
      >
        Add a new address
      </Button>
    </div>
  )
}

export { SelectAddress }
