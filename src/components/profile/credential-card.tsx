'use client';

import { Trash2 } from 'lucide-react';

import {
  type Control,
  type FieldArrayWithId,
  type UseFieldArrayRemove,
  type UseFormRegister,
  type UseFormSetValue,
  useWatch,
} from 'react-hook-form';

import type { PhysicianProfileFormInput } from '@/lib/validations/physician-profile';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';

import { EditorImageUpload } from '@/components/profile/editor-image-upload';

interface CredentialCardProps {
  control: Control<PhysicianProfileFormInput>;
  field: FieldArrayWithId<PhysicianProfileFormInput, 'credential', 'id'>;
  index: number;
  register: UseFormRegister<PhysicianProfileFormInput>;
  setValue: UseFormSetValue<PhysicianProfileFormInput>;
  remove: UseFieldArrayRemove;
  error?: any;
}

export function CredentialCard({
  control,
  field,
  index,
  register,
  setValue,
  remove,
  error,
}: CredentialCardProps) {
  // Keep the credential type synchronized with React Hook Form.
  const type = useWatch({
    control,
    name: `credential.${index}.type`,
    defaultValue: field.type,
  });

  // Keep the image preview synchronized with React Hook Form.
  // EditorImageUpload updates this field after a successful upload.
  const image = useWatch({
    control,
    name: `credential.${index}.image`,
  });

  // Keep the image alt text synchronized with institution edits.
  const institution = useWatch({
    control,
    name: `credential.${index}.institution`,
  });

  return (
    <Card
      className={cn(
        'rounded-xl border border-slate-200 p-5',
        index % 2 === 0 ? 'bg-white' : 'bg-slate-100',
      )}
    >
      {/* Card header */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-semibold">
            {index + 1}
          </div>

          <div>
            <h4 className="font-semibold">Credential {index + 1}</h4>

            <p className="text-xs text-muted-foreground">
              Training and credential information
            </p>
          </div>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              aria-label={`Delete credential ${index + 1}`}
              onClick={() => remove(index)}
            >
              <Trash2 className="size-4" />
            </Button>
          </TooltipTrigger>

          <TooltipContent side="left">
            Delete credential
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="space-y-5">
        {/* Credential type */}
        <Field>
          <FieldLabel>Credential Type</FieldLabel>

          <Select
            value={type}
            onValueChange={(value) => {
              setValue(
                `credential.${index}.type`,
                value as
                  | 'education'
                  | 'residency'
                  | 'fellowship'
                  | 'certification',
                {
                  shouldDirty: true,
                  shouldValidate: true,
                },
              );
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select credential type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="education">
                Medical Education
              </SelectItem>

              <SelectItem value="residency">
                Residency
              </SelectItem>

              <SelectItem value="fellowship">
                Fellowship
              </SelectItem>

              <SelectItem value="certification">
                Certification
              </SelectItem>
            </SelectContent>
          </Select>

          <FieldError>{error?.type?.message}</FieldError>
        </Field>

        {/* Label */}
        <Field>
          <FieldLabel>Label</FieldLabel>

          <Input
            {...register(`credential.${index}.label`)}
            placeholder="MEDICAL SCHOOL"
          />

          <FieldError>{error?.label?.message}</FieldError>
        </Field>

        {/* Institution */}
        <Field>
          <FieldLabel>Institution</FieldLabel>

          <Textarea
            {...register(`credential.${index}.institution`)}
            placeholder="Baylor University College of Medicine"
            rows={2}
            className="min-h-16 resize-y"
          />

          <p className="text-xs text-muted-foreground">
            Enter the institution name. Use Enter to start a new line wherever
            you want the text to break.
          </p>

          <FieldError>{error?.institution?.message}</FieldError>
        </Field>

        {/* Credential image */}
        <Field>
          <FieldLabel>Credential Image</FieldLabel>

          <EditorImageUpload
            image={image}
            imageAlt={institution || `Credential ${index + 1} image`}
            index={index}
            setValue={setValue}
            imageField={`credential.${index}.image`}
            imageKeyField={`credential.${index}.imageKey`}
            endpoint="credentialImage"
            theme="blue"
            previewSize="large"
            toastLabel="Credential"
            description="Upload an image for this credential. Maximum size: 2 MB."
          />

          <FieldError>{error?.image?.message}</FieldError>
        </Field>
      </div>
    </Card>
  );
}
