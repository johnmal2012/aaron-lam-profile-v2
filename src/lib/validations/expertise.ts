import { z } from 'zod';

export const expertiseSchema = z.object({
  text: z.string().trim().min(1, 'Expertise text is required'),
  url: z.url('Expertise URL must be a valid URL'),
//   url: optionalSpecial(z.url()),
  image: z
    .string()
    .trim()
    .default(''),

  imageKey: z
    .string()
    .trim()
    .default(''),
});

// export const expertisesSchema = z
//   .array(expertiseSchema)
//   .max(20, 'A maximum of 20 clinic locations is allowed.')
//   .image: z.string().trim().or(z.literal(''))
//   .imageKey: z.string().trim().or(z.literal('')),;

export type ExpertiseInput = z.infer<typeof expertiseSchema>;
// export type ExpertisesInput = z.infer<typeof expertisesSchema>;
