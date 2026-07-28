import 'server-only';
import { z } from 'zod';

export const serverEnv = z
  .object({
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    BETTER_AUTH_URL: z.string().min(1),
    // NEXT_PUBLIC_APP_URL: z.string().min(1),
    ADMIN_EMAILS: z.string().min(1),
    // GMAIL_USER: z.email(),
    // GMAIL_APP_PASSWORD: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    NODE_ENV: z.enum([
        'development',
        'production',
    ]),
    // NODEMAILER_USER: z.string().min(1),
    // NODEMAILER_APP_PASSWORD: z.string().min(1),
    EMAIL_FROM: z.string().min(1),
  })
  .parse({
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    ADMIN_EMAILS: process.env.ADMIN_EMAILS,
    // GMAIL_USER: process.env.GMAIL_USER,
    // GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NODE_ENV: process.env.NODE_ENV,
    // NODEMAILER_USER: process.env.NODEMAILER_USER,
    // NODEMAILER_APP_PASSWORD: process.env.NODEMAILER_APP_PASSWORD,
    EMAIL_FROM: process.env.EMAIL_FROM,
  });
