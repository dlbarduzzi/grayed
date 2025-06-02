"use client"

import NextLink from "next/link"
import NextImage from "next/image"

import type { SignUpSchema } from "@/modules/auth/schemas"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { cn } from "@/lib/utils"
import { useTRPC } from "@/trpc/client/provider"
import { signUpSchema } from "@/modules/auth/schemas"

export function SignUp() {
  const [isTermsChecked, setIsTermsChecked] = useState(true)

  const trpc = useTRPC()
  const query = useMutation(trpc.auth.signUp.mutationOptions())

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { errors, isSubmitting } = form.formState

  async function onSubmit(data: SignUpSchema) {
    if (!isTermsChecked) {
      // eslint-disable-next-line no-alert
      alert("You must accept terms and conditions")
      return
    }
    const res = await query.mutateAsync(data)
    // eslint-disable-next-line no-console
    console.log(res)
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-6">
      <div className="grid grid-cols-1 gap-y-6">
        <div className="flex flex-col items-center justify-center gap-y-4">
          <NextLink href="/">
            <NextImage
              src="/images/logo.png"
              alt="Grayed"
              width={500}
              height={500}
              className="h-12 w-auto"
            />
            <span className="sr-only">Link to home page.</span>
          </NextLink>
          <div className="text-center">
            <h3 className="text-base font-bold tracking-tight text-gray-900">
              Welcome to Grayed
            </h3>
            <p className="text-balance text-sm text-gray-600">
              Create an account and start exploring
            </p>
          </div>
        </div>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-y-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <div className="mt-0.5">
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        variant={errors.email ? "danger" : "default"}
                        disabled={isSubmitting}
                        placeholder="you@email.com"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="mt-0.5">
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        variant={errors.password ? "danger" : "default"}
                        disabled={isSubmitting}
                        placeholder="Enter your password..."
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sign-up-terms-and-conditions"
                disabled={isSubmitting}
                checked={isTermsChecked}
                onCheckedChange={() => setIsTermsChecked(() => !isTermsChecked)}
              />
              <Label
                htmlFor="sign-up-terms-and-conditions"
                className={cn(
                  "text-[13px] font-medium peer-disabled:cursor-not-allowed",
                  isSubmitting && "text-gray-400",
                )}
              >
                Accept
                {" "}
                <NextLink
                  href="/info/terms"
                  className={cn(
                    "font-semibold hover:underline hover:underline-offset-4",
                    isSubmitting
                      ? "pointer-events-none text-gray-400"
                      : "text-gray-900",
                  )}
                >
                  terms
                </NextLink>
                {" and "}
                <NextLink
                  href="/info/conditions"
                  className={cn(
                    "font-semibold hover:underline hover:underline-offset-4",
                    isSubmitting
                      ? "pointer-events-none text-gray-400"
                      : "text-gray-900",
                  )}
                >
                  conditions
                </NextLink>
              </Label>
            </div>
            <div>
              <Button type="submit" size="md" className="w-full">Create Account</Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
