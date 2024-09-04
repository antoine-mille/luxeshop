import { auth } from "@/auth"
import { CopyButton } from "@/components/CopyButton"
import { prisma } from "@/lib/prisma"
import Image from "next/image"

type SuccessProps = {
  searchParams: {
    orderId: string
  }
}

export default async function SuccessPage({
  searchParams: { orderId },
}: SuccessProps) {
  const session = await auth()

  if (!session) {
    throw new Error("Unauthorized")
  }

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      shippingAddress: true,
    },
  })

  if (!order) {
    throw new Error("Order not found")
  }

  if (order.userId !== session.user?.id) {
    throw new Error("Unauthorized")
  }

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-center text-xl">
        Thank you,
        <span className="text-orange"> {session.user.name} </span>
        <br />
        Your order has been recorded.
      </h1>
      <Image
        src="../successful-purchase.svg"
        alt="No results found"
        width={300}
        height={300}
        className="mx-auto"
      />

      <div className="flex flex-col gap-3">
        <h2 className="text-lg text-black">Order Reference</h2>
        <p className="text-sm">
          You can use this reference to track your order.
        </p>
        <CopyButton copyText={orderId}>Copy Reference</CopyButton>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg text-black">Order Details</h2>
        <p className="text-sm">
          Your order will be delivered to &nbsp;
          <span className="text-orange">
            {order.shippingAddress?.street}, {order.shippingAddress.city},&nbsp;
            {order.shippingAddress.postalCode}
          </span>
        </p>
      </div>
    </div>
  )
}
