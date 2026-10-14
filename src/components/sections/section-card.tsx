import type { PhysicianSection } from '@/lib/types/physician-section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SectionDeleteButton } from '@/components/sections/section-delete-button';
import { SquarePen } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  section: PhysicianSection;
  className?: string;
};

export function SectionCard({ section, className }: Props) {
  return (
    <div
      className={cn(
        'rounded-2xl border p-5',
        className,
      )}
    >
      <div className="space-y-2">
        <h2 className="min-h-16 text-2xl font-semibold">
          {section.title}
        </h2>

        <p className="text-sm text-muted-foreground">
          Menu Label:{' '}
          <span className="font-medium text-foreground">
            {section.slug}
          </span>
        </p>

        <p className="text-sm text-muted-foreground">
          Display Order:{' '}
          <span className="font-medium text-foreground">
            {section.displayOrder}
          </span>
        </p>
      </div>

      <div className="mt-6 flex flex-col items-start gap-2 sm:flex-row sm:items-center">
        <Button
          className="h-10 w-24 bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
          size="lg"
          asChild
        >
          <Link href={`/sections/${section.id}/edit`}>
            <SquarePen className="h-4 w-4" />
            Edit
          </Link>
        </Button>

        <SectionDeleteButton sectionId={section.id} />
      </div>
    </div>
  );
}