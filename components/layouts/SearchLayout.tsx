import { SearchInput } from "@/components/SearchInput"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { AddressRow } from "@/components/AddressRow"
import { Address } from "@prisma/client"

const SearchLayout = async () => {
  const session = await auth()

  let addresses: Address[] = []

  if (session?.user?.id) {
    addresses = await prisma.address.findMany({
      where: {
        userId: session?.user?.id,
      },
      orderBy: {
        id: "asc",
      },
    })
  }

  return (
    <section className="flex flex-col gap-3">
      <SearchInput />
      {session?.user && (
        <AddressRow addresses={addresses} userId={session?.user?.id} />
      )}
    </section>
  )
}

export { SearchLayout }
