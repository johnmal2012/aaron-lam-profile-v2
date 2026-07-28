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
    clinicName: text('clinic_name'),
    clinicAddress: text('clinic_address'),
    phone: text('phone'),
    email: text('email'),
    // address: text('address'),
    location: text('location'),
    linkName: text('link_name'),
    footCareLink: text('footcare_link'),
    expertise: jsonb('expertise').$type<string[]>().default([]),
    isActive: boolean('is_active').notNull().default(true),
    deletedAt: timestamp('deleted_at'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => [uniqueIndex('physician_profile_user_id_idx').on(table.userId)],
);
