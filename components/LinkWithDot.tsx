import { cn } from "@/lib/merge"
import Link from "next/link"

type LinkWithDotProps = {
  href: string
  className?: string
  children?: React.ReactNode
  withDot?: boolean
}

const LinkWithDot = ({
  href,
  className,
  children,
  withDot = true,
}: LinkWithDotProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "relative border border-gray-light/40 p-1 rounded-md hover:bg-gray-light/10",
        className
      )}
    >
      <div className="relative size-5">
        {children}
        {withDot && (
          <span className="absolute right-0 top-0 size-1.5 rounded-full bg-orange" />
        )}
      </div>
    </Link>
  )
}

export { LinkWithDot }
