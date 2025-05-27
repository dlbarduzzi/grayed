"use client"

import { FaInfoCircle, FaTimesCircle } from "react-icons/fa"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  ToastWrapper,
} from "@/components/ui/toast"

import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/toast"

export function Toaster() {
  const { toasts } = useToast()
  return (
    <ToastProvider>
      {toasts.map(t => {
        const { id, title, description, action, withIcon, ...props } = t
        return (
          <Toast key={id} {...props}>
            <ToastWrapper>
              <div className="flex">
                {withIcon ? (
                  <div className="shrink-0">
                    {t.variant === "danger"
                      ? (
                          <FaTimesCircle
                            aria-hidden="true"
                            className="size-5 text-red-600"
                          />
                        )
                      : (
                          <FaInfoCircle
                            aria-hidden="true"
                            className="size-5 text-gray-800"
                          />
                        )
                    }
                  </div>
                ) : null}
                <div className={cn("space-y-1 pr-6", withIcon && "ml-3")}>
                  {title
                    ? <ToastTitle>{title}</ToastTitle>
                    : null
                  }
                  {description
                    ? <ToastDescription>{description}</ToastDescription>
                    : null
                  }
                </div>
              </div>
              {action}
              <ToastClose />
            </ToastWrapper>
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
