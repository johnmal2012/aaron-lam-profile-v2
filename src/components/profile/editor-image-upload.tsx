'use client';

import { useState } from 'react';

import {
  CircleDot,
  ImageIcon,
  Loader2,
} from 'lucide-react';

import type {
  FieldPathByValue,
  UseFormSetValue,
} from 'react-hook-form';

import { toast } from 'sonner';

import { UploadDropzone } from '@/lib/uploadthing';

// Use the same import path as your existing editor files.
import type {
  PhysicianProfileFormInput,
} from '@/lib/validations/physician-profile';

type ImageEndpoint = 'expertiseImage' | 'credentialImage';
type ImageTheme = 'purple' | 'blue';
type PreviewSize = 'small' | 'large';

type ImageFieldPath = FieldPathByValue<
  PhysicianProfileFormInput,
  string | undefined
>;

interface ImageUploadProps {
  image?: string;
  imageAlt: string;
  index: number;
  setValue: UseFormSetValue<PhysicianProfileFormInput>;

  imageField: ImageFieldPath;
  imageKeyField: ImageFieldPath;

  endpoint: ImageEndpoint;
  theme: ImageTheme;
  previewSize: PreviewSize;

  description: string;
  toastLabel: string;
}

const themeStyles = {
  purple: {
    container:
      'border-purple-600',
    icon: 'text-purple-600',
    button: 'bg-purple-600 text-white hover:bg-purple-700',
    progress: 'bg-purple-600',
  },
  blue: {
    container:
      'border-blue-600',
    icon: 'text-blue-600',
    button: 'bg-blue-600 text-white hover:bg-blue-700',
    progress: 'bg-blue-600',
  },
} as const;

export function EditorImageUpload({
  image,
  imageAlt,
  index,
  setValue,
  imageField,
  imageKeyField,
  endpoint,
  theme,
  previewSize,
  description,
  toastLabel,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const toastId = `${endpoint}-${index}`;
  const styles = themeStyles[theme];

  const isSmall = previewSize === 'small';

  const previewClassName = isSmall
    ? 'size-12 border object-cover'
    : 'size-24 rounded-md border bg-white p-2 object-contain';

  const placeholderClassName = isSmall
    ? 'flex size-12 items-center justify-center rounded-full border bg-muted'
    : 'flex size-24 items-center justify-center rounded-md border bg-muted';

  return (
    <div className="space-y-3">
      {/* Image preview */}
      <div className="flex justify-center">
        {image ? (
          <img
            src={image}
            alt={imageAlt}
            className={previewClassName}
          />
        ) : (
          <div className={placeholderClassName}>
            <ImageIcon className="size-8 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* UploadThing */}
      <UploadDropzone
        endpoint={endpoint}
        config={{ mode: 'auto' }}
        content={{
          button: (
            <span className="inline-flex items-center justify-center gap-2">
              <CircleDot
                className="size-4 shrink-0"
                aria-hidden="true"
              />
              <span>Choose File</span>
            </span>
          ),
        }}
        disabled={isUploading}
        appearance={{
          container: `w-full rounded-lg border-2 border-dashed ${styles.container} bg-muted/30 cursor-pointer`,
          uploadIcon: styles.icon,
          label: 'text-base font-medium text-foreground',
          allowedContent: 'text-sm text-muted-foreground',
          button: styles.button,
        }}
        onUploadBegin={() => {
          setIsUploading(true);
          setUploadProgress(0);

          toast.loading(`Uploading ${toastLabel.toLowerCase()}...`, {
            id: toastId,
          });
        }}
        onUploadProgress={(progress) => {
          setUploadProgress(progress);
        }}
        onClientUploadComplete={(res) => {
          try {
            const file = res?.[0];

            if (!file) {
              throw new Error('No uploaded file was returned.');
            }

            // Store the UploadThing URL and key in React Hook Form, not the database
            // The actual physician profile database update happens when the main ProfileForm is submitted
            /*
             * UploadThing is finished.
             *
             * Store the uploaded file information in React Hook Form.
             *
             * UploadThing
             *     ↓
             * setValue()
             *     ↓
             * RHF expertise[index]
             *     ↓
             * Main ProfileForm submit
             *     ↓
             * Zod validation
             *     ↓
             * Server Action
             *     ↓
             * Drizzle
             *     ↓
             * Neon
             */
            setValue(imageField, file.ufsUrl, {
              shouldDirty: true,
              shouldValidate: true,
            });

            setValue(imageKeyField, file.key, {
              shouldDirty: true,
              shouldValidate: true,
            });

            setUploadProgress(100);

            toast.success(
              `${toastLabel} image uploaded successfully.`,
              { id: toastId },
            );
          } catch (error) {
            console.error(`${toastLabel} image upload failed:`, error);

            toast.error(
              `Failed to process ${toastLabel.toLowerCase()} image.`,
              { id: toastId },
            );
          } finally {
            setIsUploading(false);

            setTimeout(() => {
              setUploadProgress(0);
            }, 500);
          }
        }}
        onUploadError={(error) => {
          setIsUploading(false);
          setUploadProgress(0);

          toast.error(error.message, {
            id: toastId,
          });
        }}
      />

      {/* Upload progress */}
      {isUploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" />
              <span>Uploading image...</span>
            </div>

            <span className="font-medium tabular-nums">
              {uploadProgress}%
            </span>
          </div>

          <div
            className="h-2 w-full overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={uploadProgress}
            aria-label={`${toastLabel} image upload progress`}
          >
            <div
              className={`h-full rounded-full ${styles.progress} transition-[width] duration-200 ease-out`}
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
