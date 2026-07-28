import { ChangePasswordForm } from '@/components/auth/change-password-form';
import { ReturnButton } from '@/components/navigation/return-button';
import { UpdateUserForm } from '@/components/user/user-update-form';
import { Separator } from '@/components/ui/separator';
import { getSession } from '@/lib/auth-utils';
import { db } from '@/db/db';

export default async function AccountSettingsPage() {
  const session = await getSession();

  const currentUser = session
    ? await db.query.user.findFirst({
        where: (users, { eq }) => eq(users.id, session.user.id),
      })
    : null;

  return (
    <div className="px-8 py-16 container mx-auto max-w-3xl space-y-4">
      <ReturnButton href="/" label="Physician Portal" />
      <div className="space-y-4 p-4 rounded-b-md border border-t-8 border-blue-600">
        <h2 className="text-2xl font-bold">Update User Name and/or Image</h2>

        <UpdateUserForm
          name={session?.user.name ?? ''}
          image={session?.user.image ?? ''}
        />
      </div>

      <div className="space-y-4 p-4 rounded-b-md border border-t-8 border-red-600">
        <h2 className="text-2xl font-bold">Change Password</h2>

        <ChangePasswordForm />
      </div>
      <Separator className="my-8 data-[orientation=horizontal]:h-1 bg-slate-300" />
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Profile</h1>

      </div>

      {currentUser?.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={currentUser?.image}
          alt="User Image"
          className="size-32 border border-primary rounded-md object-cover"
        />
      ) : (
        <div className="size-32 border border-primary rounded-md bg-primary text-primary-foreground flex items-center justify-center">
          <span className="uppercase text-lg font-bold">
            {session?.user.name.slice(0, 2)}
          </span>
        </div>
      )}

      <pre className="text-sm overflow-clip">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
