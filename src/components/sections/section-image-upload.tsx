'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { ImageIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { UploadDropzone } from '@/lib/uploadthing';

interface SectionImageUploadProps {
  slug: 'philosophy' | 'research';
  image?: string | null;
}

export function SectionImageUpload({
  slug,
  image,
}: SectionImageUploadProps) {
  const router = useRouter();

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const isBusy = isUploading || isSaving;
  const toastId = `section-image-upload-${slug}`;

  const sectionName =
    slug === 'philosophy' ? 'Philosophy' : 'Research';

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-base font-semibold">
          {sectionName} Image
        </h3>

        <p className="text-sm text-muted-foreground">
          Upload an image to display in the {sectionName} section.
        </p>
      </div>

      {/* Image preview */}
      <div className="flex justify-center">
        {image ? (
          <img
            src={image}
            alt={`${sectionName} section`}
            className="h-40 w-full max-w-md rounded-lg border object-cover"
          />
        ) : (
          <div className="flex h-40 w-full max-w-md items-center justify-center rounded-lg border border-dashed bg-muted">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <ImageIcon className="size-10" />
              <span className="text-sm">No image uploaded yet</span>
            </div>
          </div>
        )}
      </div>

      {/* UploadThing */}
      <UploadDropzone
        endpoint="sectionImage"
        input={{ slug }}
        config={{
          mode: 'auto',
        }}
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

          toast.loading(`Uploading ${sectionName.toLowerCase()} image...`, {
            id: toastId,
          });
        }}
        onUploadProgress={(progress) => {
          setUploadProgress(progress);
        }}
        onClientUploadComplete={(res) => {
          if (!res || res.length === 0) {
            setIsUploading(false);
            setIsSaving(false);
            setUploadProgress(0);

            toast.error('No uploaded file was returned.', {
              id: toastId,
            });
            return;
          }

          setUploadProgress(100);
          setIsUploading(false);
          setIsSaving(true);

          toast.loading(`Saving ${sectionName.toLowerCase()} image...`, {
            id: toastId,
          });

          // The sectionImage endpoint saves the image URL and key
          // directly to the database.
          toast.success(`${sectionName} image uploaded successfully.`, {
            id: toastId,
          });

          router.refresh();

          setIsSaving(false);
          setUploadProgress(0);
        }}
        onUploadError={(error) => {
          console.error(`${sectionName} image upload failed:`, error);

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
            aria-label={`${sectionName} image upload progress`}
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
        Upload an image for this section. Maximum size: 2 MB.
      </p>
    </div>
  );
}
