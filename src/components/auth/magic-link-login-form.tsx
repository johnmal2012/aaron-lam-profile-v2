'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StarIcon } from 'lucide-react';
import { signIn } from '@/lib/auth-client';
import { toast } from 'sonner';
import {
  magicLinkLoginSchema,
  type MagicLinkLoginFormInput,
  type MagicLinkLoginInput,
} from '@/lib/validations/auth';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

export const MagicLinkLoginForm = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<MagicLinkLoginFormInput, unknown, MagicLinkLoginInput>({
    resolver: zodResolver(magicLinkLoginSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onFormSubmit(values: MagicLinkLoginInput) {
    await signIn.magicLink({
      email: values.email,
      name: values.email.split('@')[0],
      callbackURL: '/account-settings',
      fetchOptions: {
        onRequest: () => {},
        onResponse: () => {},
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success('Check your email for the magic link!');
          setOpen(false);
        },
      },
    });
  }

  return (
    <details
      open={open}
      onToggle={(e) => setOpen(e.currentTarget.open)}
      className="max-w-sm rounded-md border border-purple-600 overflow-hidden cursor-pointer"
    >
      <summary className="flex gap-2 items-center px-2 py-1 bg-purple-600 text-white hover:bg-purple-600/80 transition">
        Try Magic Link <StarIcon size={16} />
      </summary>

      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="px-2 py-1"
        noValidate
      >
        <div className="flex items-end gap-2">
          <div className="flex-1">
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
          </div>

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="cursor-pointer"
          >
            {form.formState.isSubmitting ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </form>
    </details>
  );
};
