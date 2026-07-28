import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name is too long'),
});

export type UpdateUserFormInput = z.input<typeof updateUserSchema>;
export type UpdateUserInput = z.output<typeof updateUserSchema>;