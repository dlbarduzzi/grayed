import NextLink from "next/link"

import { Button } from "@/components/ui/button"
import { GitHubLogo } from "./github-logo"

import { cn } from "@/lib/utils"

type GitHubButtonProps = {
  action: "sign-in" | "sign-up"
  isDisabled: boolean
}

export function GitHubButton({ action, isDisabled }: GitHubButtonProps) {
  return (
    <Button
      type="button"
      size="md"
      variant="clear"
      className={cn("py-5", isDisabled && "text-gray-400")}
      asChild
    >
      <NextLink
        href={`/api/auth/${action}/github`}
        prefetch={false}
        className={cn(isDisabled && "pointer-events-none")}
      >
        <span className="-ml-1">
          <GitHubLogo />
        </span>
        GitHub
      </NextLink>
    </Button>
  )
}
