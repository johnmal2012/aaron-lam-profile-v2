import type { PhysicianSection } from '@/lib/types/physician-section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SectionDeleteButton } from '@/components/sections/section-delete-button';
import { SquarePen } from 'lucide-react';

type Props = {
  section: PhysicianSection;
};

export function SectionCard({ section }: Props) {
  return (
    <div className="rounded-2xl border bg-background p-5">
      <div className="space-y-2">
        <h2 className="text-2xl min-h-16 font-semibold">{section.title}</h2>

        <p className="text-sm text-muted-foreground">
          Menu Label:{' '}
          <span className="font-medium text-foreground">{section.slug}</span>
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
          <Link href={`/sections/${section.id}/edit`}><SquarePen className="h-4 w-4" />Edit</Link>
        </Button>

        <SectionDeleteButton sectionId={section.id} />
      </div>
    </div>
  );
}
