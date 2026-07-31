import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '@/db/schema';

const databaseUrl = neon(process.env.DATABASE_URL!);

if (!databaseUrl) {
  throw new Error('DATABASE_URL is missing');
}

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, {
  schema,
});
