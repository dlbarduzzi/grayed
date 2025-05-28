"use client"

import { FaInfoCircle } from "react-icons/fa"

import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "@/components/ui/toast"

import { useToast } from "@/hooks/toast"

export function Toaster() {
  const { toasts } = useToast()
  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => {
        return (
          <Toast key={id} {...props}>
            <div className="flex">
              <div className="shrink-0">
                <FaInfoCircle className="size-5 fill-gray-900" />
              </div>
              <div className="ml-3 flex flex-1 flex-col pr-4">
                {title
                  ? <ToastTitle>{title}</ToastTitle>
                  : null
                }
                {description ? (
                  <div className="mt-1">
                    <ToastDescription>{description}</ToastDescription>
                  </div>
                )
                  : null
                }
                {action ? (
                  <div className="mt-4">{action}</div>
                ) : null}
              </div>
              <ToastClose />
            </div>
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
