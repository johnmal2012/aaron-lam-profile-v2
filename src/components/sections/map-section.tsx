import { Card } from '@/components/ui/card';
import type { Clinic } from '@/lib/types/clinic';
import { cn } from '@/lib/utils';
import { ClinicMapWrapper } from '@/components/sections/clinic-map-wrapper';

interface MapSectionProps {
  location: string;
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
    (clinic) =>
      clinic.name?.trim() &&
      clinic.address?.trim() &&
      Number.isFinite(clinic.latitude) &&
      Number.isFinite(clinic.longitude) &&
      clinic.latitude >= -90 &&
      clinic.latitude <= 90 &&
      clinic.longitude >= -180 &&
      clinic.longitude <= 180,
  );

  if (validClinics.length === 0) {
    return null;
  }

  return (
    <section
      id={slug}
      className={cn(
        // Important for sticky navbar
        'relative isolate scroll-mt-20 px-4 py-10',
        'sm:scroll-mt-24 sm:px-6 sm:py-12',
        background,
      )}
    >
      <div className="relative z-0 mx-auto max-w-6xl space-y-8">
        <h2 className="relative z-0 text-3xl font-bold text-slate-900">
          {location}
        </h2>

        {/* OpenStreetMap / Leaflet map */}
		{/* One OpenStreetMap map containing every clinic */}
        <Card
          className="
            relative
            z-0
            overflow-hidden
            rounded-3xl
            p-3
            shadow-xl
            sm:p-4
          "
        >
          <ClinicMapWrapper clinics={validClinics} />
        </Card>

        {/* Clinic list */}
        <div className="relative z-0 grid grid-cols-1 gap-4 md:grid-cols-2">
          {validClinics.map((clinic, index) => (
            <Card
              key={`${clinic.name}-${clinic.latitude}-${clinic.longitude}-${index}`}
              className="
                relative
                z-0
                rounded-2xl
                border
                border-slate-200
                p-5
                shadow-sm
              "
            >
              <div className="flex gap-4">
                <div
                  className="
                    flex
                    size-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-teal-700
                    text-sm
                    font-bold
                    text-white
                  "
                >
                  {index + 1}
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-slate-900">
                    {clinic.name}
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {clinic.address}
                  </p>

                  <a
                    href={`https://www.openstreetmap.org/?mlat=${clinic.latitude}&mlon=${clinic.longitude}#map=17/${clinic.latitude}/${clinic.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      mt-2
                      inline-block
                      text-sm
                      font-medium
                      text-teal-700
                      hover:underline
                    "
                  >
                    Open map location
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}