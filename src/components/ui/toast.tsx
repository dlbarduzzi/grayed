"use client"

import { Toaster } from "sonner"

type ToastProps = React.ComponentProps<typeof Toaster>

function Toast({ ...props }: ToastProps) {
  return <Toaster {...props} />
}

export { Toast }
