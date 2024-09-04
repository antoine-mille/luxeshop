import { cn } from "@/lib/merge"
import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icons?: {
    leadingComponent?: () => React.ReactNode
    trailingComponent?: () => React.ReactNode
  }
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, icons, ...props }, ref) => {
    const LeadingComponent = icons?.leadingComponent
    const TrailingComponent = icons?.trailingComponent

    return (
      <button
        className={cn(
          "border border-orange rounded-md transition-all duration-300 px-4 py-2 text-orange flex items-center gap-2.5 justify-center",
          className
        )}
        ref={ref}
        {...props}
      >
        {LeadingComponent && <LeadingComponent />}
        {children}
        {TrailingComponent && <TrailingComponent />}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
