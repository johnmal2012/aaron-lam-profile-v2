'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FormErrors } from '@/lib/types/erros';
import { loginSchema } from '@/lib/validations/auth';
import z from 'zod';
import { signIn } from '@/lib/auth-client';

export const LoginForm = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const [errors, setErrors] = useState<FormErrors>({});

  async function handleSubmit(evt: React.SubmitEvent<HTMLFormElement>) {
    evt.preventDefault();

    setIsPending(true);

    setErrors({});

    try {
      const formData = new FormData(evt.currentTarget);
      const formValues = {
        email: String(formData.get('email') ?? ''),
        password: String(formData.get('password') ?? ''),
      };

      const validatedFields = loginSchema.safeParse(formValues);

      if (!validatedFields.success) {
        const fieldErrors = z.flattenError(validatedFields.error).fieldErrors;

        setErrors({
          email: fieldErrors.email?.[0],
          password: fieldErrors.password?.[0],
        });

        return;
      }

      await signIn.email(
        {
          ...validatedFields.data,
        },
        {
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

            router.push('/profile');
          },
        },
      );
    } catch (err) {
      toast.error('Something went wrong');
      console.error(err);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-4"
    noValidate>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" />
      </div>
      {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}

      <div className="space-y-2">
        <div className="flex justify-between items-center gap-2">
          <Label htmlFor="password">Password</Label>
          <Link
            tabIndex={-1}
            href="/forgot-password"
            className="text-sm italic text-muted-foreground hover:text-foreground"
          >
            Forgot password?
          </Link>
        </div>

        <Input
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
        />
      </div>
      {errors.password && (
        <p className="text-sm text-red-500">{errors.password}</p>
      )}

      <Button type="submit" className="w-full" disabled={isPending}>
        Login
      </Button>
    </form>
  );
};
