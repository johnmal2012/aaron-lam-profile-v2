import { requireLogin } from '@/lib/auth-utils';
import { AdminNavbar } from '@/components/shared/admin-navbar';

export default async function SemiProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await requireLogin();

  return (
    <>
    {session && (
      <AdminNavbar session={session} />)}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        {/* <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-48 shrink-0 border-r bg-muted/30 md:block">
          <nav className="flex flex-col gap-1 p-4">
            <Link
              href="/dashboard"
              className="rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/profile"
              className="rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              Profile
            </Link>

            <Link
              href="/sections"
              className="rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              Sections
            </Link>
          </nav>
        </aside> */}
        {/* <MobileSidebar /> */}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6">{children}</div>
        </main>
      </div>
    </>
  );
}
