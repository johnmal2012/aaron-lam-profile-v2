'use client';

import { restoreUser } from '@/actions/user/user-restore-action';
import { Button } from '@/components/ui/button';
import { Undo2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ConfirmActionDialog } from '@/components/shared/confirm-action-dialog';

interface RestoreUserButtonProps {
  userId: string;
}
export function RestoreUserButton({ userId }: RestoreUserButtonProps) {
  const router = useRouter();

  async function handleRestore(): Promise<{ error: string | null }> {
    try {
      const { error } = await restoreUser(userId);

      if (error) {
        toast.error(error);
        return { error };
      }

      toast.success('Profile restored');
      router.refresh();

      return { error: null };
    } catch (error) {
      console.error(error);

      toast.error('Failed to restore profile');
      return { error: 'Failed to restore profile' };
    }
  }

  return (
    <ConfirmActionDialog
      tooltip="Restore user"
      title="Restore User?"
      description="This will reactivate the user and allow the user to appear in the active user list again."
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
