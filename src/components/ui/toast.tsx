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
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse",
      "p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className,
    )}
    {...props}
  />
))

ToastViewport.displayName = RadixToast.Viewport.displayName

const toastVariants = cva(
  `group pointer-events-auto relative flex
  w-full items-center justify-between space-x-4 overflow-hidden
  rounded-md border p-4 shadow-lg transition-all
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

const ToastTitle = React.forwardRef<
  React.ComponentRef<typeof RadixToast.Title>,
  React.ComponentPropsWithoutRef<typeof RadixToast.Title>
>(({ className, ...props }, ref) => (
  <RadixToast.Title
    ref={ref}
    className={cn("text-sm font-semibold text-gray-800", className)}
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
    className={cn("text-sm text-gray-800", className)}
    {...props}
  />
))

ToastDescription.displayName = RadixToast.Description.displayName

const ToastClose = React.forwardRef<
  React.ComponentRef<typeof RadixToast.Close>,
  React.ComponentPropsWithoutRef<typeof RadixToast.Close>
>(({ className, ...props }, ref) => (
  <RadixToast.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 text-gray-400 hover:text-gray-600",
      "focus-visible:outline-none focus-visible:text-gray-600 opacity-0",
      "group-hover:opacity-100 focus-visible:opacity-100 transition-opacity",
      className,
    )}
    toast-close=""
    {...props}
  >
    <FaTimes className="size-4" />
  </RadixToast.Close>
))

ToastClose.displayName = RadixToast.Close.displayName

const ToastAction = React.forwardRef<
  React.ComponentRef<typeof RadixToast.Action>,
  React.ComponentPropsWithoutRef<typeof RadixToast.Action>
>(({ className, ...props }, ref) => (
  <RadixToast.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border",
      "border-gray-200 bg-white px-3 text-sm font-medium transition-colors",
      "hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-gray-300 focus:ring-offset-2",
      "disabled:pointer-events-none disabled:text-gray-400",
      className,
    )}
    {...props}
  />
))

ToastAction.displayName = RadixToast.Action.displayName

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
}
