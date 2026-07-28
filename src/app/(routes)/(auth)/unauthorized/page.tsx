import { ReturnButton } from '@/components/navigation/return-button';

export default function UnauthorizedPage() {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">403</p>

          <h1 className="text-4xl font-bold tracking-tight">Access Denied</h1>

          <p className="text-muted-foreground">
            You are signed in, but you don't have permission to access this
            page.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <ReturnButton href="/" label="Physician Portal" />
        </div>
      </div>
    </div>
  );
}
