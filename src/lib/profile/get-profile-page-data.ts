import { db } from '@/db/db';
import { getActivePhysicianProfile } from '@/lib/profile/get-physician-profile';
import { getProfileItems } from '@/lib/profile/get-profile-items';

type CurrentUserId = string | null;

export async function getProfilePageData(currentUserId: CurrentUserId) {
  const profile = await getActivePhysicianProfile();

  if (!profile) {
    return null;
  }

  const [currentUser, items] = await Promise.all([
    currentUserId
      ? db.query.user.findFirst({
          columns: {
            image: true,
            name: true,
          },
          where: (user, { eq }) => eq(user.id, currentUserId),
        })
      : Promise.resolve(null),

    Promise.resolve(getProfileItems(profile)),
  ]);

  return {
    profile,
    currentUser,
    items,
  };
}

export type ProfilePageData = NonNullable<
  Awaited<ReturnType<typeof getProfilePageData>>
>;

export type CurrentUser = ProfilePageData['currentUser'];

// single item type
// export type ProfileItem = ProfilePageData['items'][number];
// array items type
export type ProfileItem = ProfilePageData['items'];