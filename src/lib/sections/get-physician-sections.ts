import { db } from '@/db/db';

export async function getActivePhysicianSections() {
  return db.query.physicianSections.findMany({
    where: (section, { and, eq, isNull }) =>
      and(eq(section.isActive, true), isNull(section.deletedAt)),
    orderBy: (section, { asc }) => [asc(section.displayOrder)],
  });
}
