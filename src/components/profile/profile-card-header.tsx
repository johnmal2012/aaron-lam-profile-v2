import { PhysicianProfile } from '@/lib/types/physician-profile';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PhysicianProfileDeleteButton } from '@/components/profile/profile-delete-button';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function ProfileCardHeader({ profile }: { profile: PhysicianProfile }) {
  return (
    <CardHeader className="space-y-2">
      <div className="flex items-start justify-between gap-4">
        <div>
          <CardTitle className="text-2xl">{profile.name}</CardTitle>

          <CardDescription className="mt-1">
            {profile.specialty}
          </CardDescription>
        </div>

        <div className="flex gap-2">
          <Button
            asChild
            className="h-10 w-24 bg-green-600! text-white! hover:bg-green-700!"
          >
            <Link href={`/profile/${profile.id}/edit`}>Edit</Link>
          </Button>

          <PhysicianProfileDeleteButton profileId={profile.id} />
        </div>
      </div>
    </CardHeader>
  );
}
