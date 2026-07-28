import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { renderMDX } from '@/lib/mdx';
import { cn } from '@/lib/utils';

interface ExpertiseSectionProps {
  title: string;
  content: string;
  expertise: string[];
  background: string;
  slug: string;
}

export default async function ExpertiseSection({ title, content, expertise, background, slug }: ExpertiseSectionProps) {
  const mdx = await renderMDX(content);
  return (
    <section id={slug} className={cn("scroll-mt-28 px-6 py-12", background,)}>
      <div className="mx-auto max-w-6xl">
        <Card className="rounded-3xl p-10 shadow-xl">
          <h2 className="mb-8 text-3xl font-bold">{title}</h2>

          <div className="flex flex-wrap gap-4">
            {expertise?.map((item) => (
              <Badge
                key={item}
                variant="secondary"
                className="h-auto
                rounded-full
                border
                border-blue-200
                bg-blue-50
                px-5
                py-2
                text-sm
                font-medium
                text-blue-700
                hover:bg-blue-100"
              >
                {item}
              </Badge>
            ))}
          </div>
          <div className="prose max-w-none">{mdx}</div>
        </Card>
      </div>
    </section>
  );
}
