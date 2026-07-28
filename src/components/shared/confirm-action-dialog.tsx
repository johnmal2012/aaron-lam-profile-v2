'use client';

import { ReactNode, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { IconTooltip } from '@/components/shared/icon-tooltip';

interface ConfirmActionDialogProps {
  tooltip?: string;
  title: string;
  description: ReactNode;
  confirmText?: string;
  pendingText?: string;
  trigger: ReactNode;
  onConfirm: () => Promise<{ error: string | null }>;
  confirmButtonClassName?: string;
}

export function ConfirmActionDialog({
  tooltip,
  title,
  description,
  trigger,
  onConfirm,
  confirmText = 'Confirm',
  pendingText = 'Processing...',
  confirmButtonClassName,
}: ConfirmActionDialogProps) {
  const [isPending, startTransition] = useTransition();

  function handleConfirm() {
    startTransition(async () => {
      await onConfirm();
    });
  }

  const triggerElement = (
    <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
  );

  return (
    <AlertDialog>
      {tooltip ? (
        <IconTooltip tooltip={tooltip} side="right">
          <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        </IconTooltip>
      ) : (
        triggerElement
      )}

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>

          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              type="button"
              disabled={isPending}
              onClick={(e) => {
                e.preventDefault();
                handleConfirm();
              }}
              className={confirmButtonClassName}
            >
              {isPending ? pendingText : confirmText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
