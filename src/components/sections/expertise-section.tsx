import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { renderMDX } from '@/lib/mdx';
import { Expertise } from '@/lib/types/expertise';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ExpertiseSectionProps {
  title: string;
  content: string;
  expertise: Expertise[];
  background: string;
  slug: string;
}

export default async function ExpertiseSection({
  title,
  content,
  expertise,
  background,
  slug,
}: ExpertiseSectionProps) {
  const mdx = await renderMDX(content);

  return (
    <section
      id={slug}
      className={cn('scroll-mt-28 px-6 py-12', background)}
    >
      <div className="mx-auto max-w-6xl">
        <Card className="rounded-3xl p-10 shadow-xl">
          <h2 className="mb-8 text-3xl font-bold">{title}</h2>

          <div className="flex flex-wrap justify-center gap-3">
            {expertise.map((item, index) => {
              // Ignore malformed/empty expertise records.
              if (!item?.text || !item?.url) {
                return null;
              }

              return (
                <Link
                  key={`${item.text}-${item.url}-${index}`}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[calc(50%-0.375rem)] md:w-[calc(25%-0.75rem)]"
                >
                  <Badge
                    variant="secondary"
                    className="
                      flex
                      h-auto
                      min-h-10
                      w-full
                      cursor-pointer
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-blue-200
                      bg-blue-50
                      px-3
                      py-2
                      text-center
                      text-sm
                      font-medium
                      text-blue-700
                      hover:bg-blue-100
                    "
                  >
                    {item.text}
                  </Badge>
                </Link>
              );
            })}
          </div>

          <div className="prose max-w-none">{mdx}</div>
        </Card>
      </div>
    </section>
  );
}
