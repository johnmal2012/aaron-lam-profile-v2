// types/credential.ts > validations/credential.ts > profile/profile-default-values.ts/getProfileDefaultValues() > profile/profile-mappers.ts > credential-editor.tsx > admin edit profile page > make sure validations/physician-profile.ts/physicianProfileSchema with credential z.array > make sure actions/profile/physician-profile-actions.ts with credential: validated.data.credential > home\about-section.tsx
import { Quote } from 'lucide-react';

import Image from 'next/image';

import { renderMDX } from '@/lib/mdx';

import { getWebsiteData } from '@/lib/website/get-website-data';

import { cn } from '@/lib/utils';

import SectionHeading from '@/components/home/section-heading';

import type { Credential as CredentialType } from '@/lib/types/credential';

export default async function AboutSection({
  profile,
  section,
  education,
  className,
}: {
  profile: NonNullable<Awaited<ReturnType<typeof getWebsiteData>>['profile']>;

  section?: {
    title: string | null;
    content: string | null;
    quote?: string | null;
  };

  education?: {
    title: string | null;
    content: string | null;
  };

  className?: string;
}) {
  if (!section && !education) {
    return null;
  }

  const sectionContent = await renderMDX(section?.content ?? '');

  const educationContent = await renderMDX(education?.content ?? '');

  const credentials = Array.isArray(profile.credential)
    ? profile.credential
    : [];

  console.log('about title: ', section?.title);

  return (
    <section
      id="about"
      className={cn('px-6 py-14 sm:px-10 lg:px-14', className)}
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.25fr_1.15fr_0.85fr]">
        {/* ABOUT */}
        <div>
          <SectionHeading title={section?.title?.trim() || 'About Dr. Lam'} />

          <div className="mt-6 space-y-4 text-sm leading-6 text-slate-600">
            {section?.content ? (
              <div className="prose prose-sm max-w-none prose-slate">
                {sectionContent}
              </div>
            ) : (
              <>
                <p>
                  {profile.name ?? 'Dr. Lam'} is dedicated to comprehensive
                  treatment of foot and ankle conditions, with particular
                  expertise in complex reconstruction, deformity correction, and
                  sports-related injuries.
                </p>

                <p>
                  His approach combines specialized training, evidence-based
                  treatment, and individualized care to help patients return to
                  the activities they value.
                </p>
              </>
            )}
          </div>
        </div>

        {/* TRAINING & CREDENTIALS */}
        <div className="border-y border-slate-200 py-8 text-center lg:border-x lg:border-y-0 lg:px-8 lg:py-0 lg:text-left">
          <SectionHeading
            title={education?.title ?? 'Training & Credentials'}
          />

          <div className="mt-8">
            {education?.content && (
              <div className="prose prose-sm mx-auto max-w-none prose-slate lg:mx-0">
                {educationContent}
              </div>
            )}

            {credentials.length > 0 && (
              <div className={cn('space-y-8', education?.content && 'mt-8')}>
                {credentials.map((credential, index) => (
                  <CredentialItem
                    key={`${credential.institution}-${index}`}
                    credential={credential}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* QUOTE */}
        <div className="flex flex-col items-center pt-8 text-center lg:items-start lg:pt-23.5 lg:text-left">
          <Quote className="size-8 text-[#9bb8ca]" />

          {section?.quote && (
            <blockquote className="mt-4 font-serif text-xl italic leading-8 text-[#214b6c]">
              “{section.quote}”
            </blockquote>
          )}

          <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            — {profile.name ?? 'Aaron Lam, MD'}
          </p>

          <div className="mt-5 h-px w-11 bg-[#1b587e]" />
        </div>
      </div>
    </section>
  );
}

// Credential Item
function CredentialItem({ credential }: { credential: CredentialType }) {
  const lines = credential.institution
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="mx-auto flex w-full max-w-90 items-center gap-4 text-left lg:mx-0">
      {/* Credential image */}
      <div className="relative h-24 w-28 shrink-0">
        {credential.image ? (
          <Image
            src={credential.image}
            alt={credential.institution || credential.label || 'Credential'}
            fill
            sizes="112px"
            className="object-contain object-center"
          />
        ) : (
          <div className="flex h-24 w-28 items-center justify-center">
            <span className="text-xs font-semibold text-slate-400">
              {credential.type === 'education'
                ? 'EDU'
                : credential.type === 'residency'
                  ? 'RES'
                  : credential.type === 'fellowship'
                    ? 'FEL'
                    : 'CERT'}
            </span>
          </div>
        )}
      </div>

      {/* Credential text */}
      <div className="min-w-0 flex-1 text-left">
        {credential.label && (
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#71869a]">
            {credential.label}
          </p>
        )}

        {credential.institution && (
          <p className="mt-1 font-serif text-[21px] font-semibold leading-[1.05] text-[#173f5f]">
            {lines.map((line, index) => (
              <span key={index} className="block whitespace-normal">
                {line}
              </span>
            ))}
          </p>
        )}
      </div>
    </div>
  );
}
