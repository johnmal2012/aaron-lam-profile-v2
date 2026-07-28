import { CurrentUser, ProfilePageData } from "@/lib/profile/get-profile-page-data";
import { PhysicianProfile } from "@/lib/types/physician-profile";
import { cn, getCardBackground } from "@/lib/utils";
import { ProfileDisplayField } from "@/components/profile/profile-display-field";

type ProfileDisplayItemProps = {
    profile: PhysicianProfile,
    currentUser: CurrentUser,
    index: number,
    item: ProfilePageData['items'][number]
}

export function ProfileDisplayItem({
    item,
    index,
    profile,
    currentUser = null,
}: ProfileDisplayItemProps) {
    return (
        <div
            className={cn(
                'rounded-xl border p-4',
                getCardBackground(index),
            )}
        >
            <ProfileDisplayField
                item={item}
                profile={profile}
                currentUser={currentUser}
            />
        </div>
    );
}