import { db } from '@/db/db';
import { physicianProfile } from '@/db/schema/physician-profile';
import type { InferSelectModel } from 'drizzle-orm';

type PhysicianProfile = InferSelectModel<typeof physicianProfile>;

export async function getActivePhysicianProfile(): Promise<PhysicianProfile | null> {
  const profiles = await db.query.physicianProfile.findMany({
    where: (profile, { and, eq, isNull }) =>
      and(eq(profile.isActive, true), isNull(profile.deletedAt)),
  });

  if (profiles.length > 1) {
    console.error(
      `Data integrity error: Found ${profiles.length} active physician profiles.`,
      profiles.map((p) => p.id),
    );

    const message = `Data integrity error: Found ${profiles.length} active physician profiles. Please remove the duplicate profiles.`;


    throw new Error(message);
  }

  return profiles[0] ?? null;
}
