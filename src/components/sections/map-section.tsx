import { Card } from '@/components/ui/card';
import { Clinic } from '@/lib/types/clinic';
import { cn } from '@/lib/utils';

interface MapSectionProps {
  location: string;
  //   address: string;
  clinics: Clinic[];
  background: string;
  slug: string;
}

export default function MapSection({
  location,
  clinics,
  background,
  slug,
}: MapSectionProps) {
  const validClinics = clinics.filter(
    (clinic) => clinic.name?.trim() && clinic.address?.trim(),
  );
  /* * Nothing to display. */ if (validClinics.length === 0) {
    return null;
  }
  return (
    <section
      id={slug}
      className={cn('scroll-mt-28 px-4 py-10 sm:px-6 sm:py-12', background)}
    >
      {' '}
      <div className="mx-auto max-w-6xl">
        {' '}
        {/* Section title */}{' '}
        <h2 className="mb-8 text-3xl font-bold text-slate-900"> {location} </h2>{' '}
        {/* Clinic locations */}{' '}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {' '}
          {validClinics.map((clinic, index) => (
            <Card
              key={`${clinic.name}-${clinic.address}-${index}`}
              className="overflow-hidden rounded-3xl shadow-xl"
            >
              {' '}
              {/* Clinic information */}{' '}
              <div className="border-b px-6 py-5 sm:px-8 sm:py-6">
                {' '}
                <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  {' '}
                  {clinic.name}{' '}
                </h3>{' '}
                <p className="mt-2 wrap-break-word text-sm text-slate-600 sm:text-base">
                  {' '}
                  {clinic.address}{' '}
                </p>{' '}
              </div>{' '}
              {/* Google Map */}{' '}
              <div className="h-80 w-full sm:h-96 md:h-80 lg:h-96">
                {' '}
                <iframe
                  title={`${clinic.name} office location`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(clinic.address)}&output=embed`}
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-full w-full border-0"
                />{' '}
              </div>{' '}
            </Card>
          ))}{' '}
        </div>{' '}
      </div>{' '}
    </section>
  );
}
