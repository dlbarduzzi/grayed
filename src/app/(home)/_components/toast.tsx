"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function SampleToast() {
  return (
    <div>
      <Button
        type="button"
        onClick={() => {
          toast("A sample toast here.")
        }}
      >
        Render Toast
      </Button>
    </div>
  )
}
