"use client"

import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/merge"

type CopyButtonProps = {
  copyText: string
  children: React.ReactNode
  className?: string
}

const CopyButton = ({ copyText, children, className }: CopyButtonProps) => {
  const handleClick = () => {
    navigator.clipboard.writeText(copyText)
  }

  return (
    <Button
      className={cn("text-sm hover:bg-orange/10 w-fit", className)}
      onClick={handleClick}
    >
      {children}
    </Button>
  )
}

export { CopyButton }
