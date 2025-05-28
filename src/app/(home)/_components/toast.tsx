"use client"

import { toast } from "@/hooks/toast"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"

export function SampleToast() {
  function infoToast() {
    toast({
      title: "Update software",
      description: "A new software update is available for install.",
    })
  }
  function infoToastAction() {
    toast({
      title: "Update software",
      description: "A new software update is available for install.",
      action: (
        <ToastAction
          altText="Install"
          onClick={() => console.warn("Installing software...")}
        >
          Install
        </ToastAction>
      ),
    })
  }

  return (
    <div className="space-x-3">
      <Button type="button" onClick={infoToast}>Info Toast</Button>
      <Button type="button" onClick={infoToastAction}>Info Toast Action</Button>
    </div>
  )
}
