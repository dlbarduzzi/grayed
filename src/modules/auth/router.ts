import { signUpSchema } from "./schemas"
import { procedure, router } from "@/trpc/init"

export const authRouter = router({
  signUp: procedure
    .input(signUpSchema)
    .mutation(({ ctx, input }) => {
      ctx.logger.info("new user sign up", { email: input.email })
      return { success: true }
    }),
})
