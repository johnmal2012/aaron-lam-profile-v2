import {
  CheckCircle2,
} from 'lucide-react';

import { renderMDX } from '@/lib/mdx';
import { cn } from '@/lib/utils';

import SectionHeading from './section-heading';

// RESEARCH
export default async function ResearchSection({
  section,
  className,
}: {
  section?: {
    title: string | null;
    content: string | null;
  };
  className?: string;
}) {
  if (!section) return null;

  //   const paragraphs = splitContent(section.content);
  const researchContent = await renderMDX(section?.content ?? '');

  return (
    <section
      id="research"
      className={cn('px-6 py-14 sm:px-10 lg:px-14', className)}
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.75fr_0.65fr]">
        <div>
          <SectionHeading title={section.title ?? 'Research & Academic Work'} />

          <div className="mt-6 max-w-2xl space-y-4 text-sm leading-6 text-slate-600">
            {/* {paragraphs.length > 0 ? (
              paragraphs
                .slice(0, 3)
                .map((paragraph, index) => <p key={index}>{paragraph}</p>)
            ) : ( */}
            {section?.content ? (
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

          {/* <Link
            href="/research"
            className="mt-7 inline-flex h-10 items-center gap-2 rounded-md border border-[#17608e] px-4 text-sm font-semibold text-[#174b70] transition hover:bg-[#f2f7fa]"
          >
            View Research &amp; Publications
            <ArrowRight className="size-4" />
          </Link> */}
        </div>

        <div className="overflow-hidden rounded-md bg-slate-100">
          <img
            src="data:image/jpeg;base64,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"
            alt="Medical research imaging"
            className="h-full min-h-55 w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <ul className="space-y-3 text-sm text-slate-700">
            <ResearchItem text="Reconstructive Techniques" />
            <ResearchItem text="Deformity Correction" />
            <ResearchItem text="Clinical Outcomes" />
            <ResearchItem text="Education & Innovation" />
          </ul>

          <div className="mt-7 rounded-md bg-[#eef5f9] p-6">
            <p className="font-serif text-lg italic leading-7 text-[#234e6f]">
              Advancing care through research.
              <br />
              Improving outcomes
              <br />
              for every step ahead.
            </p>
          </div>
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

