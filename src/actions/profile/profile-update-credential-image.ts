'use server';

import { eq } from 'drizzle-orm';
import { APIError } from 'better-auth/api';

import { db } from '@/db/db';
import { physicianProfile } from '@/db/schema/physician-profile';
import { requireAdmin } from '@/lib/auth/auth-utils';

import { z } from 'zod';

const credentialImageSchema = z.object({
  profileId: z.number().int().positive(),
  credentialIndex: z.number().int().nonnegative(),
  imageUrl: z.string().url(),
  imageKey: z.string().min(1),
});

export async function updateCredentialImage(
  values: z.infer<typeof credentialImageSchema>,
) {
  try {
    await requireAdmin();

    const validated = credentialImageSchema.safeParse(values);

    if (!validated.success) {
      return { error: 'Invalid credential image data' };
    }

    const { profileId, credentialIndex, imageUrl, imageKey } =
      validated.data;

    // Retrieve the existing JSONB credentials.
    const [profile] = await db
      .select({
        credential: physicianProfile.credential,
      })
      .from(physicianProfile)
      .where(eq(physicianProfile.id, profileId))
      .limit(1);

    if (!profile) {
      return { error: 'Physician profile not found' };
    }

    const credentials = profile.credential;

    if (
      !Array.isArray(credentials) ||
      credentialIndex >= credentials.length
    ) {
      return { error: 'Credential not found' };
    }

    // Update only the selected credential.
    const updatedCredentials = credentials.map(
      (credential, index) =>
        index === credentialIndex
          ? {
              ...credential,
              image: imageUrl,
              imageKey,
            }
          : credential,
    );

    // Save the updated JSONB array.
    await db
      .update(physicianProfile)
      .set({
        credential: updatedCredentials,
        updatedAt: new Date(),
      })
      .where(eq(physicianProfile.id, profileId));

    return { error: null };
  } catch (err) {
    console.error('updateCredentialImage error:', err);

    if (err instanceof APIError) {
      return { error: err.message };
    }

    return { error: 'Internal Server Error' };
  }
}
