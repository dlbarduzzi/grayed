import { Button } from "@/components/ui/button"

import { SampleToast } from "./_components/toast"
import { SampleCheckbox } from "./_components/checkbox"

import { siteConfig } from "@/lib/site"
import { caller } from "@/trpc/server/query-server"

export default async function Page() {
  const users = await caller.users.list()
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
            <pre>{JSON.stringify(users, null, 2)}</pre>
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
