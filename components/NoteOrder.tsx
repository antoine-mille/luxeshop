"use client"

import { Input } from "@/components/ui/Input"
import { useOrderStore } from "@/stores/order.store"
import { useShallow } from "zustand/react/shallow"

const NoteOrder = () => {
  const setNote = useOrderStore(useShallow((state) => state.setNote))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value)
  }

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-black">Note :</p>
      <Input
        type="text"
        className="border-none p-0"
        inputClassName="text-right"
        placeholder="Type any message..."
        onChange={handleChange}
      />
    </div>
  )
}

export { NoteOrder }
