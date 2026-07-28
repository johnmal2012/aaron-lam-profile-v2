import { PhysicianProfile } from '@/lib/types/physician-profile';
import { CurrentUser, ProfileItem } from '@/lib/profile/get-profile-page-data';
import { ProfileDisplayItem } from '@/components/profile/ProfileDisplayItem';

export function MobileProfileList({
  profile,
  items,
  currentUser,
}: {
  profile: PhysicianProfile;
  items: ProfileItem;
  currentUser: CurrentUser;
}) {
  return (
    <div className="grid md:hidden gap-4">
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
