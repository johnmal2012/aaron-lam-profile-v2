import { PhysicianProfile } from '@/lib/types/physician-profile';
import { CurrentUser, ProfileItem } from '@/lib/profile/get-profile-page-data';
import { ProfileDisplayItem } from '@/components/profile/ProfileDisplayItem';

export function DesktopProfileGrid({
  profile,
  items,
  currentUser,
}: {
  profile: PhysicianProfile;
  items: ProfileItem;
  currentUser: CurrentUser;
}) {
  return (
    <div className="hidden gap-4 md:grid md:grid-cols-2">
      {items.map((item, index: number) => (
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
