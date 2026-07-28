// 1) admin dashboard page
import { ReturnButton } from '@/components/navigation/return-button';
import { DeleteSectionButton } from '@/components/sections/delete-section-button';
import { DeleteProfileButton } from '@/components/profile/delete-profile-button';
import { UserRoleSelect } from '@/components/user/user-role-select';
import { USER_ROLE, UserRole } from '@/db/schema/auth-schema';
import { requireAdmin } from '@/lib/auth-utils';
import { db } from '@/db/db';
import { RestoreUserButton } from '@/components/user/user-restore-button';
import { Separator } from '@/components/ui/separator';
import {
  DeleteUserButton,
  PlaceholderDeleteUserButton,
} from '@/components/user/user-delete-button';
import { RestoreSectionButton } from '@/components/sections/section-restore-button';
import { RestoreProfileButton } from '@/components/profile/profile-restore-button';
import { Badge } from '@/components/ui/badge';

export default async function DashboardPage() {
  const session = await requireAdmin();

  if (session.user.role !== USER_ROLE.ADMIN) {
    return (
      <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
        <div className="space-y-4">
          <ReturnButton href="/profile" label="Profile" />

          <h1 className="text-3xl font-bold">Admin Dashboard</h1>

          <p className="p-2 rounded-md text-lg bg-red-600 text-white font-bold">
            FORBIDDEN
          </p>
        </div>
      </div>
    );
  }

  const activeUsers = await db.query.user.findMany({
    where: (user, { and, eq, isNull }) =>
      and(eq(user.isActive, true), isNull(user.deletedAt)),
  });

  const deletedUsers = await db.query.user.findMany({
    where: (user, { and, eq, isNotNull }) =>
      and(eq(user.isActive, false), isNotNull(user.deletedAt)),
  });

  const sortedUsers = activeUsers.sort((a, b) => {
    if (a.role === USER_ROLE.ADMIN && b.role !== USER_ROLE.ADMIN) return -1;
    if (a.role !== USER_ROLE.ADMIN && b.role === USER_ROLE.ADMIN) return 1;
    return 0;
  });

  const activeSections = await db.query.physicianSections.findMany({
    where: (section, { and, eq, isNull }) =>
      and(eq(section.isActive, true), isNull(section.deletedAt)),
    //   orderBy: (user, { asc }) => [asc(user.name)],
  });

  const deletedSections = await db.query.physicianSections.findMany({
    where: (physicianSections, { and, eq, isNotNull }) =>
      and(
        eq(physicianSections.isActive, false),
        isNotNull(physicianSections.deletedAt),
      ),
  });

  const activeProfile = await db.query.physicianProfile.findMany({
    where: (profile, { and, eq, isNull }) =>
      and(eq(profile.isActive, true), isNull(profile.deletedAt)),
    //   orderBy: (user, { asc }) => [asc(user.name)],
  });

  const deletedProfile = await db.query.physicianProfile.findMany({
    where: (physicianProfile, { and, eq, isNotNull }) =>
      and(
        eq(physicianProfile.isActive, false),
        isNotNull(physicianProfile.deletedAt),
      ),
  });

  return (
    <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
      <div className="space-y-4">
        <ReturnButton href="/" label="Physician Portal" />
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        {/*** User list ***/}
        <p className="flex items-center p-2 rounded-md text-lg bg-green-400 text-white font-bold">
          Users{' '}
          <Badge className="ml-2" variant="secondary">
            {sortedUsers.length}
          </Badge>
        </p>
      </div>

      <div className="w-full overflow-x-auto bg-slate-100">
        <table className="table-auto min-w-full whitespace-nowrap">
          <thead>
            <tr className="border-b text-sm text-left">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2 text-center">Role</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id} className="border-b text-sm text-left">
                <td className="px-4 py-2">{user.id.slice(0, 8)}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 text-center">
                  <UserRoleSelect
                    userId={user.id}
                    role={user.role as UserRole}
                  />
                </td>
                <td className="px-4 py-2 text-center">
                  {user.role === 'user' ? (
                    <DeleteUserButton userId={user.id} />
                  ) : (
                    <PlaceholderDeleteUserButton />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="space-y-4">
        <h2 className="flex items-center p-2 rounded-md text-lg bg-red-400 text-white font-bold">
          Deleted Users{' '}
          <Badge className="ml-2" variant="secondary">
            {deletedUsers.length}
          </Badge>
        </h2>

        <div className="w-full overflow-x-auto">
          <table className="table-auto min-w-full whitespace-nowrap">
            <thead>
              <tr className="border-b text-sm text-left">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {deletedUsers.map((user) => (
                <tr key={user.id} className="border-b text-sm text-left">
                  <td className="px-4 py-2">{user.id.slice(0, 8)}</td>

                  <td className="px-4 py-2">{user.name}</td>

                  <td className="px-4 py-2">{user.email}</td>

                  <td className="px-4 py-2">{user.role}</td>

                  <td className="px-4 py-2 text-center">
                    <RestoreUserButton userId={user.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Separator className="data-[orientation=horizontal]:h-1 bg-slate-300" />
      {/*** Section list ***/}
      <div className="space-y-4 bg-slate-100">
        <h2 className="flex items-center p-2 rounded-md text-lg bg-purple-400 text-white font-bold">
          Sections{' '}
          <Badge className="ml-2" variant="secondary">
            {activeSections.length}
          </Badge>
        </h2>

        <div className="w-full overflow-x-auto">
          <table className="table-auto min-w-full whitespace-nowrap">
            <thead>
              <tr className="border-b text-sm text-left">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Slug</th>
                <th className="px-4 py-2">Display Order</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {activeSections.map((section) => (
                <tr key={section.id} className="border-b text-sm text-left">
                  <td className="px-4 py-2">{section.id}</td>

                  <td className="px-4 py-2">{section.title}</td>

                  <td className="px-4 py-2">{section.slug}</td>

                  <td className="px-4 py-2">{section.displayOrder}</td>

                  <td className="px-4 py-2 text-center">
                    <DeleteSectionButton sectionId={section.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="flex items-center p-2 rounded-md text-lg bg-red-400 text-white font-bold">
          Deleted Sections{' '}
          <Badge className='ml-2' variant="secondary">{deletedSections.length}</Badge>
        </h2>

        <div className="w-full overflow-x-auto">
          <table className="table-auto min-w-full whitespace-nowrap">
            <thead>
              <tr className="border-b text-sm text-left">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Slug</th>
                <th className="px-4 py-2">Display Order</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {deletedSections.map((section) => (
                <tr key={section.id} className="border-b text-sm text-left">
                  <td className="px-4 py-2">{section.id}</td>

                  <td className="px-4 py-2">{section.title}</td>

                  <td className="px-4 py-2">{section.slug}</td>

                  <td className="px-4 py-2">{section.displayOrder}</td>

                  <td className="px-4 py-2 text-center">
                    <RestoreSectionButton sectionId={section.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Separator className="data-[orientation=horizontal]:h-1 bg-slate-300" />
      {/*** Profile list ***/}
      <div className="space-y-4 bg-slate-100">
        <h2 className="flex items-center p-2 rounded-md text-lg bg-blue-400 text-white font-bold">
          Profiles <Badge className='ml-2' variant="secondary">{activeProfile.length}</Badge>
        </h2>

        <div className="w-full overflow-x-auto">
          <table className="table-auto min-w-full whitespace-nowrap">
            <thead>
              <tr className="border-b text-sm text-left">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Clinic Name</th>
                <th className="px-4 py-2">Clinic Address</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {activeProfile.map((profile) => (
                <tr key={profile.id} className="border-b text-sm text-left">
                  <td className="px-4 py-2">{profile.id}</td>

                  <td className="px-4 py-2">{profile.name}</td>

                  <td className="px-4 py-2">{profile.clinicName}</td>

                  <td className="px-4 py-2">{profile.clinicAddress}</td>

                  <td className="px-4 py-2 text-center">
                    <DeleteProfileButton profileId={profile.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="flex items-center p-2 rounded-md text-lg bg-red-400 text-white font-bold">
          Deleted Profiles <Badge className='ml-2' variant="secondary">{deletedProfile.length}</Badge>
        </h2>

        <div className="w-full overflow-x-auto">
          <table className="table-auto min-w-full whitespace-nowrap">
            <thead>
              <tr className="border-b text-sm text-left">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Clinic Name</th>
                <th className="px-4 py-2">Clinic Address</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {deletedProfile.map((profile) => (
                <tr key={profile.id} className="border-b text-sm text-left">
                  <td className="px-4 py-2">{profile.id}</td>

                  <td className="px-4 py-2">{profile.name}</td>

                  <td className="px-4 py-2">{profile.clinicName}</td>

                  <td className="px-4 py-2">{profile.clinicAddress}</td>

                  <td className="px-4 py-2 text-center">
                    <RestoreProfileButton profileId={profile.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
