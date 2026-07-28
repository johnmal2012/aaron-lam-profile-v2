import { physicianProfileFormSchema } from "@/lib/validations/physician-profile";
import z from "zod";

export function toProfilePayload(values: z.output<typeof physicianProfileFormSchema>,) {
  return {
    ...values,
    expertise: (values.expertise ?? '')
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean),
  };
}
