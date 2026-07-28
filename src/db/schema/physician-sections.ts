import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';

export const physicianSections = pgTable('physician_sections', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', {
    length: 255,
  }).notNull(),
  title: varchar('title', {
    length: 255,
  }),
  content: text('content'),
  displayOrder: integer('display_order').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true),
  deletedAt: timestamp('deleted_at'),
});
