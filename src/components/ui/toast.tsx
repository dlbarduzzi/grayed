"use client"

import type { RequireKey } from "@/lib/types"

import React from "react"
import { toast as sonner } from "sonner"

import { cn } from "@/lib/utils"

const _statuses = ["info", "success", "warning", "error"] as const
type Status = typeof _statuses[number]

function getStyles(): Record<Status, { bg: string }> {
  return {
    info: { bg: "bg-white" },
    success: { bg: "bg-green-500" },
    warning: { bg: "bg-orange-500" },
    error: { bg: "bg-red-500" },
  }
}

type Toast = {
  id?: string | number | undefined
  type: Status
  title: string
  description: string
  actionButton?: {
    label: string
    onClick: () => void
  }
  isDismissible?: boolean
}

export function toast(t: Toast) {
  return sonner.custom(id => (
    <Toaster
      id={t.id ?? id}
      type={t.type}
      title={t.title}
      description={t.description}
      actionButton={t.actionButton}
      isDismissible={!!t.isDismissible}
    />
  ))
}

function Toaster(props: RequireKey<Toast, "id" | "isDismissible">) {
  const styles = getStyles()[props.type]
  return (
    <div className={cn(
      "flex w-full min-w-60 items-center rounded-lg border",
      "border-gray-700 p-4 md:max-w-96",
      styles.bg,
    )}
    >
      <div className="flex flex-1 items-center">
        <div className="w-full">
          <div>{props.title}</div>
          <div>{props.description}</div>
          {props.actionButton ? (
            <button type="button" onClick={() => props.actionButton?.onClick()}>
              {props.actionButton.label}
            </button>
          ) : null}
          {props.isDismissible ? (
            <button type="button" onClick={() => sonner.dismiss(props.id)}>
              X
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
