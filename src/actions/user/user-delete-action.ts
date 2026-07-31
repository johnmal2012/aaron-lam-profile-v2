// 3) admin dashboard page - user
'use server';

import { db } from '@/db/db';
import { auth } from '@/lib/auth/auth';
import { APIError } from 'better-auth/api';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { user } from '@/db/schema/auth-schema';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { requireAdmin } from '@/lib/auth/auth-utils';

export async function deleteUser(userId: string) {
  const headersList = await headers();
  const session = await requireAdmin();

  try {
    await db
      .update(user)
      .set({
        isActive: false,
        deletedAt: new Date(),
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
