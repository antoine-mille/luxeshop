"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"

import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/merge"
import { saveAddress } from "@/server-actions/save-address"

const formSchema = z.object({
  city: z.string().min(2, {
    message: "City must be at least 2 characters long",
  }),
  street: z.string().min(5, {
    message: "Street must be at least 5 characters long",
  }),
  postalCode: z
    .string()
    .min(5, {
      message: "Postal code must be at least 5 characters long",
    })
    .max(5, {
      message: "Postal code must be at most 5 characters long",
    }),
})

type CreateAddressFormProps = {
  className?: string
  userId?: string
  onAddressCreated?: () => void
}

const CreateAddressForm = ({
  className,
  userId,
  onAddressCreated,
}: CreateAddressFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
      street: "",
      postalCode: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!userId) return

    const newAddress = await saveAddress({
      ...values,
      userId,
    })

    if (newAddress) onAddressCreated?.()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("w-2/3 mx-auto flex flex-col gap-3", className)}
      >
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Enter your City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Street" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your Postal Code"
                  onKeyDown={(e) => {
                    // Check if the key pressed is a number
                    if (e.key.length === 1 && isNaN(parseInt(e.key))) {
                      e.preventDefault()
                      console.log("Only numbers are allowed")
                    }
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="ml-auto mt-2 bg-orange text-sm text-white hover:bg-orange/90"
        >
          Save address
        </Button>
      </form>
    </Form>
  )
}

export { CreateAddressForm }
