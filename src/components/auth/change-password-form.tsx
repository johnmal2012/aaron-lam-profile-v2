// using RHF + useTransition()
'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { changePasswordAction } from '@/actions/auth/change-password.action';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ChangePasswordFormInput,
  ChangePasswordInput,
  changePasswordSchema,
} from '@/lib/validations/auth';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';

export const ChangePasswordForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ChangePasswordFormInput, unknown, ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  async function onFormSubmit(values: ChangePasswordFormInput) {
    startTransition(async () => {
      try {
        const { error } = await changePasswordAction(values);

        if (error) {
          toast.error(error);
          return;
        }
        toast.success('Password changed successfully');
        form.reset({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
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
      {/* <Input
        type="text"
        name="username"
        autoComplete="off"
        style={{ display: 'none' }}
        aria-hidden="true"
      /> */}
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="currentPassword">Current Password</FieldLabel>
          <Input
            id="currentPassword"
            type="password"
            autoComplete="off"
            aria-invalid={!!form.formState.errors.currentPassword}
            {...form.register('currentPassword')}
          />
          <FieldError>
            {form.formState.errors.currentPassword?.message}
          </FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
          <Input
            id="newPassword"
            type="password"
            autoComplete="new-password"
            aria-invalid={!!form.formState.errors.newPassword}
            {...form.register('newPassword')}
          />
          <FieldError>{form.formState.errors.newPassword?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel>Confirm Password</FieldLabel>
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            aria-invalid={!!form.formState.errors.confirmPassword}
            {...form.register('confirmPassword')}
          />
          <FieldError>
            {form.formState.errors.confirmPassword?.message}
          </FieldError>
        </Field>
      </FieldGroup>

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Changing...' : 'Change Password'}
      </Button>
    </form>
  );
};
