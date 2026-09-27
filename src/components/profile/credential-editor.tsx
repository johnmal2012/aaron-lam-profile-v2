// CredentialEditor > React Hook Form > form.getValues() > toProfilePayload() > normalizeCredentials() > credential: Credential[] > physicianProfileSchema.safeParse() > validated.data.credential > updatePhysicianProfile() > credential: validated.data.credential > Drizzle UPDATE > physician_profile.credential JSONB
'use client';

import { useState } from 'react';

import { Award, ImageIcon, Loader2, Plus, Trash2 } from 'lucide-react';

import {
  Control,
  FieldArrayWithId,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray,
  useWatch,
} from 'react-hook-form';

import { toast } from 'sonner';

import type { PhysicianProfileFormInput } from '@/lib/validations/physician-profile';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';

import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';

import { Card } from '@/components/ui/card';

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

import { UploadDropzone } from '@/lib/uploadthing';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

interface CredentialEditorProps {
  control: Control<PhysicianProfileFormInput>;
  register: UseFormRegister<PhysicianProfileFormInput>;
  setValue: UseFormSetValue<PhysicianProfileFormInput>;
  errors?: any;
}

export function CredentialEditor({
  control,
  register,
  setValue,
  errors,
}: CredentialEditorProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'credential',
  });

  function addCredential() {
    append({
      type: 'education',
      label: '',
      institution: '',
      breakAfter: '',
      image: '',
      imageKey: '',
    });
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Training & Credentials</h3>

          <p className="text-sm text-muted-foreground">
            Add medical school, residency, fellowship, and certification
            credentials.
          </p>
        </div>

        <Button
          type="button"
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={addCredential}
        >
          <Plus className="mr-2 size-4" />
          Add Credential
        </Button>
      </div>

      {/* Empty state */}
      {fields.length === 0 && (
        <Card className="flex flex-col items-center justify-center gap-3 border-dashed p-8 text-center">
          <Award className="size-10 text-muted-foreground" />

          <div>
            <p className="font-medium">No credentials added</p>

            <p className="text-sm text-muted-foreground">
              Add training or credential information to display on the physician
              website.
            </p>
          </div>

          <Button
            type="button"
            onClick={addCredential}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <Plus className="mr-2 size-4" />
            Add Credential
          </Button>
        </Card>
      )}

      {/* Credential cards */}
      {fields.map((field, index) => (
        <CredentialCard
          key={field.id}
          control={control}
          field={field}
          index={index}
          register={register}
          setValue={setValue}
          remove={remove}
          error={errors?.credential?.[index]}
        />
      ))}

      {/* Add another */}
      {fields.length > 0 && (
        <div className="flex justify-end">
          <Button
            type="button"
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={addCredential}
          >
            <Plus className="mr-2 size-4" />
            Add Another Credential
          </Button>
        </div>
      )}
    </div>
  );
}

// Credential Card
interface CredentialCardProps {
  control: Control<PhysicianProfileFormInput>;
  field: FieldArrayWithId<PhysicianProfileFormInput, 'credential', 'id'>;
  index: number;
  register: UseFormRegister<PhysicianProfileFormInput>;
  setValue: UseFormSetValue<PhysicianProfileFormInput>;
  remove: (index: number) => void;
  error?: any;
}

function CredentialCard({
  control,
  field,
  index,
  register,
  setValue,
  remove,
  error,
}: CredentialCardProps) {
  const type = useWatch({
    control,
    name: `credential.${index}.type`,
    defaultValue: field.type,
  });

  const image = useWatch({
    control,
    name: `credential.${index}.image`,
  });

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
      {/* Header */}
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

          <TooltipContent side="left">Delete credential</TooltipContent>
        </Tooltip>
      </div>

      <div className="space-y-5">
        {/* Type */}
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
              <SelectItem value="education">Medical Education</SelectItem>

              <SelectItem value="residency">Residency</SelectItem>

              <SelectItem value="fellowship">Fellowship</SelectItem>

              <SelectItem value="certification">Certification</SelectItem>
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

          <Input
            {...register(`credential.${index}.institution`)}
            placeholder="Albert Einstein College of Medicine"
          />

          <FieldError>{error?.institution?.message}</FieldError>
        </Field>

        {/* Break afer */}
        <div className="space-y-2">
          <Label htmlFor={`credential-${index}-breakAfter`}>Break After</Label>

          <Input
            id={`credential-${index}-breakAfter`}
            placeholder="Example: Albert Einstein"
            {...register(`credential.${index}.breakAfter`)}
          />

          <p className="text-xs text-muted-foreground">
            Optional. The institution will break into two lines after this text.
          </p>
        </div>
        {/* Image */}
        <Field>
          <FieldLabel>Credential Image</FieldLabel>

          <CredentialImageUpload
            image={image}
            institution={institution}
            index={index}
            setValue={setValue}
          />

          <FieldError>{error?.image?.message}</FieldError>
        </Field>
      </div>
    </Card>
  );
}

