import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { stripe } from "@/lib/stripe"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  callbacks: {
    async jwt({ token }) {
      return token
    },
    async session({ session }) {
      return session
    },
  },
  events: {
    createUser: async (message) => {
      const userId = message.user.id
      const email = message.user.email
      const name = message.user.name

      if (!userId || !email) {
        return
      }
      const stripeCustomer = await stripe.customers.create({
        email,
        name: name || undefined,
      })

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          stripeCustomerId: stripeCustomer.id,
        },
      })
    },
  },
})
