"use client"

import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"

import { toast } from "@/hooks/toast"

export function SampleToast() {
  function infoToast() {
    toast({
      title: "Successfully uploaded",
      description: "A new software update is available for install.",
      withIcon: true,
    })
  }
  function errorToast() {
    toast({
      title: "Something went wrong",
      description: "Your password must include at least one pro wrestling move.",
      variant: "danger",
      withIcon: true,
      action: <ToastAction altText="Retry">Retry</ToastAction>,
    })
  }
  return (
    <div className="space-x-3">
      <Button type="button" onClick={infoToast}>Info</Button>
      <Button type="button" onClick={errorToast}>Error</Button>
    </div>
  )
}
