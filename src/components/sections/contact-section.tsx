import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Mail, MapPin, Phone } from 'lucide-react';

interface ContactSectionProps {
  title?: string;
  phone?: string;
  email: string;
  address?: string;
  background: string;
  slug: string;
}

export default function ContactSection({
    title,
    phone,
    email,
    address,
    background,
    slug,
}: ContactSectionProps) {
  return (
    <section
      id={slug}
      className={cn("scroll-mt-28 px-6 py-12", background,)}
    >
      <div className="mx-auto max-w-5xl">
        <Card className="rounded-3xl p-10 shadow-xl">
          <h2 className="mb-10 text-3xl font-bold">{title}</h2>

          <div className="grid gap-8 md:grid-cols-3">
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

            <div className="space-y-3">
              <MapPin className="h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-semibold">Address</h3>
              <p>{address}</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
