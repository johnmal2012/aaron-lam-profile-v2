import { LoginForm } from '@/components/auth/login-form';
import { MagicLinkLoginForm } from '@/components/auth/magic-link-login-form';
import { ReturnButton } from '@/components/navigation/return-button';
import { SignInOauthButton } from '@/components/auth/sign-in-oauth-button';
import Link from 'next/link';
import { getSession } from '@/lib/auth-utils';
import { redirect } from 'next/navigation';
import { USER_ROLE } from '@/db/schema/auth-schema';

type LoginProps = {
  searchParams: Promise<{
    reason?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginProps) {
  const { reason } = await searchParams;
    const session = await getSession();
    if (session && (session.user.role === USER_ROLE.ADMIN || session.user.role === USER_ROLE.USER)) {
      redirect('/account-settings');
    }

  return (
    <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
      <div className="space-y-4 max-w-sm mx-auto">
        <ReturnButton href="/" label="Physician Portal" />

        <h1 className="text-3xl font-bold">Login</h1>
      </div>

      <div className="space-y-4 max-w-sm mx-auto">
        <MagicLinkLoginForm />

        {reason === 'login-required' && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            Please sign in to access this page.
          </div>
        )}
        <LoginForm />

        <p className="text-muted-foreground text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="hover:text-foreground">
            Register
          </Link>
        </p>
      </div>

      <hr className="max-w-sm mx-auto" />

      <div className="flex flex-col max-w-sm gap-4 mx-auto">
        <SignInOauthButton provider="google" />
        {/* <SignInOauthButton provider="github" /> */}
      </div>
    </div>
  );
}
