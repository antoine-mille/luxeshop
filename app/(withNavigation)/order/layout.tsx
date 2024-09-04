import { Header } from "@/components/Header"

type OrderLayoutProps = {
  children: React.ReactNode
}

export default function OrderLayout({ children }: OrderLayoutProps) {
  return (
    <main className="flex size-full flex-col gap-8 p-3">
      <Header />
      {children}
    </main>
  )
}
