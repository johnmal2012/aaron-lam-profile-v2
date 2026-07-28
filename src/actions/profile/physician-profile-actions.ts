'use server';

import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { db } from '@/db/db';
import { physicianProfile } from '@/db/schema/physician-profile';
import {
  physicianProfileSchema,
  PhysicianProfileInput,
} from '@/lib/validations/physician-profile';
import { requireAdmin, requireLogin } from '@/lib/auth-utils';
import { APIError } from 'better-auth/api';

/* -------------------------------------------------- */
/* CREATE */
/* -------------------------------------------------- */

export async function createPhysicianProfile(values: PhysicianProfileInput) {
  await requireAdmin();

  const validated = physicianProfileSchema.safeParse(values);

  if (!validated.success) {
    return {
      error: 'Invalid profile data',
    };
  }

  try {
    const session = await requireLogin();
    await db
      .insert(physicianProfile)
      .values({
        ...validated.data,
        userId: session.user.id,
      });

    revalidatePath('/');
    revalidatePath('/profile');
    revalidatePath('/section');

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }

    return { error: 'Internal Server Error' };
  }
}

/* -------------------------------------------------- */
/* UPDATE */
/* -------------------------------------------------- */

export async function updatePhysicianProfile(
  id: number,
  values: PhysicianProfileInput,
) {
  await requireAdmin();

  const validated = physicianProfileSchema.safeParse(values);

  if (!validated.success) {
    return {
      error: 'Invalid profile data',
    };
  }

  try {
    await db
      .update(physicianProfile)
      .set({
        ...validated.data,
        updatedAt: new Date(),
      })
      .where(eq(physicianProfile.id, id));

    revalidatePath('/');
    revalidatePath('/profile');
    revalidatePath('/section');

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }

    return { error: 'Internal Server Error' };
  }
}

/* -------------------------------------------------- */
/* DELETE */
/* -------------------------------------------------- */

export async function deletePhysicianProfile(profileId: number) {
  try {
    await requireAdmin();

    await db
      .update(physicianProfile)
      .set({
        isActive: false,
        deletedAt: new Date(),
      })
      .where(eq(physicianProfile.id, profileId));

    revalidatePath('/');
    revalidatePath('/profile');
    revalidatePath('/section');

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }

    return { error: 'Internal Server Error' };
  }
}
