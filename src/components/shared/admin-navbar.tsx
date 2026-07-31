import Link from 'next/link';
import { AuthButtons } from '@/components/auth/auth-buttons';
import { getSession } from '@/lib/auth/auth-utils';
import { Stethoscope } from 'lucide-react';
import { MobileSidebar } from '@/components/shared/mobile-sidebar';
import { adminNavItems } from '@/lib/admin/navitems';
import { NavLink } from '@/components/shared/nav-link';
import { USER_ROLE } from '@/db/schema/auth-schema';

type NavbarProps = {
  session: Awaited<ReturnType<typeof getSession>>;
};

export async function AdminNavbar({ session }: NavbarProps) {
  const isAdmin = session?.user.role === USER_ROLE.ADMIN;

  return (
    <nav className="sticky top-0 z-50 border-b bg-stone-100/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
        {/* Left */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100">
            <Stethoscope className="h-8 w-8 text-blue-700" />
          </div>

          <span className="text-lg font-semibold border-transparent text-gray-900 hover:border-blue-100 hover:bg-blue-50 hover:text-blue-600">
            Physician Portal
          </span>
        </Link>

        {/* Desktop Navigation */}
        {isAdmin && (
          <div className="hidden flex-1 items-center justify-center gap-4 md:flex">
            {adminNavItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.title}
              </NavLink>
            ))}
          </div>
        )}

        {/* Right */}
        <div className="ml-auto flex items-center gap-2">
          <AuthButtons user={session?.user} />

          {/* Mobile only */}
          {isAdmin && (
            <div className="md:hidden">
              <MobileSidebar />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
