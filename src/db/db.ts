import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '@/db/schema';
import { serverEnv } from '@/lib/env/server';

const databaseUrl = serverEnv.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is missing');
}

const sql = neon(serverEnv.DATABASE_URL);

export const db = drizzle(sql, {
  schema,
});
