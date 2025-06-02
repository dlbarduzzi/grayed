import NextLink from "next/link"

import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { UsersList } from "@/modules/users/views/list"

import { SampleToast } from "./_components/toast"
import { SampleCheckbox } from "./_components/checkbox"

import { siteConfig } from "@/lib/site"
import { getQueryServer, trpcServer } from "@/trpc/server/query-server"

function UsersListLoading() {
  return <div>Loading users...</div>
}

function UsersListError() {
  return <div>Failed to load users!</div>
}

export default async function Page() {
  const queryServer = getQueryServer()
  void queryServer.prefetchQuery(trpcServer.users.list.queryOptions())
  return (
    <div>
      <section aria-labelledby="homepage-header">
        <h1 id="homepage-header" className="sr-only">
          Homepage.
        </h1>
      </section>
      <div className="p-4">
        <div className="border-b border-b-gray-200 pb-1.5">
          Welcome to
          {" "}
          <span className="font-bold">
            {siteConfig.name}
          </span>
        </div>
        <div className="mt-8 space-y-3 divide-y divide-gray-200">
          <div>
            <Button asChild>
              <NextLink href="/sign-up" prefetch={false}>Sign up</NextLink>
            </Button>
          </div>
          <div className="pt-3">
            <HydrationBoundary state={dehydrate(queryServer)}>
              <Suspense fallback={<UsersListLoading />}>
                <ErrorBoundary fallback={<UsersListError />}>
                  <UsersList />
                </ErrorBoundary>
              </Suspense>
            </HydrationBoundary>
          </div>
          <div className="pt-3">
            <Button type="button">Button</Button>
          </div>
          <div className="pt-3">
            <SampleCheckbox />
          </div>
          <div className="pt-3">
            <SampleToast />
          </div>
        </div>
      </div>
    </div>
  )
}
