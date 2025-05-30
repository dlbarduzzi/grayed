import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"

import { env } from "@/env/server"
import { users } from "./schemas"

const schema = { users }

const client = postgres(env.DATABASE_URL)
const connect = drizzle({ client, schema })

export const db = connect
