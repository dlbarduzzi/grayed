import bcrypt from "bcryptjs"
import postgres from "postgres"

import { signUpSchema } from "./schemas"
import { createUser, findUserByEmail } from "./queries"

import { procedure, router } from "@/trpc/init"
import { accounts } from "@/db/schemas"

export const authRouter = router({
  signUp: procedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await findUserByEmail(ctx, input.email)
        if (user != null) {
          return {
            ok: false,
            code: "USER_ALREADY_EXISTS",
            error: "This email is already registered.",
          }
        }

        const hash = await bcrypt.hash(input.password, 12)
        const newUser = await createUser(ctx, input.email, hash)

        await ctx.db
          .insert(accounts)
          .values({
            userId: newUser.id,
            accountId: newUser.id,
            providerId: "credential",
          })

        // TODO: Send email for verification.
        // NOTE: Do not create session. User must verify email first.

        ctx.logger.info("new user sign up", { email: input.email })
        return { ok: true, user: newUser }
      }
      catch (error) {
        if (error instanceof postgres.PostgresError) {
          ctx.logger.error(error.message, {
            path: "authRouter.signUp",
            status: "DATABASE_ERROR",
          })
        }
        else {
          ctx.logger.error((error as Error).message ?? "uncaught exception", {
            path: "authRouter.signUp",
            cause: (error as Error).cause ?? "no cause in error",
            status: "INTERNAL_EXCEPTION",
          })
        }
        return {
          ok: false,
          code: "INTERNAL_EXCEPTION",
          error: "An error occurred while processing your request.",
        }
      }
    }),
})
