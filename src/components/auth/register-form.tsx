'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { signUpEmailAction } from '@/actions/auth/sign-up-email.action';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  RegisterFormInput,
  RegisterInput,
  registerSchema,
} from '@/lib/validations/auth';
import { useTransition } from 'react';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { useRouter } from 'next/navigation';

export const RegisterForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<RegisterFormInput, unknown, RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onFormSubmit(values: RegisterFormInput) {
    startTransition(async () => {
      try {
        const { error } = await signUpEmailAction(values);

        if (error) {
          toast.error(error);
          return;
        }
        toast.success('Registration complete. You are all set.');
        router.replace('/nikkilam20020404/register/success');
      } catch (err) {
        toast.error('Something went wrong. Please try again.');
        console.error(err);
      }
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onFormSubmit)}
      className="max-w-sm w-full space-y-4"
      noValidate
      autoComplete="off"
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Name</FieldLabel>
          <Input
            id="name"
            type="text"
            autoComplete="new-name"
            aria-invalid={!!form.formState.errors.name}
            {...form.register('name')}
          />
          <FieldError errors={[form.formState.errors.name]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            autoComplete="new-password"
            aria-invalid={!!form.formState.errors.email}
            {...form.register('email')}
          />
          <FieldError errors={[form.formState.errors.email]} />
        </Field>

        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password">Password</FieldLabel>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            aria-invalid={!!form.formState.errors.password}
            {...form.register('password')}
          />
          <FieldError errors={[form.formState.errors.password]} />
        </Field>
      </FieldGroup>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? 'Registering...' : 'Register'}
      </Button>
    </form>
  );
};
