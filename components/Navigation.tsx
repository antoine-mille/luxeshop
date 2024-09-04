"use client"

import { cn } from "@/lib/merge"
import { Heart, Home, LogIn, User } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

const Navigation = () => {
  const pathname = usePathname()

  const router = useRouter()
  const { data: session } = useSession()

  const tabs = [
    { name: "Home", href: "/", icon: Home },
    { name: "Wishlist", href: "/wishlist", icon: Heart },
    { name: "Profile", href: "/profile", icon: User },
  ]

  const isActive = (href: string) =>
    (pathname.startsWith(href) && href !== "/") || pathname === href

  const onClick = (name: string, href: string) => {
    if (name !== "Profile" || session) {
      router.push(href)
      return
    }
    signIn("google")
  }

  return (
    <nav className="fixed bottom-0 w-full bg-white">
      <div className="flex w-full justify-around px-3 pb-3">
        {tabs.map((tab, index) => {
          const Icon = tab.name === "Profile" && !session ? LogIn : tab.icon
          const name = tab.name === "Profile" && !session ? "Log in" : tab.name

          return (
            <button
              key={index}
              className={cn(
                "flex flex-col items-center gap-0.5 text-gray-light w-fit border-t-2 border-transparent pt-2",
                isActive(tab.href) && "border-orange text-orange"
              )}
              onClick={() => onClick(tab.name, tab.href)}
            >
              <Icon className="size-5" />
              <p className="text-xs">{name}</p>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export { Navigation }
