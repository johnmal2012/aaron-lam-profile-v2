'use server';

import { db } from '@/db/db';
import { physicianProfile, user } from '@/db/schema';
import { eq } from 'drizzle-orm';

import { requireAdmin } from '@/lib/auth/auth-utils';
import { utapi } from '@/lib/uploadthing-server';
import { revalidatePath } from 'next/cache';

export async function updateProfileImage(data: {
  imageUrl: string;
  imageKey: string;
}) {
  const session = await requireAdmin();

  const [currentUser, physicianProfileData] = await Promise.all([
    db.query.user.findFirst({
      where: eq(user.id, session.user.id),
      columns: {
        id: true,
        name: true,
        email: true,
        imageKey: true,
      },
    }),

    db.query.physicianProfile.findFirst({
      where: eq(physicianProfile.userId, session.user.id),
      columns: {
        imageKey: true,
      },
    }),
  ]);

  if (!currentUser) {
    throw new Error('User not found');
  }

  // 1. Update Better Auth user's image and imageKey.
  await db
    .update(user)
    .set({
      image: data.imageUrl,
      imageKey: data.imageKey,
    })
    .where(eq(user.id, session.user.id));

  // 2. Update physician profile's image and  imageKey.
  if (physicianProfileData) {
    await db
      .update(physicianProfile)
      .set({
        image: data.imageUrl,
        imageKey: data.imageKey,
      })
      .where(eq(physicianProfile.userId, session.user.id));
  } else {
    await db.insert(physicianProfile).values({
      userId: session.user.id,
      image: data.imageUrl,
      imageKey: data.imageKey,
      name: currentUser.name,
      email: currentUser.email,
      createdAt: new Date(),
    });
  }

  if (currentUser.imageKey) {
    await utapi.deleteFiles(currentUser.imageKey);
  }

  if (physicianProfileData?.imageKey) {
    await utapi.deleteFiles(physicianProfileData.imageKey);
  }

  // 3. Invalidate all pages that display the image.
  revalidatePath('/profile');
  revalidatePath('/account-settings');
  revalidatePath('/');

  return {
    success: true,
    message: 'Profile image updated successfully',
  };
}
