import type { PhysicianSection } from '@/lib/types/physician-section';
import { SectionCard } from '@/components/sections/section-card';
import { cn } from '@/lib/utils';

type Props = {
  section: PhysicianSection;
  className?: string;
};

export function SectionCardContainer({
  section,
  className,
}: Props) {
  return (
    <div className="min-w-0">
      <SectionCard
        section={section}
        className={cn(
          'h-full transition hover:shadow-md',
          className,
        )}
      />
    </div>
  );
}