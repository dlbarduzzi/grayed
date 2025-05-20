"use client"

import { useId, useState } from "react"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

export function SampleCheckbox() {
  const checkboxId = useId()
  const isSubmitting = false
  const [isChecked, setIsChecked] = useState(false)
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={checkboxId}
        disabled={isSubmitting}
        checked={isChecked}
        onCheckedChange={() => setIsChecked(() => !isChecked)}
      />
      <label
        htmlFor={checkboxId}
        className={cn(
          "text-sm font-medium peer-disabled:cursor-not-allowed leading-none",
          isSubmitting ? "text-gray-400" : "text-gray-600",
        )}
      >
        This is a sample checkbox.
      </label>
    </div>
  )
}
