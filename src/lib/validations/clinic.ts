import { z } from 'zod';

export const clinicSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Clinic name is required.'),

  address: z
    .string()
    .trim()
    .min(1, 'Clinic address is required.'),

  latitude: z
    .number()
    .min(-90, 'Latitude must be between -90 and 90.')
    .max(90, 'Latitude must be between -90 and 90.'),

  longitude: z
    .number()
    .min(-180, 'Longitude must be between -180 and 180.')
    .max(180, 'Longitude must be between -180 and 180.'),
});

// export const clinicsSchema = z
//   .array(clinicSchema)
//   .max(20, 'A maximum of 20 clinic locations is allowed.');

export type ClinicInput = z.infer<typeof clinicSchema>;
// export type ClinicsInput = z.infer<typeof clinicsSchema>;