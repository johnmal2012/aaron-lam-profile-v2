// catastrophic errors = catches errors that occur in the root layout or errors that prevent the app from rendering.
// Because it replaces the entire document, it must render <html> and <body>
'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <div className="max-w-lg space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Application Error
              </h1>

              <p className="text-muted-foreground">
                {error.message ||
                  'A critical application error occurred.'}
              </p>

              {process.env.NODE_ENV === 'development' && error.digest && (
                <p className="text-sm text-muted-foreground">
                  Error ID: {error.digest}
                </p>
              )}
            </div>

            <Button onClick={() => reset()}>
              Reload Application
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}