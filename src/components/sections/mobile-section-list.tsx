import { PhysicianSection } from '@/lib/types/physician-section';
import { SectionCardContainer } from './section-card-container';
import { cn } from '@/lib/utils';
import { getRowBackground } from '@/lib/website/get-row-background';

export function MobileSectionList({
  sections,
}: {
  sections: PhysicianSection[];
}) {
  return (
    <div className="block lg:hidden">
      {sections.map((section, index) => (
        <div
          key={section.id}
          className={cn(
            'rounded-2xl p-4 transition hover:shadow-md',
            getRowBackground(index),
          )}
        >
          <SectionCardContainer section={section} />
        </div>
      ))}
    </div>
  );
}
