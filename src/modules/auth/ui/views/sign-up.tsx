"use client"

import type { SignUpSchema } from "@/modules/auth/schemas"

import { useForm } from "react-hook-form"
import { useState } from "react"
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
import { signUpSchema } from "@/modules/auth/schemas"

export function SignUp() {
  const [isTermsChecked, setIsTermsChecked] = useState(true)

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { errors, isSubmitting } = form.formState

  function onSubmit(data: SignUpSchema) {
    if (!isTermsChecked) {
      // TODO: Change this to a component alert.
      // eslint-disable-next-line no-alert
      alert("You must accept terms and conditions")
      return
    }
    console.warn(data)
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-6">
      <div className="grid grid-cols-1 gap-y-6">
        <div className="text-lg font-bold tracking-tight text-gray-900">Sign up</div>
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
                id="sign-up-terms"
                disabled={isSubmitting}
                checked={isTermsChecked}
                onCheckedChange={() => setIsTermsChecked(() => !isTermsChecked)}
              />
              <Label
                htmlFor="sign-up-terms"
                className={cn(
                  "text-[13px] font-medium peer-disabled:cursor-not-allowed",
                  isSubmitting && "text-gray-400",
                )}
              >
                Accept terms and conditions
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
