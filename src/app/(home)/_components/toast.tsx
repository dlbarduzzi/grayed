"use client"

import { toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"

export function SampleToast() {
  return (
    <div className="space-x-3">
      {["info", "success", "warning", "error"].map(value => (
        <Button
          key={value}
          type="button"
          onClick={() => toast({
            type: value as "info" | "success" | "warning" | "error",
            title: "Hello",
            description: "Description here...",
            actionButton: {
              label: "Action",
              // eslint-disable-next-line no-console
              onClick: () => console.log("Hello."),
            },
            isDismissible: true,
          })}
        >
          {value}
        </Button>
      ))}
    </div>
  )
}
