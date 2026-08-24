import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function GlobalNotFound() {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">404</p>

          <h1 className="text-4xl font-bold tracking-tight">Page Not Found</h1>

          <p className="text-muted-foreground">
            Sorry, the page you&apos;re looking for doesn&apos;t exist, may have
            been moved, or the URL may be incorrect.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>

          {/* <Button asChild variant="outline">
            <Link href="/profile">Go to Profile</Link>
          </Button> */}
        </div>
      </div>
    </div>
  );
}
