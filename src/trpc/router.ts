import { z } from "zod"
import { procedure, router } from "./init"

import { productsRouter } from "@/modules/products/routes/router"

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
  products: productsRouter,
})

export type AppRouter = typeof appRouter
