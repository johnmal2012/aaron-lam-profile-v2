import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { USER_ROLE } from '@/db/schema/auth-schema';

const ADMIN_ROUTES = ['/dashboard', '/profile', '/sections'];

const AUTHENTICATED_ROUTES = ['/account-settings'];

function matchesRoute(pathname: string, routes: string[]) {
  return routes.some((route) => pathname.startsWith(route));
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const isAdminRoute = matchesRoute(pathname, ADMIN_ROUTES);
  const isAuthenticatedRoute = matchesRoute(pathname, AUTHENTICATED_ROUTES);

  if (!isAdminRoute && !isAuthenticatedRoute) {
    return NextResponse.next();
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    const loginUrl = new URL('/nikkilam20020404/login', request.url);

    loginUrl.searchParams.set('callbackUrl', pathname + search);

    return NextResponse.redirect(loginUrl);
  }

  if (isAdminRoute && session.user.role !== USER_ROLE.ADMIN) {
    // return NextResponse.redirect(new URL('/unauthorized', request.url));
    return NextResponse.redirect(new URL('/', request.url)); // no one is able to see unauthorized
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/sections/:path*',
    '/account-settings/:path*',
  ],
};
