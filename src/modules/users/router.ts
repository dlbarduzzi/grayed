import { TRPCError } from "@trpc/server"
import { procedure, router } from "@/trpc/init"

export const usersRouter = router({
  list: procedure.query(async ({ ctx }) => {
    await new Promise(res => setTimeout(res, 2000))
    if (1 > 2) {
      throw new TRPCError({ code: "BAD_REQUEST" })
    }
    return await ctx.db.query.users.findMany({ limit: 5 })
  }),
})
