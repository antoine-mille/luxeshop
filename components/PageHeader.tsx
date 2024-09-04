import { BackButton } from "@/components/BackButton"

type PageHeaderProps = {
  title: string
}

const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <div className="flex items-center">
      <BackButton />
      <p className="flex-1 text-center text-lg text-black">{title}</p>
    </div>
  )
}

export { PageHeader }
