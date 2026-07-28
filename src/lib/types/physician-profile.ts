import { physicianProfile } from '@/db/schema/physician-profile';

export type PhysicianProfile =
  typeof physicianProfile.$inferSelect;

export type NewPhysicianProfile =
  typeof physicianProfile.$inferInsert;