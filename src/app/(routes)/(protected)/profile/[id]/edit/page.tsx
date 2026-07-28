import { eq } from 'drizzle-orm';
import { db } from '@/db/db';
import { physicianProfile } from '@/db/schema';
import { ProfileForm } from '@/components/profile/profile-form';
import { getSession } from '@/lib/auth-utils';
import { EmptyState } from '@/components/shared/EmptyState';
import { UserRoundArrowLeft } from 'lucide-react';

type ProfileEditProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProfileEditPage({ params }: ProfileEditProps) {
  const { id } = await params;

  const [profile, session] = await Promise.all([
    db.query.physicianProfile.findFirst({
    where: eq(physicianProfile.id, Number(id)),
  }),
    getSession(),
  ]);

  if (!profile) {
    return (
      <EmptyState
        title="No Physician Profile found."
        description="Create a physician profile to display on website."
        icon={<UserRoundArrowLeft className="size-12" />}
      />
    );
  }

  const currentUser = session
    ? await db.query.user.findFirst({
        where: (users, { eq }) => eq(users.id, session.user.id),
      })
    : null;

  return (
    <div className="container mx-auto py-10">
      <ProfileForm
        profile={profile}
        userName={currentUser?.name}
        userImage={currentUser?.image}
      />
    </div>
  );
}
