import { Category } from "@prisma/client"
import { ShortCategoryCard } from "@/components/ShortCategoryCard"
import { cn } from "@/lib/merge"
import Link from "next/link"
import { slugify } from "@/lib/utils"

type ShortCategoriesLayoutProps = {
  categories: Category[]
  className?: string
}

const ShortCategoriesLayout = ({
  categories,
  className,
}: ShortCategoriesLayoutProps) => {
  return (
    <section className={cn("grid grid-cols-4 grid-rows-2 gap-4", className)}>
      {categories.map((category) => {
        const slug = slugify(category.name)
        return (
          <Link href={`/categories/${slug}`} key={category.id}>
            <ShortCategoryCard category={category} />
          </Link>
        )
      })}
    </section>
  )
}

export { ShortCategoriesLayout }
