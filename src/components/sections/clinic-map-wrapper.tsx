'use client';

import dynamic from 'next/dynamic';

import type { Clinic } from '@/lib/types/clinic';

type ClinicMapProps = {
  clinics: Clinic[];
};

const ClinicMap = dynamic<ClinicMapProps>(
  () =>
    import('@/components/sections/clinic-map').then(
      (module) => module.ClinicMap,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-100 items-center justify-center rounded-lg border">
        Loading map...
      </div>
    ),
  },
);

interface ClinicMapWrapperProps {
  clinics: Clinic[];
}

export function ClinicMapWrapper({
  clinics,
}: ClinicMapWrapperProps) {
  return <ClinicMap clinics={clinics} />;
}