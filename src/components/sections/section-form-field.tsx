'use client';

import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { PhysicianSectionFormInput } from '@/lib/validations/physician-section';
import { SectionFormField } from '@/lib/sections/section-form-fields';

type SectionFormProps = {
  field: SectionFormField;
  form: UseFormReturn<PhysicianSectionFormInput>;
};

export function SectionField({ field, form }: SectionFormProps) {
  const error = form.formState.errors[field.name]?.message;

  return (
    <Field>
      <FieldLabel
        htmlFor={field.id}
        className="ml-2.5 text-sm text-muted-foreground"
      >
        {field.label}

        {field.required && <span className="text-destructive"> *</span>}
      </FieldLabel>

      {field.type === 'textarea' ? (
        <Textarea
          id={field.id}
          placeholder={field.placeholder}
          className="min-h-96 resize-y font-mono text-sm"
          aria-invalid={!!error}
          {...form.register(field.name)}
        />
      ) : (
        <Input
          id={field.id}
          type={field.type === 'number' ? 'number' : 'text'}
          min={field.type === 'number' ? 0 : undefined}
          placeholder={field.placeholder}
          aria-invalid={!!error}
          {...form.register(field.name, {
            valueAsNumber: field.type === 'number',
          })}
        />
      )}

      {field.helperText && (
        <p className="ml-3 mt-2 text-xs text-muted-foreground">
          {field.helperText}
        </p>
      )}

      <FieldError>{error}</FieldError>
    </Field>
  );
}
