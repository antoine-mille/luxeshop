"use client"

import { Image as PrismaImage } from "@prisma/client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/Carousel"
import Image from "next/image"
import { CarouselIndicator } from "@/components/CarouselIndicator"

type CarouselProps = {
  images: PrismaImage[]
}

const ProductCarousel = ({ images }: CarouselProps) => {
  return (
    <Carousel className="mx-auto w-full max-w-xs">
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.id}>
            <Image
              src={image.imageUrl}
              alt={`Product Image ${image.id}`}
              width={728}
              height={666}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselIndicator className="mt-5 w-full" />
    </Carousel>
  )
}

export { ProductCarousel }
