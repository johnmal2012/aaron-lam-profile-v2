import { db } from '@/db/db';
import { physicianProfile } from '@/db/schema/physician-profile';
import type { InferSelectModel } from 'drizzle-orm';

type PhysicianProfile = InferSelectModel<typeof physicianProfile>;

export async function getActivePhysicianProfile(): Promise<PhysicianProfile | null> {
  const profile = await db.query.physicianProfile.findFirst({
    where: (profile, { and, eq, isNull }) =>
      and(
        eq(profile.isActive, true),
        isNull(profile.deletedAt),
      ),
  });
  return profile ?? null;
}