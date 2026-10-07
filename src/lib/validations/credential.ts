import z from 'zod';

export const credentialSchema = z.object({
  type: z.enum(['education', 'residency', 'fellowship', 'certification']),

  label: z.string().trim().min(1, 'Credential label is required'),

  institution: z.string().trim().min(1, 'Institution is required'),

  //   breakAfter: z.string().trim().optional().default(''),

  image: z.string().trim().optional().default(''),

  imageKey: z.string().trim().optional().default(''),
});

export type Credential = z.infer<typeof credentialSchema>;
