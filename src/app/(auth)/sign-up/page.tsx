import { cn } from "@/lib/utils"
import { SignUp } from "@/modules/auth/ui/views/sign-up"

export default function Page() {
  return (
    <div className={cn(
      "flex min-h-svh flex-col items-center justify-start sm:justify-center",
      "bg-gradient-to-br from-gray-50 to-gray-200 p-4 sm:p-6 md:p-10",
    )}
    >
      <section aria-labelledby="sign-up-header">
        <h1 id="sign-up-header" className="sr-only">
          Sign up.
        </h1>
      </section>
      <div className="w-full max-w-[420px]">
        <SignUp />
      </div>
    </div>
  )
}
