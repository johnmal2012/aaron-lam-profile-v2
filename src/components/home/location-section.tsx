import {
  ArrowUpRight,
  Building2,
} from 'lucide-react';

import type { Clinic } from '@/lib/types/clinic';
import { cn } from '@/lib/utils';

import SectionHeading from './section-heading';

// Location
export default function LocationSection({
  clinics,
  className,
}: {
  clinics: Clinic[];
  className?: string;
}) {
  if (!clinics.length) return null;

  return (
    <section
      id="locations"
      className={cn('px-6 py-12 sm:px-10 lg:px-14', className)}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Our Locations"
          //   href="/locations"
          //   linkLabel="View All Locations"
        />

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {clinics.slice(0, 4).map((clinic, index) => (
            <ClinicCard key={`${clinic.name}-${index}`} clinic={clinic} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ClinicCard({ clinic }: { clinic: Clinic }) {
  const query = encodeURIComponent(`${clinic.name}, ${clinic.address}`);

  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${query}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex gap-3 p-3">
        <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#dbe8ef]">
          <Building2 className="size-7 text-[#39708f]" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold leading-5 text-[#163e5e]">
            {clinic.name}
          </h3>

          <p className="mt-1 text-xs leading-4 text-slate-500">
            {clinic.address}
          </p>
        </div>

        <ArrowUpRight className="mt-1 size-4 shrink-0 text-[#1c608b] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </a>
  );
}
