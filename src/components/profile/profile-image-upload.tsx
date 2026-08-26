// using UploadDropzone
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { UploadDropzone } from '@/lib/uploadthing';
import { updateProfileImage } from '@/actions/profile/profile-update-image';

export function ProfileImageUpload() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const isBusy = isUploading || isSaving;

  return (
    <div className="space-y-3">
      <UploadDropzone
        endpoint="profileImage"
        config={{
          mode: 'auto',
        }}
        input={{}}
        disabled={isUploading}
        appearance={{
          container:
            'w-full border-2 border-dashed border-primary rounded-lg bg-muted/30 cursor-pointer',
          uploadIcon: 'text-primary',
          label: 'text-base font-medium text-foreground',
          allowedContent: 'text-sm text-muted-foreground',
          button: 'bg-primary text-primary-foreground hover:bg-primary/90',
        }}
        onUploadBegin={() => {
          setIsUploading(true);
          setIsSaving(false);
          setUploadProgress(0);

          toast.loading('Uploading image...', {
            id: 'profile-image-upload',
          });
        }}
        onUploadProgress={(progress) => {
          setUploadProgress(progress);
        }}
        onClientUploadComplete={async (res) => {
          try {
            // UploadThing upload is complete.
            setUploadProgress(100);

            // UploadThing is now finished.
            setIsUploading(false);

            // Database update is now starting.
            setIsSaving(true);

            toast.loading('Saving image...', {
              id: 'profile-image-upload',
            });

            if (!res || res.length === 0) {
              throw new Error('No uploaded file was returned.');
            }

            const file = res[0];

            await updateProfileImage({
              imageUrl: file.ufsUrl,
              imageKey: file.key,
            });

            /*
             * Refresh the Server Component tree.
             *
             * The database now contains the new image URL/key.
             */
            router.refresh();

            /*
             * Give the Server Component tree a chance to
             * render the updated image.
             */
            toast.success('Profile image updated successfully.', {
              id: 'profile-image-upload',
            });
          } catch {
            toast.error('Failed to update profile image.', {
              id: 'profile-image-upload',
            });
          } finally {
            setIsUploading(false);
            setIsSaving(false);
            // Reset after the completion message has been shown.
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
            id: 'profile-image-upload',
          });
        }}
      />

      {/* {isUploading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Please wait while your image is being uploaded...</span>
        </div>
      )} */}

      {isBusy && (
        <div className="space-y-2">
          {/* Status */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              
              <span>
                {isUploading ? 'Uploading image...' : 'Saving image...'}
              </span>
            </div>

            <span className="font-medium tabular-nums">{uploadProgress}%</span>
          </div>

          {/* Progress bar */}
          <div
            className="h-2 w-full overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={uploadProgress}
            aria-label="Image upload progress"
          >
            <div
              className="h-full rounded-full bg-green-500 transition-[width] duration-200 ease-out"
              style={{
                width: `${uploadProgress}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
