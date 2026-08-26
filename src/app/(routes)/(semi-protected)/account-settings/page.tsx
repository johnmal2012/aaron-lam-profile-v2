import { ChangePasswordForm } from '@/components/auth/change-password-form';
import { ReturnButton } from '@/components/navigation/return-button';
import { UpdateUserForm } from '@/components/user/user-update-form';
import { Separator } from '@/components/ui/separator';
import { getSession, isAdmin } from '@/lib/auth/auth-utils';
import { SettingsSection } from '@/components/settings/settings-section';
import { USER_ROLE } from '@/db/schema/auth-schema';
import { CreateAdminUserForm } from '@/components/user/create-admin-user-form';
import { db } from '@/db/db';
import { eq } from 'drizzle-orm';
import { physicianProfile } from '@/db/schema/physician-profile';

export default async function AccountSettingsPage() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const { user } = session;

  const isAdmin = user.role === USER_ROLE.ADMIN;

  // Get the physician profile belonging to the current user.
  const physician = await db.query.physicianProfile.findFirst({
    where: eq(physicianProfile.userId, user.id),
    columns: {
      image: true,
    },
  });

  // image is the current UploadThing image url.
  const image = physician?.image ?? '';

  return (
    <div className="px-8 py-16 container mx-auto max-w-3xl space-y-4">
      <ReturnButton href="/" label="Physician Portal" />
      <h1 className="text-3xl font-bold">Account Settings</h1>
      <SettingsSection
        title="Update User Name and/or Image"
        borderColor="border-t-blue-600"
        backgroundColor="bg-slate-100"
      >
        <UpdateUserForm name={user.name} image={image} />
      </SettingsSection>

      <Separator className="my-8 data-[orientation=horizontal]:h-1 bg-slate-300" />

      <SettingsSection
        title="Change Password"
        borderColor="border-t-red-600"
        backgroundColor="bg-white"
      >
        <ChangePasswordForm />
      </SettingsSection>

      {isAdmin && (
        <>
          <Separator className="my-8 data-[orientation=horizontal]:h-1 bg-slate-300" />

          <SettingsSection
            title="Create Admin User"
            borderColor="border-t-purple-600"
            backgroundColor="bg-slate-100"
          >
            <CreateAdminUserForm />
          </SettingsSection>
        </>
      )}
    </div>
  );
}
