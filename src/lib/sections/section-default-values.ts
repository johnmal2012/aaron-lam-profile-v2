import { PhysicianSection } from '@/lib/types/physician-section';

export function getSectionDefaultValues(
  section?: PhysicianSection,
) {
  return {
    title: section?.title ?? '',
    slug: section?.slug ?? '',
    content: section?.content ?? '',
    displayOrder: section?.displayOrder ?? 0,
  };
}