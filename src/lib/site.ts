import { env } from "@/env/client"

type SiteConfig = {
  name: string
  description: string
  url: string
}

export const siteConfig: SiteConfig = {
  name: "Grayed",
  description: "TBD",
  url: env.NEXT_PUBLIC_APP_URL,
}
