import { PhysicianSection } from '@/lib/types/physician-section';
import { SectionCardContainer } from './section-card-container';
import { chunk } from '@/lib/types/section-map';
import { cn } from '@/lib/utils';
import { getRowBackground } from '@/lib/website/get-row-background';

export function DesktopSectionGrid({ sections }: {sections: PhysicianSection[]}) {
  return (
    <div className="hidden lg:block">
      {chunk(sections, 2).map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={cn(
            'grid gap-4 rounded-2xl p-4 lg:grid-cols-2',
            getRowBackground(rowIndex),
          )}
        >
          {row.map((section) => (
            <SectionCardContainer key={section.id} section={section} />
          ))}
        </div>
      ))}
    </div>
  );
}
