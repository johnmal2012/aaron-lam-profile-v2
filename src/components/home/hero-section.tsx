import {
  Building2,
  CalendarDays,
  GraduationCap,
  MapPin,
  Phone,
} from 'lucide-react';

import { cn } from '@/lib/utils';

import { getWebsiteData } from '@/lib/website/get-website-data';

type Profile = NonNullable<
  Awaited<ReturnType<typeof getWebsiteData>>['profile']
>;

type HeroSectionProps = {
  profile: Profile;
  className?: string;
};

// Hero
export default function HeroSection({ profile, className }: HeroSectionProps) {
  return (
    <section
      id="home"
      className={cn(
        'relative overflow-hidden border-b border-slate-200 bg-[#eef5fa]',
        className,
      )}
    >
      <div
        className={cn(
          'mx-auto grid max-w-7xl',
          // Phone: one column
          'grid-cols-1',
          // Tablet: balanced left/right layout
          'md:grid-cols-[1fr_1fr]',
          // Desktop: give the photograph slightly more room
          'lg:grid-cols-[0.95fr_1.05fr]',
        )}
      >
        {/* Left content */}
        <div className="relative z-10 flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 md:px-8 md:py-12 lg:px-12 lg:py-14">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#173b5d]">
              Specialized Care for
              <br />
              Foot &amp; Ankle Conditions
            </p>

            <h1 className="font-serif text-4xl leading-[0.98] tracking-[-0.03em] text-[#0d3152] sm:text-5xl lg:text-6xl">
              {profile.name ?? 'Aaron Lam, MD'}
            </h1>

            <p className="mt-3 text-lg font-medium text-slate-800 sm:text-xl">
              {profile.title ??
                profile.specialty ??
                'Orthopaedic Foot & Ankle Surgeon'}
            </p>

            {profile.boardSpecialty && (
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                {profile.boardSpecialty}
              </p>
            )}

            <div className="mt-5 flex flex-wrap gap-3">
              <div className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#17608e] px-4 text-sm font-semibold text-white shadow-sm">
                <CalendarDays className="size-4" />
                Schedule an Appointment
              </div>

              {profile.phone && (
                <a
                  href={`tel:${profile.phone.replace(/[^\d+]/g, '')}`}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[#17608e] bg-white px-4 text-sm font-semibold text-[#17476b] transition hover:bg-[#f4f9fc]"
                >
                  <Phone className="size-4" />
                  Call {profile.phone}
                </a>
              )}
            </div>

            <div className="mt-7 grid gap-4 border-t border-slate-300/80 pt-5 sm:grid-cols-3">
              <HeroFact
                icon={<Building2 className="size-5" />}
                title={
                  profile.clinics?.[0]?.name ?? 'Maimonides Medical Center'
                }
                subtitle="Primary Affiliation"
              />

              <HeroFact
                icon={<GraduationCap className="size-5" />}
                title="Fellowship Trained"
                subtitle="Foot & Ankle"
              />

              <HeroFact
                icon={<MapPin className="size-5" />}
                title={profile.location ?? 'Brooklyn, NY'}
                subtitle="and surrounding communities"
              />
            </div>
          </div>
        </div>

        {/* Right side - complete profile photograph */}
        <div className="relative flex min-h-105 items-start justify-center overflow-hidden bg-[#eef5fa] sm:min-h-115 md:min-h-105 lg:min-h-125">
          <div
            className={cn(
              'relative aspect-square w-full',
              // Keep the photo from becoming excessively large
              'max-w-105',
              'sm:max-w-115',
              'md:max-w-105',
              'lg:max-w-125',
            )}
          >
            {profile.image ? (
              <img
                src={profile.image}
                alt={profile.name ?? 'Physician'}
                className="absolute inset-0 h-full w-full object-contain"
              />
            ) : (
              <div className="absolute inset-0 bg-linear-to-br from-slate-300 to-slate-500" />
            )}

            {/* Message - positioned relative to the actual photograph */}
            <div
              className={cn(
                'absolute z-10 text-right',
                // Always stay inside the photograph
                'right-[3%]',
                // Around eyebrow / eye level
                'top-[18%]',
                // Responsive width
                'w-[34%]',
                'sm:w-[35%]',
                'md:w-[34%]',
                'lg:w-[35%]',
              )}
            >
              <p className="font-serif text-base italic leading-[1.05] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:text-lg md:text-lg lg:text-xl">
                Keep Moving
                <br />
                Forward
              </p>

              <div className="ml-auto mt-2 h-px w-7 bg-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] sm:mt-3 sm:w-8" />

              <p className="mt-2 text-[6px] font-semibold uppercase leading-3 tracking-[0.14em] text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.85)] sm:text-[7px] sm:leading-3.5 sm:tracking-[0.17em] md:text-[7px] lg:text-[8px] lg:tracking-[0.18em]">
                Expert Care.
                <br />
                Real Progress.
                <br />A More Active You.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroFact({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 shrink-0 text-[#21658f]">{icon}</div>

      <div>
        <p className="text-sm font-semibold leading-5 text-slate-800">
          {title}
        </p>

        <p className="mt-0.5 text-xs leading-4 text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}
