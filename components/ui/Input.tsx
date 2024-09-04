import { cn } from "@/lib/merge"
import React from "react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icons?: {
    leadingComponent?: () => React.ReactNode
    trailingComponent?: () => React.ReactNode
  }
  inputClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icons, inputClassName, ...props }, ref) => {
    const LeadingComponent = icons?.leadingComponent
    const TrailingComponent = icons?.trailingComponent

    return (
      <div
        className={cn(
          "border border-gray-light/40 flex items-center rounded-md gap-2 px-3 py-2",
          className
        )}
      >
        {LeadingComponent && <LeadingComponent />}
        <input
          className={cn(
            "size-full text-sm text-gray-light font-light focus-visible:outline-none",
            inputClassName
          )}
          ref={ref}
          {...props}
        />
        {TrailingComponent && <TrailingComponent />}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
