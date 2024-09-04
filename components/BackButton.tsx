"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const BackButton = () => {
  const router = useRouter()

  return (
    <button
      className="w-fit rounded-full border border-gray-light/40 p-2 transition-colors duration-300 hover:bg-gray-light/20"
      onClick={() => router.back()}
    >
      <ArrowLeft className="size-6 text-black" />
    </button>
  )
}

export { BackButton }
