import { Bell, ShoppingBag } from "lucide-react"
import { LinkWithDot } from "@/components/LinkWithDot"
import Link from "next/link"
import { getUserCart } from "@/lib/utils"
import { auth } from "@/auth"

const Header = async () => {
  const session = await auth()

  const userCart = await getUserCart(session?.user?.id)

  const hasItemsInCart = (userCart?.CartItem?.length || 0) > 0

  return (
    <header className="flex w-full justify-between">
      <Link href="/" className="flex items-center gap-2">
        <div className="size-8 rounded-full bg-orange" />
        <p className="font-normal text-black">Luxeshop</p>
      </Link>
      <div className="flex items-center gap-2">
        <LinkWithDot href="/cart" withDot={hasItemsInCart}>
          <ShoppingBag className="size-full text-gray-light" />
        </LinkWithDot>
        <LinkWithDot href="/notifications" withDot={false}>
          <Bell className="size-full text-gray-light" />
        </LinkWithDot>
      </div>
    </header>
  )
}

export { Header }
