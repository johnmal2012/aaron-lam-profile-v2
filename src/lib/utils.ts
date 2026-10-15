import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeName(name: string) {
  return name
    .trim()
    .replace(/\s+/g, ' ') // all wrhitespace to single space
    .replace(/[^a-zA-Z0-9\s'-]/g, '') // only allow letters, spaces, apostrophes and hyphens e.g. bob!45tom -> bobtom
    .replace(/\b\w/g, (char) => char.toUpperCase()); // \b = Word boundary; does not match a character; It matches a position; Specifically, a position between word character and non-word character; \w = matches a single word character ([A-Za-z0-9_]) e.g. b o b t o m; bob tom -> Bob Tom
}

export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0]?.toUpperCase())
    .join('');
}

export const formatLabel = (slug: string) =>
  slug
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

/**
 * Alternating backgrounds for profile field cards.
 *
 * Phone (< md):
 *   Alternate every individual card.
 *
 * Tablet/desktop (md and above):
 *   Alternate by visual row, assuming 2 columns.
 */
export const getCardBackground = (
  index: number,
  cardsPerRow = 2,
) => {
// Phone: alternate every individual card.
  const mobile =
    index % 2 === 0 ? 'bg-slate-100' : 'bg-white';

// Desktop: alternate by row.
  const desktop =
    Math.floor(index / cardsPerRow) % 2 === 0
      ? 'md:bg-slate-100'
      : 'md:bg-white';

  return cn(mobile, desktop);
};

/**
 * Continue alternating backgrounds after the basic profile fields.
 *
 * fieldCount:
 *   Number of basic profile fields rendered above the sections.
 *
 * sectionOffset:
 *   0 = Clinics
 *   1 = Expertise
 *   2 = Training & Credentials
 *
 * Phone: count individual fields.
 * Tablet/desktop: count visual rows of basic fields.
 */
// export const getSectionBackground = (
//   fieldCount: number,
//   sectionOffset: number,
//   cardsPerRow = 2,
// ) => {
//   const mobileIndex = fieldCount + sectionOffset;

//   const desktopIndex =
//     Math.ceil(fieldCount / cardsPerRow) + sectionOffset;

//   const mobile =
//     mobileIndex % 2 === 0 ? 'bg-slate-100' : 'bg-white';

//   const desktop =
//     desktopIndex % 2 === 0
//       ? 'md:bg-slate-100'
//       : 'md:bg-white';

//   return cn(mobile, desktop);
// };
export function getSectionBackground(index: number) {
  return index % 2 === 0 ? 'bg-white' : 'bg-slate-100';
}