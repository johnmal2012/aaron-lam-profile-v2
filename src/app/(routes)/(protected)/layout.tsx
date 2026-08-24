import { requireAdmin } from '@/lib/auth/auth-utils';
import { AdminNavbar } from '@/components/shared/admin-navbar';
import { redirect } from 'next/navigation';
import { USER_ROLE } from '@/db/schema/auth-schema';
import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireAdmin();

  // enforce admin authorization here, then every page under (protected) get same protection
  if (!session) {
    redirect('/nikkilam20020404/login');
  }

  if (session.user.role !== USER_ROLE.ADMIN) {
    redirect('/');
  }
  
  return (
    <>
      <AdminNavbar session={session} />
      <div className="flex min-h-screen">
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6">{children}</div>
        </main>
      </div>
    </>
  );
}
