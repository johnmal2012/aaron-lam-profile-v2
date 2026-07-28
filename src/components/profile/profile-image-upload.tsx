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

  return (
    <div className="space-y-3">
      <UploadDropzone
        endpoint="profileImage"
        config={{
            mode: "auto"
        }}
        input={{}}
        disabled={isUploading}
        appearance={{
          container:
            'w-full border-2 border-dashed border-primary rounded-lg bg-muted/30',
          uploadIcon: 'text-primary',
          label: 'text-base font-medium text-foreground',
          allowedContent: 'text-sm text-muted-foreground',
          button: 'bg-primary text-primary-foreground hover:bg-primary/90',
        }}
        onUploadBegin={() => {
          setIsUploading(true);

          toast.loading('Uploading image...', {
            id: 'profile-image-upload',
          });
        }}
        onClientUploadComplete={async (res) => {
          try {
            const file = res[0];

            await updateProfileImage({
              imageUrl: file.ufsUrl,
              imageKey: file.key,
            });

            router.refresh();

            toast.success('Profile image updated successfully.', {
              id: 'profile-image-upload',
            });
          } catch {
            toast.error('Failed to update profile image.', {
              id: 'profile-image-upload',
            });
          } finally {
            setIsUploading(false);
          }
        }}
        onUploadError={(error) => {
          setIsUploading(false);

          toast.error(error.message, {
            id: 'profile-image-upload',
          });
        }}
      />

      {isUploading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Please wait while your image is being uploaded...</span>
        </div>
      )}
    </div>
  );
}
