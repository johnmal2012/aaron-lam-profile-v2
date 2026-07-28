'use server';

import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { db } from '@/db/db';
import { physicianSections } from '@/db/schema/physician-sections';
import { requireAdmin } from '@/lib/auth-utils';
import { APIError } from 'better-auth/api';

export async function restoreSection(sectionId: number) {
  try {
    await requireAdmin();

    await db
      .update(physicianSections)
      .set({
        isActive: true,
        deletedAt: null,
      })
      .where(eq(physicianSections.id, sectionId));

    revalidatePath('/dashboard');

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }

    return { error: 'Internal Server Error' };
  }
}
