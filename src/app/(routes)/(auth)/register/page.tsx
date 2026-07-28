import { RegisterForm } from '@/components/auth/register-form';
import { ReturnButton } from '@/components/navigation/return-button';
import { SignInOauthButton } from '@/components/auth/sign-in-oauth-button';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
      <div className="space-y-4 max-w-sm mx-auto">
        <ReturnButton href="/" label="Physician Portal" />
        <div className="h-1 bg-muted" />
        <h1 className="text-3xl font-bold">Register</h1>
      </div>

      <div className="space-y-4 max-w-sm mx-auto">
        <RegisterForm />

        <p className="text-muted-foreground text-sm">
          Already have an account?{' '}
          <Link href="/login" className="hover:text-foreground">
            Login
          </Link>
        </p>
      </div>

      <hr className="max-w-sm mx-auto" />

      <div className="flex flex-col max-w-sm gap-4 mx-auto">
        <SignInOauthButton provider="google" signUp />
        <SignInOauthButton provider="github" signUp />
      </div>
    </div>
  );
}
