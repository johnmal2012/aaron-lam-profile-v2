'use server';

import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { db } from '@/db/db';
import { physicianProfile } from '@/db/schema/physician-profile';
import { requireAdmin } from '@/lib/auth-utils';
import { APIError } from 'better-auth/api';

export async function restoreProfile(profileId: number) {
  try {
    await requireAdmin();

    await db
      .update(physicianProfile)
      .set({
        isActive: true,
        deletedAt: null,
      })
      .where(eq(physicianProfile.id, profileId));

    revalidatePath('/dashboard');
    
    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }

    return { error: 'Internal Server Error' };
  }
}
