import Link from 'next/link';

import type { Expertise } from '@/lib/types/expertise';
import { getWebsiteData } from '@/lib/website/get-website-data';
import { cn } from '@/lib/utils';
import { ExpertiseCarousel } from '@/components/home/expertise-carousel';

function normalizeExpertise(
  expertise: Expertise[] | null | undefined,
): Expertise[] {
  return Array.isArray(expertise) ? expertise : [];
}

// Expertise
export default function ExpertiseSection({
  profile,
  section,
  className,
}: {
  profile: NonNullable<Awaited<ReturnType<typeof getWebsiteData>>['profile']>;
  section?: {
    title: string | null;
    content: string | null;
  };
  className?: string;
}) {
  const expertise = normalizeExpertise(profile.expertise);

  if (!expertise.length && !section) return null;

  const fallback = [
    'Bunions & Forefoot Deformity',
    'Ankle Arthritis & Replacement',
    'Flatfoot Reconstruction',
    'Sports & Tendon Injuries',
    'Foot & Ankle Trauma',
    'Cavus / Cavovarus Foot',
    'Adolescent Foot & Ankle Deformity',
    'Complex Reconstruction',
  ];

  const items =
    expertise.length > 0
      ? expertise
      : fallback.map((text) => ({ text, url: '', image: '', imageKey: '' }));

  return (
    <section
      id="expertise"
      className={cn('px-10 py-14 sm:px-14 lg:px-20', className)}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-4">
              <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#123b5c] sm:text-3xl">
                {section?.title ?? 'Conditions We Treat'}
              </h2>

              <span className="hidden h-px w-10 bg-[#286487] sm:block" />
            </div>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Specialized care for a wide range of foot and ankle conditions.
            </p>
          </div>

          {/* <Link
            href="/conditions"
            className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-[#174f75] transition hover:text-[#123b5c] sm:inline-flex"
          >
            View All Conditions
            <ArrowRight className="size-4" />
          </Link> */}
        </div>

        {/* Carousel */}
        <div className="relative mt-8">
          <ExpertiseCarousel items={items} />
        </div>

        {/* Mobile "View All" */}
        {/* <div className="mt-6 flex justify-center sm:hidden">
          <Link
            href="/conditions"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#174f75]"
          >
            View All Conditions
            <ArrowRight className="size-4" />
          </Link>
        </div> */}
      </div>
    </section>
  );
}
