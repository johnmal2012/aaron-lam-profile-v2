'use client';

import { ProfileImageUpload } from '@/components/profile/profile-image-upload';

type ProfileImageCardProps = {
  userName?: string | null;
  userImage?: string | null;
  label?: string;
  showUpload?: boolean;
};

export function ProfileImageCard({
  userName,
  userImage,
  label = 'Image',
  showUpload = false,
}: ProfileImageCardProps) {
  return (
    <div className="flex flex-col items-center">
      <p className="pb-2 text-sm text-muted-foreground">
        {label}
      </p>

      {/* <UserAvatar
        image={userImage}
        name={getInitials(userName ?? '')}
        className="h-12 w-12"
      /> */}

      {showUpload && (
        <div className="mt-2 w-full">
          <ProfileImageUpload
            image={userImage}
            userName={userName}
          />
        </div>
      )}
    </div>
  );
}
