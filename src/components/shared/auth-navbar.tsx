import Link from 'next/link';
import { Stethoscope } from 'lucide-react';
import { AuthButtons } from '@/components/auth/auth-buttons';
import { getSession } from '@/lib/auth/auth-utils';

export async function AuthNavbar() {
  const session = await getSession();
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100">
            <Stethoscope className="h-5 w-5 text-blue-700" />
          </div>

          <span className="text-lg font-semibold">Physician Portal</span>
        </Link>
        <AuthButtons user={session?.user} />
      </div>
    </header>
  );
}
