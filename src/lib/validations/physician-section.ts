import { z } from 'zod';
import { heroFactIcons } from '@/lib/types/hero-fact';

// The blueprint for valid form data: expected fields, data types, and validation rules
export const physicianSectionSchema = z.object({
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(255, 'Slug cannot exceed 255 characters')
    .regex(
      /^[a-z0-9_]+$/,
      'Slug must contain only lowercase letters, numbers, and underscores',
    ),

  title: z.string(),
  // .min(1, 'Title is required')
  // .max(255, 'Title cannot exceed 255 characters'),

  content: z.string().nullable().optional(),

  quote: z.string().max(1000).nullable().optional(),

  highlights: z.array(z.string().trim().min(1).max(200)).max(5).optional(),

  message: z.string().max(500).nullable().optional(),

  heroFacts: z
    .array(
      z.object({
        icon: z.enum(heroFactIcons),
        title: z.string().trim().min(1, 'Title is required').max(100),
        subtitle: z.string().trim().min(1, 'Subtitle is required').max(150),
      }),
    )
    .max(3, 'You can add up to 3 Hero facts')
    .optional()
    .default([]),

  displayOrder: z
    .number({
      error: 'Display order must be a number',
    })
    .int('Display order must be an integer')
    .min(0, 'Display order cannot be negative'),
});

export const physicianSectionUpdateSchema = physicianSectionSchema.partial();

// export type PhysicianSectionFormInput = z.infer<typeof physicianSectionSchema>;
export type PhysicianSectionFormInput = z.infer<
  typeof physicianSectionUpdateSchema
>;
