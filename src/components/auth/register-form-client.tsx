'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/auth/auth-client';
import { toast } from 'sonner';
import { registerSchema } from '@/lib/validations/auth';
import z from 'zod';
import { FormErrors } from '@/lib/types/erros';

export const RegisterForm = () => {
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
        name: String(formData.get('name') ?? ''),
        email: String(formData.get('email') ?? ''),
        password: String(formData.get('password') ?? ''),
      };

      const validatedFields = registerSchema.safeParse(formValues);

      if (!validatedFields.success) {
        const fieldErrors = z.flattenError(validatedFields.error).fieldErrors;

        setErrors({
          name: fieldErrors.name?.[0],
          email: fieldErrors.email?.[0],
          password: fieldErrors.password?.[0],
        });

        return;
      }

      await signUp.email(
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
            toast.success("Registration complete. You're all set.");
            router.push('/register/success');
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
    <form
      onSubmit={handleSubmit}
      className="max-w-sm w-full space-y-4"
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>

        <Input id="name" name="name" placeholder="Name" />

        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          type="email"
          id="email"
          name="email"
          autoComplete="username"
          placeholder="Email"
        />

        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>

        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          autoComplete="new-password"
        />

        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? 'Creating account...' : 'Register'}
      </Button>
    </form>
  );
};
