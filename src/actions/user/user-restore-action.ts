'use server';

import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

import { db } from '@/db/db';
import { user } from '@/db/schema/auth-schema';
import { requireAdmin } from '@/lib/auth-utils';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { APIError } from 'better-auth/api';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function restoreUser(userId: string) {
  const headersList = await headers();
  const session = await requireAdmin();

  try {
    await db
      .update(user)
      .set({
        isActive: true,
        deletedAt: null,
      })
      .where(eq(user.id, userId));

    if (session.user.id === userId) {
      await auth.api.signOut({ headers: headersList });
      redirect('/sign-in');
    }

    revalidatePath('/dashboard');
    return { success: true, error: null };
  } catch (err) {
    if (isRedirectError(err)) {
      throw err; // Let Next.js handle the redirect
    }

    if (err instanceof APIError) {
      return { success: false, error: err.message };
    }
    return { success: false, error: 'Internal Server Error' };
  }
}
