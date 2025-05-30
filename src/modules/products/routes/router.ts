import { procedure, router } from "@/trpc/init"

export const productsRouter = router({
  list: procedure.query(({ ctx }) => {
    return ctx.db.products.list()
  }),
})
