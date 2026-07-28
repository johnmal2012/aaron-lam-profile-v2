// 2) admin sections page
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { deletePhysicianSection } from '@/actions/section/physician-section-actions';
import { ConfirmActionDialog } from '@/components/shared/confirm-action-dialog';

type SectionDeleteButtonProps = {
  sectionId: number;
};

export function SectionDeleteButton({ sectionId }: SectionDeleteButtonProps) {
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
      title="Delete Section?"
      description="This section will be marked as inactive and can be restored later."
      confirmText="Delete"
      pendingText="Deleting..."
      confirmButtonClassName="bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20"
      trigger={
        <Button variant="destructive" className="h-10 w-24">
          Delete
        </Button>
      }
      onConfirm={handleDelete}
    />
  );
}
