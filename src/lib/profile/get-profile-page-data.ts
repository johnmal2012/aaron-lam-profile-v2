import { db } from '@/db/db';
import { getActivePhysicianProfile } from '@/lib/profile/get-physician-profile';
import { getProfileItems } from '@/lib/profile/get-profile-items';
import { PhysicianProfile } from '@/lib/types/physician-profile';

type CurrentUserId = string | null;

type ProfilePageDataSuccess = {
  success: true;
  profile: PhysicianProfile;
  currentUser: {
    image: string | null;
    name: string | null;
  } | null;
  items: ReturnType<typeof getProfileItems>;
};

type ProfilePageDataError = {
  success: false;
  message: string;
};

export type ProfilePageDataResult =
  | ProfilePageDataSuccess
  | ProfilePageDataError;
  
export async function getProfilePageData(currentUserId: CurrentUserId): Promise<ProfilePageDataResult> {
  const result = await getActivePhysicianProfile();

  if (!result.success) {
    return {
      success: false,
      message: result.message,
    };
  }

  const profile = result.profile;

  if (!profile) {
    return {
      success: false,
      message: 'No active physician profile found.',
    };
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
        .then((user) => user ?? null)
      : Promise.resolve(null),

    Promise.resolve(getProfileItems(profile)),
  ]);

  return {
    success: true,
    profile,
    currentUser,
    items,
  };
}

export type ProfilePageData = Extract<
  Awaited<ReturnType<typeof getProfilePageData>>,
  { success: true }
>;

export type CurrentUser = ProfilePageData['currentUser'];

// single item type
// export type ProfileItem = ProfilePageData['items'][number];
// array items type
export type ProfileItem = ProfilePageData['items'];
