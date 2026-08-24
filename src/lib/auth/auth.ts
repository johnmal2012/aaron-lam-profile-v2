import { betterAuth } from 'better-auth';
import { customSession } from 'better-auth/plugins';
import { nextCookies } from 'better-auth/next-js';

import { authOptions } from '@/lib/auth/auth-options';

export const auth = betterAuth({
  ...authOptions,

  plugins: [
    ...(authOptions.plugins ?? []),

    customSession(async ({ user, session }) => {
      return {
        session: {
          expiresAt: session.expiresAt,
          token: session.token,
          userAgent: session.userAgent,
        },

        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          createdAt: user.createdAt,
          role: user.role,
          nikki: 'lam',
        },
      };
    }, authOptions),

    nextCookies(),
  ],
});

export type ErrorCode =
  | keyof typeof auth.$ERROR_CODES
  | 'UNKNOWN';