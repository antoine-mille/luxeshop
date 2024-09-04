"use client"

import { useCarousel } from "@/components/ui/Carousel"
import { cn } from "@/lib/merge"
import { Badge } from "./Badge"

type CarouselIndicatorProps = {
  className?: string
}

const CarouselIndicator = ({ className }: CarouselIndicatorProps) => {
  const { api } = useCarousel()

  const numberOfSlides = api?.scrollSnapList().length || 0
  const currentIndex = api?.selectedScrollSnap() || 0

  const formattedBadge = `${currentIndex + 1}/${numberOfSlides}`

  return (
    <div
      className={cn(
        "relative flex justify-center gap-2 items-center",
        className
      )}
    >
      {Array.from({ length: numberOfSlides }).map((_, index) => (
        <span
          key={index}
          className={cn(
            "block w-10 h-1.5 rounded-full bg-gray-light/40",
            index === currentIndex && "bg-orange"
          )}
        />
      ))}
      <Badge className="absolute right-0">{formattedBadge}</Badge>
    </div>
  )
}

export { CarouselIndicator }
