"use client"

import type { VariantProps } from "class-variance-authority"

import * as React from "react"
import * as RadixToast from "@radix-ui/react-toast"

import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { FaTimes } from "react-icons/fa"

const ToastProvider = RadixToast.Provider

const ToastViewport = React.forwardRef<
  React.ComponentRef<typeof RadixToast.Viewport>,
  React.ComponentPropsWithoutRef<typeof RadixToast.Viewport>
>(({ className, ...props }, ref) => (
  <RadixToast.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4",
      "sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className,
    )}
    {...props}
  />
))

ToastViewport.displayName = RadixToast.Viewport.displayName

// eslint-disable-next-line tailwindcss/no-custom-classname
const toastVariants = cva(
  `group pointer-events-auto relative
  rounded-md border px-5 py-6 shadow-lg transition-all
  data-[swipe=cancel]:translate-x-0
  data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]
  data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]
  data-[swipe=move]:transition-none
  data-[state=open]:animate-in
  data-[state=closed]:animate-out
  data-[swipe=end]:animate-out
  data-[state=closed]:fade-out-80
  data-[state=closed]:slide-out-to-right-full
  data-[state=open]:slide-in-from-top-full
  data-[state=open]:sm:slide-in-from-bottom-full`,
  {
    variants: {
      variant: {
        default: "border-gray-200 bg-white",
        danger: "danger border-red-200 bg-red-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

const Toast = React.forwardRef<
  React.ComponentRef<typeof RadixToast.Root>,
  React.ComponentPropsWithoutRef<typeof RadixToast.Root> &
  VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <RadixToast.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})

Toast.displayName = RadixToast.Root.displayName

const ToastWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(
  ({ className, ...props }, ref) => {
    return <div className={cn("overflow-hidden", className)} ref={ref} {...props} />
  },
)

ToastWrapper.displayName = "ToastWrapper"

const ToastAction = React.forwardRef<
  React.ComponentRef<typeof RadixToast.Action>,
  React.ComponentPropsWithoutRef<typeof RadixToast.Action>
>(({ className, ...props }, ref) => (
  <RadixToast.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-white",
      "px-3 text-sm font-medium transition-colors hover:bg-gray-50 focus:outline-none",
      "focus:ring-2 focus:ring-gray-800 focus:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50 group-[.danger]:border-red-800",
      "group-[.danger]:hover:border-red-600 group-[.danger]:hover:bg-red-400",
      "group-[.danger]:hover:text-red-900 group-[.danger]:focus:ring-red-500",
      className,
    )}
    {...props}
  />
))

ToastAction.displayName = RadixToast.Action.displayName

const ToastClose = React.forwardRef<
  React.ComponentRef<typeof RadixToast.Close>,
  React.ComponentPropsWithoutRef<typeof RadixToast.Close>
>(({ className, ...props }, ref) => (
  <RadixToast.Close
    className={cn(
      "absolute right-0 top-0 inline-flex size-6 -translate-y-[40%] translate-x-[40%]",
      "items-center justify-center rounded-full bg-white text-gray-300 opacity-0",
      "ring-1 ring-inset ring-gray-200 transition-opacity hover:text-gray-600",
      "focus-visible:opacity-100 focus-visible:outline-none group-hover:opacity-100",
      "group-[.danger]:bg-red-100 group-[.danger]:text-red-300",
      "group-[.danger]:ring-red-200 group-[.danger]:hover:text-red-600",
      className,
    )}
    ref={ref}
    toast-close=""
    {...props}
  >
    <FaTimes aria-hidden="true" className="size-4" />
  </RadixToast.Close>
),
)

ToastClose.displayName = RadixToast.Close.displayName

const ToastTitle = React.forwardRef<
  React.ComponentRef<typeof RadixToast.Title>,
  React.ComponentPropsWithoutRef<typeof RadixToast.Title>
>(({ className, ...props }, ref) => (
  <RadixToast.Title
    ref={ref}
    className={cn(
      "text-sm font-semibold text-gray-800",
      "group-[.danger]:text-red-800",
      className,
    )}
    {...props}
  />
))

ToastTitle.displayName = RadixToast.Title.displayName

const ToastDescription = React.forwardRef<
  React.ComponentRef<typeof RadixToast.Description>,
  React.ComponentPropsWithoutRef<typeof RadixToast.Description>
>(({ className, ...props }, ref) => (
  <RadixToast.Description
    ref={ref}
    className={cn("text-sm text-gray-800 group-[.danger]:text-red-800", className)}
    {...props}
  />
))

ToastDescription.displayName = RadixToast.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>
type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  Toast,
  ToastAction,
  type ToastActionElement,
  ToastClose,
  ToastDescription,
  type ToastProps,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  ToastWrapper,
}
