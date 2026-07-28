// 2) admin profile page
'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { deletePhysicianProfile } from '@/actions/profile/physician-profile-actions';
import { ConfirmActionDialog } from '@/components/shared/confirm-action-dialog';

type PhysicianProfileDeleteProps = {
  profileId: number;
};

export function PhysicianProfileDeleteButton({
  profileId,
}: PhysicianProfileDeleteProps) {
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
      title="Delete Profile?"
      description="This profile will be marked as inactive and can be restored later."
      confirmText="Delete"
      pendingText="Deleting..."
      confirmButtonClassName="bg-destructive hover:bg-destructive/90"
      trigger={
        <Button variant="destructive" className="h-10 w-24">
          Delete
        </Button>
      }
      onConfirm={handleDelete}
    />
  );
}
