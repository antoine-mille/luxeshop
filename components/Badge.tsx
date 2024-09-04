import { cn } from "@/lib/merge"

type BadgeProps = {
  children: React.ReactNode
  className?: string
}

const Badge = ({ children, className }: BadgeProps) => {
  return (
    <span
      className={cn(
        "px-3 py-1 bg-[#fdeaec] rounded-full text-red-500 text-xs select-none whitespace-nowrap",
        className
      )}
    >
      {children}
    </span>
  )
}

export { Badge }
