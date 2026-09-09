import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { renderMDX } from '@/lib/mdx';
import { cn } from '@/lib/utils';

interface AboutSectionProps {
  content: string;
  image: string;
  name: string;
  boardSpecialty: string;
  specialty: string;
  title: string;
  background: string;
  slug: string;
}

export default async function AboutSection({
  content,
  image,
  name,
  boardSpecialty,
  specialty,
  title,
  background,
  slug,
}: AboutSectionProps) {
  const mdx = await renderMDX(content);
  return (
    <section
      id={slug}
      className={cn("scroll-mt-28 px-6 py-12", background,)}
    >
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3 md:items-center">
        {/* Doctor's photograph: circle */}
        {/* <div className="mx-auto w-1/2 max-w-sm md:w-full">
          <div className="relative w-64 h-64 mx-auto md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src={image}
              alt={name}
              width={600}
              height={700}
              priority
              className="rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </div> */}
        {/* Doctor's photograph: square portrait */}
        <div className="mx-auto w-1/2 max-w-sm md:w-full">
          <div className="overflow-hidden rounded-3xl border-4 border-white bg-white shadow-2xl">
            <Image
              src={image}
              alt={`${name} in white coat`}
              width={600}
              height={700}
              priority
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
        <Card className="rounded-3xl border-0 p-8 shadow-xl md:col-span-2">
          <div className="space-y-6">
            <div className="space-y-5">
              <Badge
                className=" h-auto
                rounded-full
                border
                border-blue-200
                bg-blue-50
                px-4
                py-1
                text-xs
                font-medium
                tracking-wide
                text-blue-700
                hover:bg-blue-100"
              >
                {boardSpecialty}
              </Badge>

              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                  {specialty}
                </p>

                <h2 className="mt-2 text-4xl font-bold text-slate-900">
                  {name}
                </h2>

                <p className="mt-3 text-lg text-slate-600">{title}</p>
              </div>
              <Separator />
            </div>
            <div className="prose max-w-none" >{mdx}</div>
          </div>
        </Card>
      </div>
    </section>
  );
}
