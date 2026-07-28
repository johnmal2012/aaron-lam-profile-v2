import { db } from '@/db/db';
import { physicianSections } from '@/db/schema/physician-sections';
import { eq } from 'drizzle-orm';
import SectionForm from '@/components/sections/section-form';
import { EmptyState } from '@/components/shared/EmptyState';
import { LayoutTemplate } from 'lucide-react';

export default async function SectionsEditPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const section = await db
    .select()
    .from(physicianSections)
    .where(eq(physicianSections.id, Number(id)))
    .then((rows) => rows[0]);

  if (!section) {
    return (
      <EmptyState
        title="No Physician sections found."
        description="Create physician sections to display on website."
        icon={<LayoutTemplate className="size-12" />}
      />
    );
  }

  return (
    <main
      className="
        container mx-auto py-10 space-y-6
      "
    >
      <div className="space-y-2">
        <h1
          className="
            text-4xl
            font-bold
          "
        >
          Edit Section
        </h1>

        <p className="text-zinc-600">
          Update physician section content and display order.
        </p>
      </div>

      <SectionForm section={section} />
    </main>
  );
}
