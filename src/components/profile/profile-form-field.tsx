'use client';

import { UseFormReturn } from 'react-hook-form';

import { Input } from '@/components/ui/input';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';

import type { ProfileFieldConfig } from '@/lib/profile/profile-form-fields';

import { PhysicianProfileFormInput } from '@/lib/validations/physician-profile';

import { ProfileImageCard } from '@/components/profile/profile-image-card';

import { Textarea } from '@/components/ui/textarea';

type ProfileFieldProps = {
  field: ProfileFieldConfig;
  form: UseFormReturn<PhysicianProfileFormInput>;

  userName?: string | null;
  userImage?: string | null;
};

export function ProfileFormField({
  field,
  form,
  userName,
  userImage,
}: ProfileFieldProps) {
  if (field.type === 'image') {
    return (
      <ProfileImageCard
        userName={userName}
        userImage={userImage}
        label={field.label}
        showUpload
      />
    );
  }

  const error = form.formState.errors[field.name]?.message;

  const register = form.register(field.name);

  return (
    <Field>
      {' '}
      <FieldLabel
        htmlFor={field.name}
        className="ml-2.5 text-sm text-muted-foreground"
      >
        {field.label}

        {field.required && <span className="text-destructive"> *</span>}
      </FieldLabel>
      {/* <Input
        id={field.name}
        placeholder={field.placeholder}
        aria-required={field.required}
        aria-invalid={!!error}
        {...register}
      />
      {field.helperText && (
        <p className="mt-2 text-xs text-muted-foreground">{field.helperText}</p>
      )}
      <FieldError>{error}</FieldError>
    </Field> */}
    {field.type === 'textarea' ? (
        <Textarea
          id={field.name}
          placeholder={field.placeholder}
          aria-required={field.required}
          aria-invalid={!!error}
          {...register}
          rows={5}
          className="min-h-32"
        />
      ) : (
        <Input
          id={field.name}
          placeholder={field.placeholder}
          aria-required={field.required}
          aria-invalid={!!error}
          {...register}
        />
      )}{' '}
      {field.helperText && (
        <p className="mt-2 text-xs text-muted-foreground">
          {' '}
          {field.helperText}{' '}
        </p>
      )}{' '}
      <FieldError>{error}</FieldError>{' '}
    </Field>
  );
}
