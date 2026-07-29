'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { updateUser } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ProfileImageUpload } from '@/components/profile/profile-image-upload';
import { UserAvatar } from '@/components/user/user-avatar';
import {
  UpdateUserFormInput,
  UpdateUserInput,
  updateUserSchema,
} from '@/lib/validations/user';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { useForm, useWatch } from 'react-hook-form';
import { getInitials } from '@/lib/utils';

interface UpdateUserFormProps {
  image?: string | null;
  name?: string | null;
  className?: string;
}

export const UpdateUserForm = ({ name, image }: UpdateUserFormProps) => {
  const router = useRouter();

  const form = useForm<UpdateUserFormInput, unknown, UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: name ?? '',
    },
  });

  const watchedName = useWatch({
    control: form.control,
    name: 'name',
  });

  async function onFormSubmit(values: UpdateUserFormInput) {
    await updateUser({
      name: values.name,
      fetchOptions: {
        onRequest: () => {},
        onResponse: () => {},
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success('User updated successfully');
          form.reset(values);
          router.refresh();
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
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            disabled={form.formState.isSubmitting}
            aria-invalid={!!form.formState.errors.name}
            {...form.register('name')}
          />
          <FieldError>{form.formState.errors.name?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel>Image</FieldLabel>
          <UserAvatar image={image} name={getInitials(watchedName)} size="lg" />
          <ProfileImageUpload />
        </Field>
      </FieldGroup>

      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? 'Updating...' : 'Update User'}
      </Button>
    </form>
  );
};
