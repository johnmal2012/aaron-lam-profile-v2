import { CheckCircle2 } from 'lucide-react';

import { renderMDX } from '@/lib/mdx';
import { cn } from '@/lib/utils';

import SectionHeading from '@/components/home/section-heading';

// RESEARCH
export default async function ResearchSection({
  section,
  className,
}: {
  section?: {
    title: string | null;
    content: string | null;
    image?: string | null;
    imageKey?: string | null;
    highlights?: string[] | null;
    message?: string | null;
  };
  className?: string;
}) {
  if (!section) return null;

  const researchContent = await renderMDX(section.content ?? '');

  // Use saved JSONB highlights and exclude empty entries.
  const highlights = (section.highlights ?? [])
    .map((highlight) => highlight.trim())
    .filter((highlight) => highlight.length > 0);

  return (
    <section
      id="research"
      className={cn('px-6 py-14 sm:px-10 lg:px-14', className)}
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.75fr_0.65fr]">
        {/* Research Content */}
        <div>
          <SectionHeading title={section.title ?? 'Research & Academic Work'} />

          <div className="mt-6 max-w-2xl space-y-4 text-sm leading-6 text-slate-600">
            {section.content ? (
              <div className="prose prose-sm max-w-none prose-slate">
                {researchContent}
              </div>
            ) : (
              <p>
                Clinical research and academic scholarship focused on foot and
                ankle care, including complex reconstruction, deformity
                correction, and patient outcomes.
              </p>
            )}
          </div>
        </div>

        {/* Research Image */}
        <div className="relative self-start overflow-hidden rounded-md bg-slate-100">
          {section.image ? (
            <img
              src={section.image}
              alt="Medical research imaging"
              className="block h-auto w-full object-contain"
            />
          ) : (
            <div className="flex min-h-55 items-center justify-center text-sm text-slate-500">
              Research image not uploaded
            </div>
          )}
        </div>

        {/* Research Highlights and Message */}
        <div className="flex flex-col justify-start pt-3 lg:pt-3">
          {highlights.length > 0 && (
            <ul className="space-y-3 text-sm text-slate-700">
              {highlights.map((highlight, index) => (
                <ResearchItem key={`${highlight}-${index}`} text={highlight} />
              ))}
            </ul>
          )}

          {section.message?.trim() && (
            <div
              className={cn(
                'rounded-md bg-[#eef5f9] p-6',
                highlights.length > 0 && 'mt-7',
              )}
            >
              <p className="font-serif text-lg italic leading-7 text-[#234e6f]">
                {section.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ResearchItem({ text }: { text: string }) {
  return (
    <li className="flex gap-2">
      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#23668f]" />
      <span>{text}</span>
    </li>
  );
}
