'use client';

import { Button } from '@/components/ui/button';
import { restoreSection } from '@/actions/section/section-restore-action';
import { Undo2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ConfirmActionDialog } from '../shared/confirm-action-dialog';

interface RestoreSectionButtonProps {
  sectionId: number;
}
export function RestoreSectionButton({ sectionId }: RestoreSectionButtonProps) {
  const router = useRouter();

  async function handleRestore(): Promise<{ error: string | null }> {
    try {
      const { error } = await restoreSection(sectionId);

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
      tooltip="Restore section"
      title="Restore Section?"
      description="This will reactivate the profile and allow the profile to appear in the active profile list again."
      confirmText="Restore"
      pendingText="Restoring..."
      confirmButtonClassName="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 focus-visible:border-emerald-400/40 focus-visible:ring-emerald-500/20"
      trigger={
        <Button
          className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 focus-visible:border-emerald-400/40 focus-visible:ring-emerald-500/20 size-7 rounded-sm"
          size="icon"
        >
          <Undo2 />
        </Button>
      }
      onConfirm={handleRestore}
    />
  );
}
