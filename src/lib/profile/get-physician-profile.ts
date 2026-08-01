import { db } from '@/db/db';
import { physicianProfile } from '@/db/schema/physician-profile';
import type { InferSelectModel } from 'drizzle-orm';

type PhysicianProfile = InferSelectModel<typeof physicianProfile>;

type GetPhysicianProfileResult =
  | {
      success: true;
      profile: PhysicianProfile;
    }
  | {
      success: false;
      message: string;
    };

export async function getActivePhysicianProfile(): Promise<GetPhysicianProfileResult> {
  const profiles = await db.query.physicianProfile.findMany({
    where: (profile, { and, eq, isNull }) =>
      and(eq(profile.isActive, true), isNull(profile.deletedAt)),
  });

  if (profiles.length === 0) {
    return {
      success: false,
      message: 'No active physician profile found.',
    };
  }

  if (profiles.length > 1) {
    const message = `Data integrity error: Found ${profiles.length} active physician profiles. Please remove the duplicate profiles.`;

    console.error(
      `Data integrity error: Found ${profiles.length} active physician profiles.`,
      profiles.map((p) => p.id),
    );

    return {
      success: false,
      message,
    };
  }

  return {
    success: true,
    profile: profiles[0],
  };
}
