'use client';

import { createAuthClient } from 'better-auth/react';
import {
  magicLinkClient,
  inferAdditionalFields,
  adminClient,
  customSessionClient,
} from 'better-auth/client/plugins';
import type { auth } from '@/lib/auth/auth';
import { ac, roles } from '@/lib/auth/permissions';
import { clientEnv } from '@/lib/env/client';

export const authClient = createAuthClient({
  baseURL: clientEnv.NEXT_PUBLIC_APP_URL,
  plugins: [
    magicLinkClient(),
    inferAdditionalFields<typeof auth>(),
    adminClient({ ac, roles }),
    customSessionClient<typeof auth>(),
  ],
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  admin,
  sendVerificationEmail,
  requestPasswordReset,
  resetPassword,
  updateUser,
} = authClient;
