'use client';

import { Button } from '@/components/ui/button';
import { restoreProfile } from '@/actions/profile/profile-restore-action';
import { Undo2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ConfirmActionDialog } from '@/components/shared/confirm-action-dialog';

interface RestoreProfileButtonProps {
  profileId: number;
}
export function RestoreProfileButton({ profileId }: RestoreProfileButtonProps) {
  const router = useRouter();

  async function handleRestore(): Promise<{ error: string | null }> {
    try {
      const { error } = await restoreProfile(profileId);

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
      title="Restore Profile?"
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
