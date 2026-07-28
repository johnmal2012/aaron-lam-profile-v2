import { physicianSections } from '@/db/schema';

export type PhysicianSection =
  typeof physicianSections.$inferSelect;

export type NewPhysicianSection =
  typeof physicianSections.$inferInsert;