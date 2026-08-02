'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { signIn } from '@/lib/auth/auth-client';
import { toast } from 'sonner';

interface SignInOauthButtonProps {
  provider: 'google' | 'github';
  signUp?: boolean;
}

export const SignInOauthButton = ({
  provider,
  signUp,
}: SignInOauthButtonProps) => {
  const [isPending, setIsPending] = useState(false);

  async function handleClick() {
    await signIn.social({
      provider,
      callbackURL: '/account-settings',
      errorCallbackURL: '/login/error',
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success('Login successful. Good to have you back.');
        },
      },
    });
  }

  const action = signUp ? 'Up' : 'In';
  const providerName = provider === 'google' ? 'Google' : 'GitHub';

  return (
    <Button onClick={handleClick} disabled={isPending}>
      Sign {action} with {providerName}
    </Button>
  );
};
