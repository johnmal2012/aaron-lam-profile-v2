'use client';

import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export const SignOutButton = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    await signOut({
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
          toast.success('You’ve logged out. See you soon!');
          router.push('/login');
          router.refresh();
        },
      },
    });
  }

  return (
    <Button
      onClick={handleLogout}
      size="sm"
      variant="destructive"
      disabled={isPending}
    >
      Sign out
    </Button>
  );
};
