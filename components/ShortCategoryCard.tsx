import { cn } from "@/lib/merge"
import { Category } from "@prisma/client"
import Image from "next/image"

type ShortCategoryCardProps = {
  category: Category
  className?: string
}

const ShortCategoryCard = ({ category, className }: ShortCategoryCardProps) => {
  return (
    <div
      className={cn("flex flex-col items-center gap-2 w-full group", className)}
    >
      <div className="rounded-full border border-gray-light/40 p-4 transition-all duration-300 group-hover:bg-gray-light/10">
        <Image
          src={category.iconUrl}
          width={36}
          height={36}
          alt={`Icon for ${category.name}`}
          className="aspect-square"
        />
      </div>
      <p className="w-full truncate text-center text-sm text-black">
        {category.name}
      </p>
    </div>
  )
}

export { ShortCategoryCard }
