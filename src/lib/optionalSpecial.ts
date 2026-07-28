import { z } from 'zod';

export function optionalSpecial<T extends z.ZodTypeAny>(schema: T) {
  return z.preprocess(
    (v) => (v === '' ? null : v),
    schema.nullable().optional(),
  );
}

export function optionalArray<T extends z.ZodTypeAny>(schema: T) {
  return z.preprocess(
    (v) => {
      if (v == null) return [];

      if (!Array.isArray(v)) return [];

      return v
        .map(item =>
          typeof item === "string" ? item.trim() : item
        )
        .filter(Boolean);
    },
    z.array(schema).default([])
  );
}
