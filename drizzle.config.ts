// Don't import serverEnv; should be independent of Next.js. Instead of importing validated environment module, read the environment variables directly
// import { serverEnv } from '@/lib/env/server';
import dotenv from 'dotenv';
dotenv.config({
  path: '.env.local',
});

import type { Config } from 'drizzle-kit';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing in .env.local');
}

// migration files live outside to separate src which stores app codes
export default {
  schema: './src/db/schema/**/*',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  // Optional: Add these for better debugging
  verbose: true,
  strict: true,
} satisfies Config; // satisfies operator ensures your config object matches the Config type without losing type inference
