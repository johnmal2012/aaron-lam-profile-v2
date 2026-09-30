import { PhysicianSection } from '@/lib/types/physician-section';

export function getSectionDefaultValues(section?: PhysicianSection) {
  return {
    title: section?.title ?? '',
    slug: section?.slug ?? '',
    content: section?.content ?? '',
    quote: section?.quote ?? '',
    highlights: section?.highlights ?? [],
    message: section?.message ?? '',
    heroFacts: section?.heroFacts ?? [],
    displayOrder: section?.displayOrder ?? 0,
  };
}
