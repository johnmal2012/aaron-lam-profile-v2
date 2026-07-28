import { user } from "@/db/schema/auth-schema";

export type User =
  typeof user.$inferInsert;