import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site"

export default function Page() {
  return (
    <div>
      <section aria-labelledby="homepage-header">
        <h1 id="homepage-header" className="sr-only">
          Homepage.
        </h1>
      </section>
      <div className="p-4">
        <div>
          Welcome to
          {" "}
          <span className="font-bold">
            {siteConfig.name}
          </span>
        </div>
        <div className="mt-2">
          <Button type="button">Button</Button>
        </div>
      </div>
    </div>
  )
}
