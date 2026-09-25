'use client';

import { useState } from 'react';

import { Plus, Trash2, Stethoscope, ImageIcon, Loader2 } from 'lucide-react';

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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { UploadDropzone } from '@/lib/uploadthing';

import { cn } from '@/lib/utils';

// Types
interface ExpertiseEditorProps {
  control: Control<PhysicianProfileFormInput>;
  register: UseFormRegister<PhysicianProfileFormInput>;
  setValue: UseFormSetValue<PhysicianProfileFormInput>;
  errors?: any;
}

// Expertise Editor
export function ExpertiseEditor({
  control,
  register,
  setValue,
  errors,
}: ExpertiseEditorProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'expertise',
  });

  function addExpertise() {
    append({
      text: '',
      url: '',
      image: '',
      imageKey: '',
    });
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Expertise</h3>

          <p className="text-sm text-muted-foreground">
            Add areas of expertise displayed on the physician profile.
          </p>
        </div>

        <Button
          type="button"
          className="bg-purple-600 text-white hover:bg-purple-700"
          onClick={addExpertise}
        >
          <Plus className="mr-2 size-4" />
          Add Expertise
        </Button>
      </div>

      {/* Empty state */}
      {fields.length === 0 && (
        <Card className="flex flex-col items-center justify-center gap-3 border-dashed p-8 text-center">
          <Stethoscope className="size-10 text-muted-foreground" />

          <div>
            <p className="font-medium">No expertise added</p>

            <p className="text-sm text-muted-foreground">
              Add an area of expertise to display on the physician profile.
            </p>
          </div>

          <Button
            type="button"
            onClick={addExpertise}
            className="bg-purple-600 text-white hover:bg-purple-700"
          >
            <Plus className="mr-2 size-4" />
            Add Expertise
          </Button>
        </Card>
      )}

      {/* Expertise cards */}
      {fields.map((field, index) => (
        <ExpertiseCard
          key={field.id}
          control={control}
          field={field}
          index={index}
          register={register}
          setValue={setValue}
          remove={remove}
          error={errors?.expertise?.[index]}
        />
      ))}

      {/* Add another */}
      {fields.length > 0 && (
        <div className="flex justify-end">
          <Button
            type="button"
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={addExpertise}
          >
            <Plus className="mr-2 size-4" />
            Add Another Expertise
          </Button>
        </div>
      )}
    </div>
  );
}

/* Expertise Card */
interface ExpertiseCardProps {
  control: Control<PhysicianProfileFormInput>;
  field: FieldArrayWithId<PhysicianProfileFormInput, 'expertise', 'id'>;
  index: number;
  register: UseFormRegister<PhysicianProfileFormInput>;
  setValue: UseFormSetValue<PhysicianProfileFormInput>;
  remove: (index: number) => void;
  error?: any;
}

function ExpertiseCard({
  control,
  field,
  index,
  register,
  setValue,
  remove,
  error,
}: ExpertiseCardProps) {
  // useWatch keeps the thumbnail synchronized with React Hook Form
  // setValue() changes the form value after UploadThing finishes, and useWatch() causes this component to re-render with the newly uploaded image
  const image = useWatch({
    control,
    name: `expertise.${index}.image`,
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
            <h4 className="font-semibold">Expertise {index + 1}</h4>

            <p className="text-xs text-muted-foreground">
              Expertise information and image
            </p>
          </div>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              aria-label={`Delete expertise ${index + 1}`}
              onClick={() => remove(index)}
            >
              <Trash2 className="size-4" />
            </Button>
          </TooltipTrigger>

          <TooltipContent side="left">Delete expertise</TooltipContent>
        </Tooltip>
      </div>

      <div className="space-y-5">
        {/* Expertise text */}
        <Field>
          <FieldLabel>Expertise</FieldLabel>

          <Input
            {...register(`expertise.${index}.text`)}
            placeholder="Sports Injuries"
          />

          <FieldError>{error?.text?.message}</FieldError>
        </Field>

        {/* URL */}
        <Field>
          <FieldLabel>URL</FieldLabel>

          <Input
            {...register(`expertise.${index}.url`)}
            placeholder="https://example.com/sports-injuries"
          />

          <FieldError>{error?.url?.message}</FieldError>
        </Field>

        {/* Expertise image */}
        <Field>
          <FieldLabel>Expertise Image</FieldLabel>

          <ExpertiseImageUpload
            image={image}
            expertiseName={field.text}
            index={index}
            setValue={setValue}
          />

          <FieldError>{error?.image?.message}</FieldError>
        </Field>
      </div>
    </Card>
  );
}
/* Expertise Image Upload */
interface ExpertiseImageUploadProps {
  image?: string;
  expertiseName?: string;
  index: number;
  setValue: UseFormSetValue<PhysicianProfileFormInput>;
}

function ExpertiseImageUpload({
  image,
  expertiseName,
  index,
  setValue,
}: ExpertiseImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const isBusy = isUploading || isSaving;

  const toastId = `expertise-image-upload-${index}`;

  return (
    <div className="space-y-3">
      {/* Image thumbnail */}
      <div className="flex justify-center">
        {image ? (
          <img
            src={image}
            alt={expertiseName || `Expertise ${index + 1} image`}
            className="size-12 border object-cover"
          />
        ) : (
          <div className="flex size-12 items-center justify-center rounded-full border bg-muted">
            <ImageIcon className="size-8 text-muted-foreground" />
          </div>
        )}
      </div>
      {/* UploadThing */}
      <UploadDropzone
        endpoint="expertiseImage"
        config={{
          mode: 'auto',
        }}
        input={{}}
        disabled={isBusy}
        appearance={{
          container:
            'w-full rounded-lg border-2 border-dashed border-purple-600 bg-muted/30 cursor-pointer',
          uploadIcon: 'text-purple-600',
          label: 'text-base font-medium text-foreground',
          allowedContent: 'text-sm text-muted-foreground',
          button: 'bg-purple-600 text-white hover:bg-purple-700',
        }}
        onUploadBegin={() => {
          setIsUploading(true);
          setIsSaving(false);
          setUploadProgress(0);

          toast.loading('Uploading expertise image...', {
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

            toast.loading('Saving expertise image...', {
              id: toastId,
            });

            if (!res || res.length === 0) {
              throw new Error('No uploaded file was returned.');
            }

            const file = res[0];
            // Store the UploadThing URL and key in React Hook Form
            // The actual physician profile database update happens when the main ProfileForm is submitted
            setValue(`expertise.${index}.image`, file.ufsUrl, {
              shouldDirty: true,
              shouldValidate: true,
            });

            setValue(`expertise.${index}.imageKey`, file.key, {
              shouldDirty: true,
            });

            toast.success('Expertise image uploaded successfully.', {
              id: toastId,
            });
          } catch (error) {
            console.error('Expertise image upload failed:', error);

            toast.error('Failed to upload expertise image.', {
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
      {/* Upload progress */}
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
            aria-label="Expertise image upload progress"
          >
            <div
              className="h-full rounded-full bg-purple-600 transition-[width] duration-200 ease-out"
              style={{
                width: `${uploadProgress}%`,
              }}
            />
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Upload an image for this expertise. Maximum size: 2 MB.
      </p>
    </div>
  );
}
