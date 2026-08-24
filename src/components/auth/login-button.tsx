import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function LoginButton() {
  return (
    <Button asChild variant="outline">
      <Link href="/nikkilam20020404/login">
        Login
      </Link>
    </Button>
  );
}