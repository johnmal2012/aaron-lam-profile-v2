'use client';

import { LoginButton } from '@/components/auth/login-button';
import { RegisterButton } from '@/components/auth/register-button';
import { SignOutButton } from '@/components/auth/sign-out-button';

type AuthButtonsProps = {
  user?: {
    id: string;
    name: string;
    email: string;
  } | null;
};

export function AuthButtons({ user }: AuthButtonsProps) {
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <LoginButton />
        <RegisterButton />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="max-w-32 truncate text-sm text-muted-foreground">{user.name}</span>
      <SignOutButton />
    </div>
  );
}
