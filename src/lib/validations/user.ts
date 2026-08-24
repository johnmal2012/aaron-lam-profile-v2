import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name is too long'),
});

export const createAdminSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name is too long'),

  email: z.email('Please enter a valid email'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(125, 'Password is too long'),
});

export type UpdateUserFormInput = z.input<typeof updateUserSchema>;
export type UpdateUserInput = z.output<typeof updateUserSchema>;

export type CreateAdminFormInput = z.input<typeof createAdminSchema>;
export type CreateAdminInput = z.output<typeof createAdminSchema>;