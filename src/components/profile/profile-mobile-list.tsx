import { PhysicianProfile } from '@/lib/types/physician-profile';

import {
  CurrentUser,
  ProfileItem,
} from '@/lib/profile/get-profile-page-data';

import { ProfileDisplayItem } from '@/components/profile/profile-display-item';

export function MobileProfileList({
  profile,
  items,
  currentUser,
}: {
  profile: PhysicianProfile;
  items: readonly ProfileItem[];
  currentUser: CurrentUser | null;
}) {
  return (
    <div className="grid gap-4 md:hidden">
      {items.map((item, index) => (
        <ProfileDisplayItem
          key={item.id}
          item={item}
          index={index}
          profile={profile}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
}
