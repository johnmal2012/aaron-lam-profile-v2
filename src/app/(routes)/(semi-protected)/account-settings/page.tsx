import { ChangePasswordForm } from '@/components/auth/change-password-form';
import { ReturnButton } from '@/components/navigation/return-button';
import { UpdateUserForm } from '@/components/user/user-update-form';
import { Separator } from '@/components/ui/separator';
import { getSession } from '@/lib/auth/auth-utils';
import { SettingsSection } from '@/components/settings/settings-section';

export default async function AccountSettingsPage() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const { user } = session;

  return (
    <div className="px-8 py-16 container mx-auto max-w-3xl space-y-4">
      <ReturnButton href="/" label="Physician Portal" />
      <h1 className="text-3xl font-bold">Account Settings</h1>
      <SettingsSection
        title="Update User Name and/or Image"
        borderColor="border-t-blue-600"
      >
        <UpdateUserForm name={user.name} image={user.image ?? ''} />
      </SettingsSection>

      <Separator className="my-8 data-[orientation=horizontal]:h-1 bg-slate-300" />

      <SettingsSection title="Change Password" borderColor="border-t-red-600">
        <ChangePasswordForm />
      </SettingsSection>
    </div>
  );
}
