import { z } from 'zod';

export const physicianSectionSchema = z.object({
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(255, 'Slug cannot exceed 255 characters')
    .regex(
      /^[a-z0-9_]+$/,
      'Slug must contain only lowercase letters, numbers, and underscores',
    ),

  title: z
    .string(),

  content: z.string(),

  displayOrder: z
    .number({
      error: 'Display order must be a number',
    })
    .int('Display order must be an integer')
    .min(0, 'Display order cannot be negative'),
});

export const physicianSectionUpdateSchema = physicianSectionSchema.partial();

export type PhysicianSectionFormInput =
  z.infer<typeof physicianSectionUpdateSchema>;
