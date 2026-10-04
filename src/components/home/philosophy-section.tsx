import { renderMDX } from '@/lib/mdx';
import { cn } from '@/lib/utils';
import SectionHeading from '@/components/home/section-heading';

export default async function PhilosophySection({
  section,
  className,
}: {
  section?: {
    title: string | null;
    content: string | null;
    image?: string | null;
    imageKey?: string | null;
  };
  className?: string;
}) {
  if (!section) return null;

  const philosophyContent = await renderMDX(section.content ?? '');

  return (
    <section
      id="philosophy"
      className={cn('overflow-hidden', className)}
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-6 lg:py-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Philosophy Photo */}
          <div className="relative min-h-85 overflow-hidden rounded-lg bg-slate-100">
            {section.image ? (
              <img
                src={section.image}
                alt="Patient-centered philosophy"
                className="absolute inset-0 size-full object-cover"
              />
            ) : (
              <div className="flex min-h-85 items-center justify-center text-sm text-slate-500">
                Philosophy image not uploaded
              </div>
            )}

            {section.image && (
              <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#eaf3f8]/20" />
            )}
          </div>

          {/* Philosophy Content */}
          <div className="flex items-center px-6 py-14 sm:px-10 lg:px-16">
            <div className="max-w-xl">
              <SectionHeading
                title={section?.title?.trim() || 'A Patient-Centered Philosophy'}
              />

              <div className="mt-6 space-y-4 text-sm leading-6 text-slate-600">
                {section.content ? (
                  <div className="prose prose-sm max-w-none prose-slate">
                    {philosophyContent}
                  </div>
                ) : (
                  <p>
                    I believe in listening, educating, and working together
                    with each patient to develop a personalized treatment
                    plan. Whether the goal is returning to sports,
                    improving mobility, or relieving pain, care should be
                    compassionate, individualized, and evidence-based.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
