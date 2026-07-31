'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sendVerificationEmail } from '@/lib/auth/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import {
  SendVerificationEmailFormInput,
  SendVerificationEmailInput,
  sendVerificationEmailSchema,
} from '@/lib/validations/auth';

export const SendVerificationEmailForm = () => {
  const router = useRouter();
  const form = useForm<
    SendVerificationEmailFormInput,
    unknown,
    SendVerificationEmailInput
  >({
    resolver: zodResolver(sendVerificationEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onFormSubmit(values: SendVerificationEmailFormInput) {
    await sendVerificationEmail({
      email: values.email,
      callbackURL: '/verify',
      fetchOptions: {
        onRequest: () => {},
        onResponse: () => {},
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success('Verification email sent successfully.');
          router.push('/verify/success');
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
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!form.formState.errors.email}
            disabled={form.formState.isSubmitting}
            {...form.register('email')}
          />
          <FieldError>{form.formState.errors.email?.message}</FieldError>
        </Field>
      </FieldGroup>

      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting
          ? 'Sending...'
          : 'Resend Verification Email'}
      </Button>
    </form>
  );
};
