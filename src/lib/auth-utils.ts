import 'server-only';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type { AppPermissions } from "@/lib/permissions";
import { USER_ROLE } from '@/db/schema/auth-schema';

export async function getSession() {
  const headerList = await headers();
  const session = await auth.api.getSession({
    headers: headerList,
  });

  return session;
}

export async function requireLogin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login?reason=login-required");
  }

  return session;
}

export async function isAdmin() {
  const session = await getSession();

  return session?.user.role === USER_ROLE.ADMIN;
}

export async function requireAdmin() {
  const session = await getSession();

  if (!session) {
    redirect('/login?reason=login-required'); // for unauthenticated users
  }

  if (session.user.role !== USER_ROLE.ADMIN) {
    redirect('/unauthorized');
  }

  return session;
}

// client page
export async function requirePermission(
  permissions: AppPermissions,
) {
  const session = await requireLogin();
  const result = await auth.api.userHasPermission({
    body: {
      userId: session.user.id,
      permissions,
    },
  });

  if (!result.success) {
    redirect('/unauthorized');
  }

  return session;
}
