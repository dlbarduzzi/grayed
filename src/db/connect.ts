import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"

import { env } from "@/env/server"
import { accounts, passwords, sessions, users, verifications } from "./schemas"

const schema = {
  users,
  accounts,
  passwords,
  sessions,
  verifications,
}

const client = postgres(env.DATABASE_URL)
const connect = drizzle({ client, schema })

export const db = connect
