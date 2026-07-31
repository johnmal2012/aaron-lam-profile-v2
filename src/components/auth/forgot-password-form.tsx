'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { requestPasswordReset } from '@/lib/auth/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ForgotPasswordInput,
  forgotPasswordSchema,
  type ForgotPasswordFormInput,
} from '@/lib/validations/auth';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';

export const ForgotPasswordForm = () => {
  const router = useRouter();

  const form = useForm<ForgotPasswordFormInput, unknown, ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onFormSubmit(values: ForgotPasswordFormInput) {
    await requestPasswordReset({
      email: values.email,
      redirectTo: '/reset-password',
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success('Reset link sent to your email.');
          router.push('/forgot-password/success');
        },
      },
    });
  }

  return (
    <form
      className="max-w-sm w-full space-y-4"
      noValidate
      onSubmit={form.handleSubmit(onFormSubmit)}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            type="email"
            id="email"
            aria-invalid={!!form.formState.errors.email}
            {...form.register('email')}
          />
          <FieldError>{form.formState.errors.email?.message}</FieldError>
        </Field>
      </FieldGroup>

      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? 'Sending...' : 'Send Reset Link'}
      </Button>
    </form>
  );
};
