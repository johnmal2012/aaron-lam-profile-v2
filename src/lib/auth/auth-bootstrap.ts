import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import { db } from '@/db/db';
import * as schema from '@/db/schema';

import { hashPassword, verifyPassword } from '@/lib/auth/argon2';

export const bootstrapAuth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),

  emailAndPassword: {
    enabled: true,

    minPasswordLength: 6,

    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },

    // Bootstrap user will be verified manually
    // by bootstrap-admin.ts.
    requireEmailVerification: false,
  },
  // IMPORTANT:
  // Your PostgreSQL user.id is UUID.
  // Let PostgreSQL generate the UUID instead
  // of Better Auth generating a string ID.
  advanced: {
    database: {
      generateId: false,
    },
  },
});