// Credential Image Upload
interface CredentialImageUploadProps {
  image?: string;
  institution?: string;
  index: number;
  setValue: UseFormSetValue<PhysicianProfileFormInput>;
}

function CredentialImageUpload({
  image,
  institution,
  index,
  setValue,
}: CredentialImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const [uploadProgress, setUploadProgress] = useState(0);

  const [isSaving, setIsSaving] = useState(false);

  const isBusy = isUploading || isSaving;

  const toastId = `credential-image-upload-${index}`;

  return (
    <div className="space-y-3">
      {/* Preview */}
      <div className="flex justify-center">
        {image ? (
          <img
            src={image}
            alt={institution || `Credential ${index + 1} image`}
            className="size-24 rounded-md border object-contain bg-white p-2"
          />
        ) : (
          <div className="flex size-24 items-center justify-center rounded-md border bg-muted">
            <ImageIcon className="size-8 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* UploadThing */}
      <UploadDropzone
        endpoint="credentialImage"
        config={{
          mode: 'auto',
        }}
        disabled={isBusy}
        appearance={{
          container:
            'w-full rounded-lg border-2 border-dashed border-blue-600 bg-muted/30 cursor-pointer',

          uploadIcon: 'text-blue-600',

          label: 'text-base font-medium text-foreground',

          allowedContent: 'text-sm text-muted-foreground',

          button: 'bg-blue-600 text-white hover:bg-blue-700',
        }}
        onUploadBegin={() => {
          setIsUploading(true);
          setIsSaving(false);
          setUploadProgress(0);

          toast.loading('Uploading credential image...', {
            id: toastId,
          });
        }}
        onUploadProgress={(progress) => {
          setUploadProgress(progress);
        }}
        onClientUploadComplete={async (res) => {
          try {
            setUploadProgress(100);
            setIsUploading(false);
            setIsSaving(true);

            toast.loading('Saving credential image...', {
              id: toastId,
            });

            if (!res || res.length === 0) {
              throw new Error('No uploaded file was returned.');
            }

            const file = res[0];

            setValue(`credential.${index}.image`, file.ufsUrl, {
              shouldDirty: true,
              shouldValidate: true,
            });

            setValue(`credential.${index}.imageKey`, file.key, {
              shouldDirty: true,
            });

            toast.success('Credential image uploaded successfully.', {
              id: toastId,
            });
          } catch (error) {
            console.error('Credential image upload failed:', error);

            toast.error('Failed to upload credential image.', {
              id: toastId,
            });
          } finally {
            setIsUploading(false);
            setIsSaving(false);

            setTimeout(() => {
              setUploadProgress(0);
            }, 500);
          }
        }}
        onUploadError={(error) => {
          setIsUploading(false);
          setIsSaving(false);
          setUploadProgress(0);

          toast.error(error.message, {
            id: toastId,
          });
        }}
      />

      {/* Progress */}
      {isBusy && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" />

              <span>
                {isUploading ? 'Uploading image...' : 'Saving image...'}
              </span>
            </div>

            <span className="font-medium tabular-nums">{uploadProgress}%</span>
          </div>

          <div
            className="h-2 w-full overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={uploadProgress}
            aria-label="Credential image upload progress"
          >
            <div
              className="h-full rounded-full bg-blue-600 transition-[width] duration-200 ease-out"
              style={{
                width: `${uploadProgress}%`,
              }}
            />
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Upload an image for this credential. Maximum size: 2 MB.
      </p>
    </div>
  );
}
