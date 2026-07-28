// 2) admin dashboard page - profile part
'use client';

import { TrashIcon } from 'lucide-react';
import { deletePhysicianProfile } from '@/actions/profile/physician-profile-actions';
import { Button } from '@/components/ui/button';
import { ConfirmActionDialog } from '@/components/shared/confirm-action-dialog';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface DeleteProfileButtonProps {
  profileId: number;
}

export function DeleteProfileButton({ profileId }: DeleteProfileButtonProps) {
  const router = useRouter();

  async function handleDelete(): Promise<{ error: string | null }> {
    try {
      const { error } = await deletePhysicianProfile(profileId);

      if (error) {
        toast.error(error);
        return { error };
      }

      toast.success('Profile deleted');
      router.refresh();

      return { error: null };
    } catch (error) {
      console.error(error);

      toast.error('Failed to delete profile');
      return { error: 'Failed to delete profile' };
    }
  }

  return (
    <ConfirmActionDialog
      tooltip="Delete profile"
      title="Delete Profile?"
      description="This profile will be marked as inactive and can be restored later."
      confirmText="Delete"
      pendingText="Deleting..."
      confirmButtonClassName="bg-destructive/10 text-destructive hover:bg-destructive/20"
      trigger={
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="size-7 rounded-sm"
        >
          <TrashIcon />
          <span className="sr-only">Delete profile</span>
        </Button>
      }
      onConfirm={handleDelete}
    />
  );
}
