import { PhysicianProfile } from '@/lib/types/physician-profile';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PhysicianProfileDeleteButton } from '@/components/profile/profile-delete-button';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CurrentUser } from '@/lib/profile/get-profile-page-data';
import { SquarePen } from 'lucide-react';

export function ProfileCardHeader({
  profile,
  currentUser,
}: {
  profile: PhysicianProfile;
  currentUser: CurrentUser | null;
}) {
  return (
    <CardHeader className="space-y-2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-2xl">{profile.name}</CardTitle>

          <CardDescription className="mt-1">
            {profile.specialty}
          </CardDescription>
        </div>

        {currentUser?.image && (
          <img
            src={currentUser.image}
            alt={currentUser.name ?? 'Profile image'}
            className="size-16 shrink-0 rounded-full border object-cover"
          />
        )}

        <div className="flex gap-2">
          <Button
            asChild
            className="h-10 w-24 bg-green-600! text-white! hover:bg-green-700!"
          >
            <Link href={`/profile/${profile.id}/edit`}><SquarePen className="h-4 w-4" />Edit</Link>
          </Button>

          <PhysicianProfileDeleteButton profileId={profile.id} />
        </div>
      </div>
    </CardHeader>
  );
}
