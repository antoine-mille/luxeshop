import { Navigation } from "@/components/Navigation"

type WithNavigationLayoutProps = {
  children: React.ReactNode
}

export default function WithNavigationLayout({
  children,
}: WithNavigationLayoutProps) {
  return (
    <>
      {children}
      <div className="h-[3.75rem]" />
      <Navigation />
    </>
  )
}
