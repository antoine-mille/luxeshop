import { ShippingMethod } from "@prisma/client"
import { create } from "zustand"

type OrderStore = {
  shippingMethod: ShippingMethod | null
  setShippingMethod: (shippingMethod: ShippingMethod) => void
  note: string
  setNote: (note: string) => void
}

const useOrderStore = create<OrderStore>((set) => ({
  shippingMethod: null,
  setShippingMethod: (shippingMethod: ShippingMethod) =>
    set({ shippingMethod }),
  note: "",
  setNote: (note: string) => set({ note }),
}))

export { useOrderStore }
