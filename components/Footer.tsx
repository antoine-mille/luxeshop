"use client"

import { cn } from "@/lib/merge"
import ReactDOM from "react-dom"
import { useIsClient } from "usehooks-ts"

type FooterProps = {
  children: React.ReactNode
  className?: string
}

const Footer = ({ children, className }: FooterProps) => {
  const isClient = useIsClient()

  if (!isClient) {
    return null
  }

  return ReactDOM.createPortal(
    <>
      <div className="h-16" />
      <div
        className={cn(
          "fixed bottom-0 w-full h-[4rem] shadow-2xl flex items-center justify-center gap-4 bg-white",
          className
        )}
      >
        {children}
      </div>
    </>,
    document.body
  )
}

export { Footer }
