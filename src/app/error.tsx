// catches most runtime errors in your app (pages, layouts, server components below the root layout)
'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function GeneralError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="max-w-lg space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Something went wrong
          </h1>

          <p className="text-muted-foreground">
            {error.message ||
              'An unexpected error occurred. Please try again.'}
          </p>

          {process.env.NODE_ENV === 'development' && error.digest && (
            <p className="text-sm text-muted-foreground">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={() => reset()}>
            Try Again
          </Button>

          <Button
            asChild
            variant="outline"
          >
            <Link href="/">
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}