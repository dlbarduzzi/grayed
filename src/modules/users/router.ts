import { procedure, router } from "@/trpc/init"

export const usersRouter = router({
  list: procedure.query(async ({ ctx }) => {
    return await ctx.db.query.users.findMany({ limit: 5 })
  }),
})
