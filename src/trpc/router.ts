import { z } from "zod"
import { procedure, router } from "./init"

import { authRouter } from "@/modules/auth/router"
import { usersRouter } from "@/modules/users/router"

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      }
    }),
  auth: authRouter,
  users: usersRouter,
})

export type AppRouter = typeof appRouter
