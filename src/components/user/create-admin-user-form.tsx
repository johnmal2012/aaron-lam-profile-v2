'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createAdminSchema,
  type CreateAdminInput,
} from '@/lib/validations/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createAdminUserAction } from '@/actions/user/create-admin-user-action';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { toast } from 'sonner';

export function CreateAdminUserForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<CreateAdminInput, unknown, CreateAdminInput>({
    resolver: zodResolver(createAdminSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  function onSubmit(values: CreateAdminInput) {
    startTransition(async () => {
      try {
        const { error } = await createAdminUserAction(values);

        if (error) {
          toast.error(error);
          return;
        }
        toast.success('Create admin successfully');
        form.reset({
          name: '',
          email: '',
          password: '',
        });
      } catch (err) {
        toast.error('Something went wrong. Please try again.');
        console.error(err);
      }
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
      noValidate
      autoComplete="off"
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="admin-name">Name</FieldLabel>
          <Input
            id="admin-name"
            type="text"
            autoComplete="name"
            aria-invalid={!!form.formState.errors.name}
            {...form.register('name')}
            disabled={isPending}
          />
          <FieldError>
            {form.formState.errors.name?.message}
          </FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="admin-email">Email </FieldLabel>
          <Input
            id="admin-email"
            type="email"
            autoComplete="email"
            aria-invalid={!!form.formState.errors.email}
            {...form.register('email')}
            disabled={isPending}
          />
          <FieldError>{form.formState.errors.email?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="admin-password">Password</FieldLabel>
          <Input
            type="password"
            autoComplete="new-password"
            aria-invalid={!!form.formState.errors.password}
            {...form.register('password')}
            disabled={isPending}
          />
          <FieldError>
            {form.formState.errors.password?.message}
          </FieldError>
        </Field>
      </FieldGroup>

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Creating Admin...' : 'Create Admin'}
      </Button>
    </form>
  );
}
