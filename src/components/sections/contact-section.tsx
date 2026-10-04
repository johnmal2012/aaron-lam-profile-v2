import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Clinic } from '@/lib/types/clinic';

interface ContactSectionProps {
  title?: string;
  phone?: string;
  email: string;
  clinics?: Clinic[];
  address?: string;
  background: string;
  slug: string;
}

export default function ContactSection({
  title,
  phone,
  email,
  clinics = [],
  address,
  background,
  slug,
}: ContactSectionProps) {
  const validClinics = clinics.filter(
    (clinic) => clinic.name?.trim() && clinic.address?.trim(),
  );
  return (
    <section id={slug} className={cn('scroll-mt-28 px-6 py-12', background)}>
      <div className="mx-auto max-w-5xl">
        <Card className="rounded-3xl p-10 shadow-xl">
          <div className="flex items-center gap-4">
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#123b5c] sm:text-3xl">
              {title ?? 'Contact Information'}
            </h2>
            <span className="hidden h-px w-10 bg-[#286487] sm:block" />
          </div>

          <div
            className={cn(
              'grid gap-8',
              validClinics.length > 0 ? 'md:grid-cols-3' : 'md:grid-cols-2',
            )}
          >
            <div className="space-y-3">
              <Phone className="h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-semibold">Phone</h3>
              <p>{phone}</p>
            </div>
            <div className="space-y-3">
              <Mail className="h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-semibold">Email</h3>
              <p>{email}</p>
            </div>

            {/* <div className="space-y-3">
              <MapPin className="h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-semibold">Address</h3>
              <p>{address}</p>
            </div> */}
            {validClinics.length > 0 && (
              <div className="space-y-3">
                {' '}
                <MapPin className="h-8 w-8 text-blue-600" />{' '}
                <h3 className="text-xl font-semibold">
                  {' '}
                  {validClinics.length === 1
                    ? 'Address'
                    : 'Office Locations'}{' '}
                </h3>{' '}
                <div className="space-y-4">
                  {' '}
                  {validClinics.map((clinic, index) => (
                    <div key={`${clinic.name}-${clinic.address}-${index}`}>
                      {' '}
                      <p className="font-medium text-slate-900">
                        {' '}
                        {clinic.name}{' '}
                      </p>{' '}
                      <p className="text-slate-600"> {clinic.address} </p>{' '}
                    </div>
                  ))}{' '}
                </div>{' '}
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}
