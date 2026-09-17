'use server';

import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { APIError } from 'better-auth/api';

import { db } from '@/db/db';
import { physicianProfile } from '@/db/schema/physician-profile';

import {
  physicianProfileSchema,
} from '@/lib/validations/physician-profile';

import {
  requireAdmin,
} from '@/lib/auth/auth-utils';

import type {
  PhysicianProfilePayload,
} from '@/lib/profile/profile-mappers';

// CREATE
export async function createPhysicianProfile(
  values: PhysicianProfilePayload,
) {
  try {
    await requireAdmin();

    /*
     * Validate the complete payload on the server.
     *
     * At this point:
     *
     * clinics   = Clinic[]
     * expertise = Expertise[]
     *
     * There is no textarea-to-array conversion anymore.
     */
    const validated =
      physicianProfileSchema.safeParse(values);

    if (!validated.success) {
      console.error(
        'Invalid physician profile data:',
        validated.error.flatten(),
      );

      return {
        error: 'Invalid profile data',
      };
    }

    /*
     * requireAdmin() has already authenticated the user,
     * so retrieve the session only after validation.
     */
    const session = await requireAdmin();

    await db
      .insert(physicianProfile)
      .values({
        userId: session.user.id,

        logo: validated.data.logo,
        name: validated.data.name,
        boardSpecialty:
          validated.data.boardSpecialty,
        specialty: validated.data.specialty,
        title: validated.data.title,
        image: validated.data.image,

        clinics: validated.data.clinics,

        phone: validated.data.phone,
        email: validated.data.email,
        linkName: validated.data.linkName,
        footCareLink:
          validated.data.footCareLink,

        expertise: validated.data.expertise,
      });

    revalidateProfilePaths();

    return {
      error: null,
    };
  } catch (err) {
    console.error(
      'createPhysicianProfile error:',
      err,
    );

    if (err instanceof APIError) {
      return {
        error: err.message,
      };
    }

    return {
      error: 'Internal Server Error',
    };
  }
}

// UPDATE
export async function updatePhysicianProfile(
  id: number,
  values: PhysicianProfilePayload,
) {
  try {
    await requireAdmin();

    /*
     * Server-side validation.
     */
    const validated =
      physicianProfileSchema.safeParse(values);

    if (!validated.success) {
      console.error(
        'Invalid physician profile data:',
        validated.error.flatten(),
      );

      return {
        error: 'Invalid profile data',
      };
    }

    /*
     * Only update fields belonging to the physician profile.
     *
     * In particular, userId is NOT changed during an update.
     */
    await db
      .update(physicianProfile)
      .set({
        logo: validated.data.logo,
        name: validated.data.name,
        boardSpecialty:
          validated.data.boardSpecialty,
        specialty: validated.data.specialty,
        title: validated.data.title,
        image: validated.data.image,

        /*
         * Repeatable Clinic Editor data.
         *
         * This is written directly to the JSONB column.
         */
        clinics: validated.data.clinics,

        phone: validated.data.phone,
        email: validated.data.email,
        linkName: validated.data.linkName,
        footCareLink:
          validated.data.footCareLink,

        /*
         * Repeatable Expertise Editor data.
         */
        expertise: validated.data.expertise,

        updatedAt: new Date(),
      })
      .where(eq(physicianProfile.id, id));

    revalidateProfilePaths();

    return {
      error: null,
    };
  } catch (err) {
    console.error(
      'updatePhysicianProfile error:',
      err,
    );

    if (err instanceof APIError) {
      return {
        error: err.message,
      };
    }

    return {
      error: 'Internal Server Error',
    };
  }
}


// DELETE / SOFT 
export async function deletePhysicianProfile(
  profileId: number,
) {
  try {
    await requireAdmin();

    await db
      .update(physicianProfile)
      .set({
        isActive: false,
        deletedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(
        eq(physicianProfile.id, profileId),
      );

    revalidateProfilePaths();

    return {
      error: null,
    };
  } catch (err) {
    console.error(
      'deletePhysicianProfile error:',
      err,
    );

    if (err instanceof APIError) {
      return {
        error: err.message,
      };
    }

    return {
      error: 'Internal Server Error',
    };
  }
}

// Revalidation
function revalidateProfilePaths() {
  revalidatePath('/');
  revalidatePath('/profile');
  revalidatePath('/sections');
}
