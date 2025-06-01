"use client"

import { useTRPC } from "@/trpc/client/provider"
import { useSuspenseQuery } from "@tanstack/react-query"

export function UsersList() {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.users.list.queryOptions())
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
