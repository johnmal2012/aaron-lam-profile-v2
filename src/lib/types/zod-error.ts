import { ZodError } from 'zod';

export type FieldErrors = Record<
  string,
  string[] | undefined
>;

export function zodFieldErrors(error: ZodError) {
  return error.issues.reduce((acc: Record<string, string[]>, issue) => {
    const key = issue.path.join("."); // supports nested fields

    acc[key] ??= [];

    acc[key].push(issue.message);

    return acc;
  }, {});
}