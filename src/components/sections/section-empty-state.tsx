import { LayoutTemplate } from 'lucide-react';
import { EmptyState } from '@/components/shared/EmptyState';

export function NoSectionState() {
  return (
    <EmptyState
      title="No Physician sections found."
      description="Create physician sections to display on website."
      icon={<LayoutTemplate className="size-12" />}
    />
  );
}
