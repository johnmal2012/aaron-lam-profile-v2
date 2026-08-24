import { betterAuth, BetterAuthOptions } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db/db';
import * as schema from '@/db/schema';
// import { admin, customSession, magicLink } from 'better-auth/plugins';
import { admin, customSession } from 'better-auth/plugins';
import { hashPassword, verifyPassword } from '@/lib/auth/argon2';
// import { nextCookies } from 'better-auth/next-js';
import { APIError, createAuthMiddleware } from 'better-auth/api';
import { normalizeName } from '@/lib/utils';
import { getValidDomains } from '@/lib/auth/valid-domains';
import { ac, roles } from '@/lib/auth/permissions';
import { serverEnv } from '@/lib/env/server';
import { clientEnv } from '@/lib/env/client';
import { sendEmailAction } from '@/actions/auth/send-email.action';
import { USER_ROLE } from '@/db/schema/auth-schema';

export const authOptions = {
  database: drizzleAdapter(db, {
    provider: 'pg', // pg | mysql | sqlite
    schema,
  }),

  // Better Auth server configuration should ideally use the server environment rather than the client environment
  baseURL: serverEnv.BETTER_AUTH_URL,

  trustedOrigins: ['http://localhost:3000', clientEnv.NEXT_PUBLIC_APP_URL],

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: true,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmailAction({
        to: user.email,
        subject: 'Reset Password',
        meta: {
          title: 'Password Reset',
          description: 'Click the button below to reset your password.',
          buttonText: 'Reset Password',
          link: url,
        },
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60,
    // expiresIn: 10,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const link = new URL(url);
      link.searchParams.set('callbackURL', '/verify'); // For development: need dev server running and open email on same machine, not from other device; "verify" is project folder // For production, update BETTER_AUTH_URL in .env.local to vercel url, instead of localhost:3000

      await sendEmailAction({
        to: user.email,
        subject: 'Verify your email address',
        meta: {
          title: 'Verify Your Email Address',
          description:
            'Please verify your email address to complete the registration process.',
          buttonText: 'Verify Email',
          link: String(link),
        },
      });
    },
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: true,
        defaultValue: USER_ROLE.USER, // default role is 'user'
        input: false, // This field exists in the database and user object, but Better Auth will not allow clients to provide or modify it through auth API inputs (sign up, update profile, etc.). We provide enum value by default, and it cannot be changed by the client.
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          //   const ADMIN_EMAILS = serverEnv.ADMIN_EMAILS?.split(';') ?? [];

          //   if (ADMIN_EMAILS.includes(user.email)) {
          //     return { data: { ...user, role: USER_ROLE.ADMIN } };
          //   }

          //   return { data: user };
          // normalize email to lowercase
          const ADMIN_EMAILS =
            serverEnv.ADMIN_EMAILS?.split(';')
              .map((email) => email.trim().toLowerCase())
              .filter(Boolean) ?? [];

          const email = user.email.trim().toLowerCase();

          if (ADMIN_EMAILS.includes(email)) {
            return {
              data: {
                ...user,
                role: USER_ROLE.ADMIN,
              },
            };
          }
        },
      },
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === '/sign-up/email') {
        const email = String(ctx.body.email);
        const domain = email.split('@')[1].toLowerCase();
        const VALID_DOMAINS = getValidDomains();
        if (!VALID_DOMAINS.includes(domain)) {
          throw new APIError('BAD_REQUEST', {
            message: 'Invalid domain. Please use a valid email.',
          });
        }
        const name = normalizeName(ctx.body.name);

        return {
          context: { ...ctx, body: { ...ctx.body, name } },
        };
      }

      if (ctx.path === '/sign-in/magic-link') {
        const name = normalizeName(ctx.body.name);

        return {
          context: { ...ctx, body: { ...ctx.body, name } },
        };
      }

      if (ctx.path === '/update-user') {
        const name = normalizeName(ctx.body.name);

        return {
          context: {
            ...ctx,
            body: {
              ...ctx.body,
              name,
            },
          },
        };
      }
    }),
  },
  session: {
    expiresIn: 30 * 24 * 60 * 60, // second
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, //5 min
    },
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['google', 'github'],
      allowDifferentEmails: false,
    },
  },
//   socialProviders: {
//     google: {
//       clientId: serverEnv.GOOGLE_CLIENT_ID,
//       clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
//     },

    // github: {
    //   clientId: serverEnv.GITHUB_CLIENT_ID,
    //   clientSecret: serverEnv.GITHUB_CLIENT_SECRET,
    // },
//   },

  plugins: [
    admin({
      defaultRole: USER_ROLE.USER,
      adminRoles: [USER_ROLE.ADMIN],
      ac,
      roles,
    }),
    // magicLink({
    //   sendMagicLink: async ({ email, url }) => {
    //     try {
    //       await sendEmailAction({
    //         // from: serverEnv.GMAIL_USER,
    //         to: email,

    //         subject: 'Your Magic Login Link',

    //         meta: {
    //           title: 'Your Magic Sign In Link',
    //           description: 'Click the button below to sign in:',
    //           buttonText: 'Sign In',
    //           link: url,
    //         },
    //       });
    //     } catch (err) {
    //       console.error('Failed to send email', err);
    //     }
    //   },
    // }),
  ],
} satisfies BetterAuthOptions;

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
    // nextCookies(), // always last
  ],
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | 'UNKNOWN';
