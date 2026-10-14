import type { PhysicianSection } from '@/lib/types/physician-section';
import { SectionCardContainer } from './section-card-container';
import { cn } from '@/lib/utils';

export function DesktopSectionGrid({
  sections,
}: {
  sections: PhysicianSection[];
}) {
  return (
    <div className="hidden lg:block">
      <div className="grid grid-cols-2 gap-4">
        {sections.map((section, index) => (
          <SectionCardContainer
            key={section.id}
            section={section}
            className={cn(
              Math.floor(index / 2) % 2 === 0
                ? 'bg-slate-100'
                : 'bg-white',
            )}
          />
        ))}
      </div>
    </div>
  );
}
