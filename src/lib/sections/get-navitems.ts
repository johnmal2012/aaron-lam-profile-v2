import type { PhysicianSection } from '@/lib/types/physician-section'

export function buildNavItems(
    sections: PhysicianSection[],
) {
    return sections.map(({ slug }) => ({
        id: slug,
    }));
}