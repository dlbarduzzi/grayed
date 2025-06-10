import type { AppContext } from "@/trpc/init"

import { eq } from "drizzle-orm"
import { lowercase } from "@/tools/strings"
import { users, passwords } from "@/db/schemas"

export async function findUserByEmail(ctx: AppContext, email: string) {
  return await ctx.db.query.users.findFirst({
    where: eq(users.email, lowercase(email)),
  })
}

export async function createUser(ctx: AppContext, email: string, passwordHash: string) {
  return await ctx.db.transaction(async tx => {
    const [newUser] = await tx
      .insert(users)
      .values({ email: lowercase(email), isEmailVerified: false })
      .returning()

    if (newUser == null) {
      return tx.rollback()
    }

    const [newPasswordId] = await tx
      .insert(passwords)
      .values({ hash: passwordHash, userId: newUser.id })
      .returning({ id: passwords.id })

    if (newPasswordId == null) {
      return tx.rollback()
    }

    return newUser
  })
}
