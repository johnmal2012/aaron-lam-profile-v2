import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type SectionHeadingProps = {
  title: string;
  href?: string;
  linkLabel?: string;
};

// SectionHeading
export default function SectionHeading({
  title,
  href,
  linkLabel,
}: SectionHeadingProps) {
  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex items-center gap-4">
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#123b5c] sm:text-3xl">
          {title}
        </h2>

        <span className="hidden h-px w-10 bg-[#286487] sm:block" />
      </div>

      {href && linkLabel && (
        <Link
          href={href}
          className="hidden shrink-0 items-center gap-1 text-xs font-semibold text-[#174f75] sm:flex"
        >
          {linkLabel}
          <ArrowRight className="size-3.5" />
        </Link>
      )}
    </div>
  );
}
