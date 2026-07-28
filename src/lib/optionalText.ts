import { z } from 'zod';

export function optionalText<T extends z.ZodString>(schema: T) {
  return z
    .string()
    .nullish()
    .transform((value) => (value === '' ? null : value))
    .pipe(schema.nullable().optional());
}
