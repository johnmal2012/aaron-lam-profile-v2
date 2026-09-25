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
            src="/images/research.png"
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

