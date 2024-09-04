import type { Metadata } from "next"
import "./globals.css"
import { sfProDisplay } from "@/lib/fonts"
import { auth } from "@/auth"
import { AuthProvider } from "@/components/AuthProvider"
import { Toaster } from "@/components/ui/Toaster"
import { StripeProvider } from "@/components/StripeProvider"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html lang="fr" suppressHydrationWarning>
      <AuthProvider session={session}>
        <StripeProvider>
          <body className={sfProDisplay.className}>
            {children}
            <Toaster />
          </body>
        </StripeProvider>
      </AuthProvider>
    </html>
  )
}
