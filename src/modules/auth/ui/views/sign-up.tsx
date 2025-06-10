"use client"

import type { SignUpSchema } from "@/modules/auth/schemas"

import NextLink from "next/link"
import NextImage from "next/image"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { TRPCClientError } from "@trpc/client"

import { LuInfo } from "react-icons/lu"
import { FaCheck, FaCircle, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider,
} from "@/components/ui/form"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

import { GitHubButton } from "@/components/github-button"
import { GoogleButton } from "@/components/google-button"
import { ButtonSpinner } from "@/components/button-spinner"

import { cn } from "@/lib/utils"
import { strings } from "@/tools/strings"
import { useTRPC } from "@/trpc/client/provider"

import {
  signUpSchema,
  PASSWORD_MIN_CHARS,
  PASSWORD_MAX_CHARS,
} from "@/modules/auth/schemas"

export function SignUp() {
  const [isTermsChecked, setIsTermsChecked] = useState(true)
  const [showPasswordValue, setShowPasswordValue] = useState(false)
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false)

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
  const passwordValue = form.watch("password")

  async function onSubmit(data: SignUpSchema) {
    if (!isTermsChecked) {
      // eslint-disable-next-line no-alert
      alert("You must accept terms and conditions")
      return
    }
    setShowPasswordValue(() => false)
    setShowPasswordRequirements(() => false)
    try {
      const resp = await query.mutateAsync(data)
      console.warn(resp)
    }
    catch (error) {
      if (error instanceof TRPCClientError) {
        console.error("UNHANDLED TRPCClientError", error.message)
      }
      else {
        console.error("UNHANDLED Error", error)
      }
    }
  }

  return (
    <div className={cn(
      "overflow-hidden rounded-lg border border-gray-200",
      "bg-white px-8 py-9",
    )}
    >
      <div>
        <div className="flex">
          <NextLink
            href="/"
            className={cn(
              "rounded-full focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-black focus-visible:ring-offset-2",
              isSubmitting && "pointer-events-none",
            )}
          >
            <NextImage
              src="/images/logo.png"
              alt="Grayed"
              width={500}
              height={500}
              className="h-10 w-auto"
            />
            <span className="sr-only">Link to home page.</span>
          </NextLink>
        </div>
        <h2 className="mt-8 text-lg font-bold tracking-tight text-gray-800">
          Sign up
        </h2>
        <p className="text-sm text-gray-800">
          Create an account and start exploring
        </p>
      </div>
      <div className="mt-8">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-y-6"
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
                  <div className="flex">
                    <div className="flex-1">
                      <FormLabel>Password</FormLabel>
                    </div>
                    <Popover
                      open={showPasswordRequirements}
                      onOpenChange={setShowPasswordRequirements}
                    >
                      <PopoverTrigger className={cn(
                        "mr-1 text-sm font-medium flex items-center gap-x-1",
                        isSubmitting
                          ? "pointer-events-none text-gray-400"
                          : "text-gray-500 hover:text-gray-700",
                      )}
                      >
                        Requirements
                        <LuInfo className="size-4" />
                      </PopoverTrigger>
                      <PopoverContent
                        side="top"
                        align="end"
                        className="w-80"
                        onFocusOutside={e => e.preventDefault()}
                        onPointerDownOutside={e => e.preventDefault()}
                      >
                        <PasswordRequirements
                          hasError={!!errors.password}
                          password={passwordValue}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="relative mt-0.5">
                    <FormControl>
                      <Input
                        {...field}
                        type={showPasswordValue ? "text" : "password"}
                        variant={errors.password ? "danger" : "default"}
                        disabled={isSubmitting}
                        placeholder="Enter your password..."
                        className="pr-12"
                      />
                    </FormControl>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <div
                        role="button"
                        onClick={() => setShowPasswordValue(() => !showPasswordValue)}
                        className={cn(isSubmitting
                          ? "pointer-events-none text-gray-300"
                          : "text-gray-300",
                        )}
                      >
                        {showPasswordValue
                          ? <FaEye className="size-6" />
                          : <FaEyeSlash className="size-6" />
                        }
                      </div>
                    </div>
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
                  "peer-disabled:cursor-not-allowed font-normal text-sm/6",
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
              <ButtonSpinner
                type="submit"
                size="md"
                className="w-full"
                title="Create Account"
                disabled={isSubmitting}
                isLoading={isSubmitting}
              />
            </div>
          </form>
        </FormProvider>
      </div>
      <div className="mt-8">
        <div className="relative">
          <div aria-hidden="true" className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-t-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm font-medium">
            <span className="bg-white px-6 text-gray-500">Or continue with</span>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <GoogleButton
            action="sign-up"
            isDisabled={isSubmitting || !isTermsChecked}
          />
          <GitHubButton
            action="sign-up"
            isDisabled={isSubmitting || !isTermsChecked}
          />
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-800">
          Already have an account?
          {" "}
          <NextLink
            href="/sign-in"
            className={cn(
              "font-semibold hover:underline hover:underline-offset-4",
              isSubmitting && "pointer-events-none text-gray-600",
            )}
          >
            Sign in
          </NextLink>
        </p>
      </div>
    </div>
  )
}

type PasswordRequirementsProps = {
  hasError: boolean
  password: string
}

function PasswordRequirements({ hasError, password }: PasswordRequirementsProps) {
  return (
    <div>
      <div className="text-sm font-medium text-gray-900">Password Requirements</div>
      <div className="text-xs/5 text-gray-600">
        Your password must meet the following criteria:
      </div>
      <div className="mt-4">
        <ul className="space-y-1">
          <PasswordRequirementsCheck
            isValid={strings(password).hasNumber()}
            hasError={hasError}
            description="Contain a number"
          />
          <PasswordRequirementsCheck
            isValid={strings(password).hasSpecialChar()}
            hasError={hasError}
            description="Contain a special character"
          />
          <PasswordRequirementsCheck
            isValid={strings(password).hasLowercaseChar()}
            hasError={hasError}
            description="Contain a lowercase character"
          />
          <PasswordRequirementsCheck
            isValid={strings(password).hasUppercaseChar()}
            hasError={hasError}
            description="Contain an uppercase character"
          />
          <PasswordRequirementsCheck
            isValid={
              password.length >= PASSWORD_MIN_CHARS
              && password.length <= PASSWORD_MAX_CHARS
            }
            hasError={hasError}
            // eslint-disable-next-line style/max-len
            description={`Between ${PASSWORD_MIN_CHARS} and ${PASSWORD_MAX_CHARS} characters long`}
          />
        </ul>
      </div>
    </div>
  )
}

type PasswordRequirementsCheckProps = {
  isValid: boolean
  hasError: boolean
  description: string
}

function PasswordRequirementsCheck(props: PasswordRequirementsCheckProps) {
  const { isValid, hasError, description } = props
  return (
    <li className="inline-flex items-center gap-x-2 text-sm text-gray-800">
      <span className="flex size-5 items-center justify-center">
        {isValid ? (
          <FaCheck className="size-5 text-green-500" />
        ) : hasError ? (
          <FaTimes className="size-5 h-full text-red-500" />
        ) : (
          <FaCircle className="size-3 h-full fill-gray-300 stroke-none" />
        )}
      </span>
      {description}
    </li>
  )
}
