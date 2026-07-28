import { ReturnButton } from '@/components/navigation/return-button';

interface LoginErrorProps {
  searchParams: Promise<{ error: string }>;
}

export default async function LoginErrorPage({ searchParams }: LoginErrorProps) {
  const error = (await searchParams).error;

  return (
    <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
      <div className="space-y-4">
        <ReturnButton href="/login" label="Login" />

        <h1 className="text-3xl font-bold">Login Error</h1>
      </div>

      <p className="text-destructive">
        {error === 'account_not_linked'
          ? 'This account is already linked to another sign-in method.'
          : 'Oops! Something went wrong. Please try again.'}
      </p>
    </div>
  );
}
