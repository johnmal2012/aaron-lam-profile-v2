// 2) admin dashboard page - section
'use client';

import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';
import { deletePhysicianSection } from '@/actions/section/physician-section-actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ConfirmActionDialog } from '@/components/shared/confirm-action-dialog';

interface DeleteSectionButtonProps {
  sectionId: number;
}

export const DeleteSectionButton = ({
  sectionId,
}: DeleteSectionButtonProps) => {
  const router = useRouter();

  async function handleDelete(): Promise<{ error: string | null }> {
    try {
      const { error } = await deletePhysicianSection(sectionId);

      if (error) {
        toast.error(error);
        return { error };
      }

      toast.success('Section deleted');
      router.refresh();

      return { error: null };
    } catch (error) {
      console.error(error);

      toast.error('Failed to delete section');
      return { error: 'Failed to delete section' };
    }
  }

  return (
    <ConfirmActionDialog
      tooltip="Delete section"
      title="Delete Section?"
      description="This section will be marked as inactive and can be restored later."
      confirmText="Delete"
      pendingText="Deleting..."
      confirmButtonClassName="bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20"
      trigger={
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="size-7 rounded-sm"
        >
          <TrashIcon />
          <span className="sr-only">Delete section</span>
        </Button>
      }
      onConfirm={handleDelete}
    />
  );
};
