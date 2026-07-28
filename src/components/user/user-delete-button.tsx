// 2) admin dashboard page - user
'use client';

import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';
import { deleteUser } from '@/actions/user/user-delete-action';
import { IconTooltip } from '@/components/shared/icon-tooltip';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ConfirmActionDialog } from '@/components/shared/confirm-action-dialog';

interface DeleteUserButtonProps {
  userId: string;
}

export const DeleteUserButton = ({ userId }: DeleteUserButtonProps) => {
  const router = useRouter();

  async function handleDelete(): Promise<{ error: string | null }> {
    try {
      const { error } = await deleteUser(userId);

      if (error) {
        toast.error(error);
        return { error };
      }

      toast.success('User deleted');
      router.refresh();

      return { error: null };
    } catch (error) {
      console.error(error);

      toast.error('Failed to delete user');
      return { error: 'Failed to delete user' };
    }
  }

  return (
    <ConfirmActionDialog
      tooltip="Delete user"
      title="Delete User?"
      description="This user will be marked as inactive and can be restored later."
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
          <span className="sr-only">Delete user</span>
        </Button>
      }
      onConfirm={handleDelete}
    />
  );
};

export const PlaceholderDeleteUserButton = () => {
  return (
    <IconTooltip tooltip="Admin users cannot be deleted" side="left">
      <span className="inline-flex cursor-not-allowed">
        <Button
          size="icon"
          variant="destructive"
          className="size-7 rounded-sm opacity-50 pointer-events-none"
        >
          <span className="sr-only">Delete User</span>
          <TrashIcon />
        </Button>
      </span>
    </IconTooltip>
  );
};
