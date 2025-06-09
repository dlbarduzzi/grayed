import type { z } from "zod/v4"

import { createSelectSchema } from "drizzle-zod"

import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  imageUrl: text("image_url"),
  isEmailVerified: boolean("is_email_verified").notNull().default(false),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
}, table => [uniqueIndex("email_index").on(table.email)])

export const passwords = pgTable("passwords", {
  id: uuid("id").primaryKey().defaultRandom(),
  hash: text("hash").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

const _providers = ["credential", "github", "google"] as const
export const accountProviderEnum = pgEnum("account_provider_id", _providers)

export const accounts = pgTable("accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  accountId: text("account_id").notNull(),
  providerId: accountProviderEnum("provider_id").notNull(),
  scope: text("scope"),
  idToken: text("id_token"),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", { mode: "date", withTimezone: true })
    .notNull(),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const verifications = pgTable("verifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  token: text("token").notNull(),
  identifier: text("identifier").notNull(),
  expiresAt: timestamp("expires_at", { mode: "date", withTimezone: true })
    .notNull(),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const userSchema = createSelectSchema(users)

export type UserSchema = z.infer<typeof userSchema>
export type AccountProviderId = (typeof _providers)[number]
