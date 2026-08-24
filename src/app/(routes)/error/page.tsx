import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function ProfileErrorPage() {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="max-w-lg space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            400
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Bad Request
          </h1>

          <p className="text-muted-foreground">
            Profile is allowed to have one record. Please remove the extra record.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/nikkilam20020404/dashboard">
              Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}