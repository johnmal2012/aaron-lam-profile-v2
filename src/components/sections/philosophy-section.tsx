import { Card } from '@/components/ui/card';
import { renderMDX } from '@/lib/mdx';
import { cn } from '@/lib/utils';

interface PhilosophySectionProps {
  content: string;
  title: string;
  background: string;
  slug: string;
}

export default async function PhilosophySection({ title, content, background, slug }: PhilosophySectionProps) {
  const mdx = await renderMDX(content);
  return (
    <section id={slug} className={cn("scroll-mt-28 px-6 py-12", background,)}>
      <div className="mx-auto max-w-5xl">
        <Card className="rounded-3xl p-10 shadow-lg border border-dashed border-gray-300">
          <h2 className="mb-8 text-3xl font-bold">{title}</h2>

          <div className="prose max-w-none">
            {mdx}
          </div>
        </Card>
      </div>
    </section>
  );
}
