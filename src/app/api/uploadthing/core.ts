import { createUploadthing, type FileRouter } from 'uploadthing/next';

import { UploadThingError } from 'uploadthing/server';

// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
import z from 'zod';
import { requireAdmin } from '@/lib/auth/auth-utils';
import { db } from '@/db/db';
import { physicianSections } from '@/db/schema/physician-sections';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

const f = createUploadthing();

export const ourFileRouter = {
  // Profile Image
  profileImage: f({
    image: {
      maxFileCount: 1,
      maxFileSize: '2MB',
    },
  })
    .input(
      // zod validation
      z.object({}),
    )

    .middleware(async () => {
      const session = await requireAdmin();

      if (!session) {
        throw new UploadThingError('Unauthorized');
      }

      return {
        userId: session.user.id,
      };
    })

    .onUploadComplete(async ({ metadata, file }) => {
      return {
        userId: metadata.userId,
        imageUrl: file.ufsUrl,
        imageKey: file.key,
      };
    }),
  // Expertise Image
  expertiseImage: f({
    image: {
      maxFileCount: 1,
      maxFileSize: '2MB',
    },
  })
    // .input(z.object({}))
    .middleware(async () => {
      const session = await requireAdmin();

      if (!session) {
        throw new UploadThingError('Unauthorized');
      }

      return {
        userId: session.user.id,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return {
        userId: metadata.userId,
        imageUrl: file.ufsUrl,
        imageKey: file.key,
      };
    }),

  // Credential Image
  credentialImage: f({
    image: {
      maxFileSize: '2MB',
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      // Use the same authentication/authorization
      // middleware you already use for expertiseImage.
      const session = await requireAdmin();

      if (!session) {
        throw new UploadThingError('Unauthorized');
      }

      return {
        userId: session.user.id,
      };
    })
    .onUploadComplete(async ({ file }) => {
      return {
        url: file.ufsUrl,
        key: file.key,
      };
    }),

  // Section Image (Philosophy / Research)
  sectionImage: f({
    image: {
      maxFileCount: 1,
      maxFileSize: '2MB',
    },
  })
    .input(
      z.object({
        slug: z.enum(['philosophy', 'research']),
      }),
    )
    .middleware(async ({ input }) => {
      const session = await requireAdmin();

      if (!session) {
        throw new UploadThingError('Unauthorized');
      }

      return {
        userId: session.user.id,
        slug: input.slug,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const imageUrl = file.ufsUrl;
      const imageKey = file.key;

      await db
        .update(physicianSections)
        .set({
          image: imageUrl,
          imageKey,
        })
        .where(eq(physicianSections.slug, metadata.slug));

      revalidatePath('/');
      revalidatePath('/profile');
      revalidatePath('/sections');

      return {
        userId: metadata.userId,
        slug: metadata.slug,
        imageUrl,
        imageKey,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
