import { Card } from '@/components/ui/card';
import { renderMDX } from '@/lib/mdx';
import { cn } from '@/lib/utils';

interface EducationSectionProps {
  content: string;
  title?: string;
  background: string;
  slug: string;
}

export default async function EducationSection({ title, content, background, slug }: EducationSectionProps) {
  const mdx = await renderMDX(content);
  return (
    <section id={slug} className={cn("scroll-mt-28 px-6 py-12", background,)}>
      <div className="mx-auto max-w-5xl">
        <Card className="rounded-3xl p-10 shadow-lg">
          <h2 className="mb-8 text-3xl font-bold">{title}</h2>

          <div className="prose max-w-none">{mdx}</div>
        </Card>
      </div>
    </section>
  );
}
