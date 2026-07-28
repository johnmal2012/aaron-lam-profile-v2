import { requireAdmin } from '@/lib/auth-utils';
import { AdminNavbar } from '@/components/shared/admin-navbar';

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await requireAdmin();

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
