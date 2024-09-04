"use client"

import { ListFilter, Search } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/merge"
import { useState } from "react"
import { useRouter } from "next/navigation"

type SearchInputProps = {
  defaultValue?: string
  inputClassName?: string
  className?: string
}

const SearchInput = ({
  defaultValue = "",
  inputClassName,
  className,
}: SearchInputProps) => {
  const classNamesIcon =
    "size-6 text-gray-light cursor-pointer transition-colors duration-300 hover:text-black"

  const router = useRouter()
  const [searchValue, setSearchValue] = useState(defaultValue)

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchValue(event.target.value)
  const onHandleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) =>
    event.key === "Enter" && onHandleSearch()

  const onHandleSearch = () => {
    if (searchValue.length > 0) {
      router.push(`/search?q=${searchValue}`)
    }
  }

  return (
    <Input
      className={className}
      inputClassName={cn("w-2/3", inputClassName)}
      icons={{
        leadingComponent: () => (
          <Search className={classNamesIcon} onClick={onHandleSearch} />
        ),
        trailingComponent: () => (
          <div className="relative ml-auto before:absolute before:-left-1/2 before:top-1/2 before:h-1/3 before:w-px before:-translate-y-1/2 before:bg-gray-light/40 before:content-['']">
            <ListFilter className={cn(classNamesIcon)} />
          </div>
        ),
      }}
      onKeyDown={onHandleKeyDown}
      onChange={onHandleChange}
      placeholder="Find you needed..."
      defaultValue={defaultValue}
    />
  )
}

export { SearchInput }
