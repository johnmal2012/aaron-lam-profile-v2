import {
  pgTable,
  serial,
  text,
  jsonb,
  timestamp,
  boolean,
  uuid,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { user } from '@/db/schema/auth-schema';
import { Clinic } from '@/lib/types/clinic';
import { Expertise } from '@/lib/types/expertise';

export const physicianProfile = pgTable(
  'physician_profile',
  {
    id: serial('id').primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => user.id, {
        onDelete: 'cascade',
      }),
    logo: text('logo'),
    name: text('name'),
    boardSpecialty: text('board_specialty'),
    specialty: text('specialty'),
    title: text('title'),
    image: text('image'),
    imageKey: text('image_key'),
    clinics: jsonb('clinics').$type<Clinic[]>().notNull().default([]),
    phone: text('phone'),
    email: text('email'),
    // address: text('address'),
    location: text('location'),
    linkName: text('link_name'),
    footCareLink: text('footcare_link'),
    // expertise: jsonb('expertise').$type<string[]>().default([]),
    expertise: jsonb('expertise').$type<Expertise[]>().notNull().default([]),
    isActive: boolean('is_active').notNull().default(true),
    deletedAt: timestamp('deleted_at'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => [uniqueIndex('physician_profile_user_id_idx').on(table.userId)],
);
