import { db } from '@/db/db';
import { physicianSections } from '@/db/schema/physician-sections';

import type { InferSelectModel } from 'drizzle-orm';

type PhysicianSection = InferSelectModel<typeof physicianSections>;

type GetPhysicianSectionsResult =
  | {
      success: true;
      sections: PhysicianSection[];
    }
  | {
      success: false;
      message: string;
    };

export async function getActivePhysicianSections(): Promise<GetPhysicianSectionsResult> {
  try {
    const sections = await db.query.physicianSections.findMany({
      where: (section, { and, eq, isNull }) =>
        and(eq(section.isActive, true), isNull(section.deletedAt)),
      orderBy: (section, { asc }) => [asc(section.displayOrder)],
    });
    return {
      success: true,
      sections,
    };
  } catch (error) {
    console.error('Failed to load active physician sections:', error);

    return {
      success: false,
      message: 'Failed to load active physician sections.',
    };
  }
}
