import { renderMDX } from "@/lib/mdx";
import { cn } from "@/lib/utils";
import SectionHeading from "@/components/home/section-heading";

// PHILOSOPHY
export default async function PhilosophySection({
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
  const philosophyContent = await renderMDX(section?.content ?? '');
  console.log('philosophyContent: ', section?.content);

  return (
    <section id="philosophy" className={cn('overflow-hidden', className)}>
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        <div className="relative min-h-85 overflow-hidden">
          <img
            src="/images/philosophy.jpg"
            alt="Patient walking outdoors"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#eaf3f8]/20" />
        </div>

        <div className="flex items-center px-6 py-14 sm:px-10 lg:px-16">
          <div className="max-w-xl">
            <SectionHeading
              title={section.title ?? 'A Patient-Centered Philosophy'}
            />

            <div className="mt-6 space-y-4 text-sm leading-6 text-slate-600">
              {/* {paragraphs.length > 0 ? (
                paragraphs
                  .slice(0, 3)
                  .map((paragraph, index) => <p key={index}>{paragraph}</p>)
              ) : ( */}
              {section?.content ? (
                <div className="prose prose-sm max-w-none prose-slate">
                  {philosophyContent}
                </div>
              ) : (
                <p>
                  I believe in listening, educating, and working together with
                  each patient to develop a personalized treatment plan. Whether
                  the goal is returning to sports, improving mobility, or
                  relieving pain, care should be compassionate, individualized,
                  and evidence-based.
                </p>
              )}
            </div>

            {/* <Link
              href="/philosophy"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#174f75]"
            >
              Learn More About My Philosophy
              <ArrowRight className="size-4" />
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
}
