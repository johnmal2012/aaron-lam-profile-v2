import { Card } from '@/components/ui/card';
import { renderMDX } from '@/lib/mdx';
import { cn } from '@/lib/utils';

interface InsuranceSectionProps {
  content: string;
  title: string;
  background: string;
  slug: string;
}

export default function InsuranceSection({
  title,
  content,
  background,
  slug,
}: InsuranceSectionProps) {
  const mdx = renderMDX(content);
  return (
    <section id={slug} className={cn('scroll-mt-28 px-6 py-12', background)}>
      <div className="mx-auto max-w-5xl">
        <Card className="rounded-3xl p-10 shadow-lg">
          <div className="flex items-center gap-4">
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-nowrap text-[#123b5c] sm:text-3xl">
              {title?.trim() || 'Insurance Acceptance'}
            </h2>
            <span className="hidden h-px w-10 bg-[#286487] sm:block" />
          </div>

          <div className="prose max-w-none">{mdx}</div>
        </Card>
      </div>
    </section>
  );
}
