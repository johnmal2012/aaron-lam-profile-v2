import { z } from 'zod';

const optionalCoordinate = z.preprocess(
  (value) =>
    value === '' ||
    value === null ||
    (typeof value === 'number' && Number.isNaN(value))
      ? undefined
      : value,
  z.number().optional(),
);

export const clinicSchema = z
  .object({
    name: z.string().trim().min(1, 'Clinic name is required.'),

    address: z.string().trim().min(1, 'Clinic address is required.'),

    latitude: optionalCoordinate,

    longitude: optionalCoordinate,
  })
  .superRefine((clinic, ctx) => {
    const { latitude, longitude } = clinic;

    // Both coordinates are optional.
    if (latitude === undefined && longitude === undefined) {
      return;
    }

    // If either is provided, both are required.
    if (latitude === undefined) {
      ctx.addIssue({
        code: 'custom',
        path: ['latitude'],
        message: 'Latitude is required when longitude is provided.',
      });
    }

    if (longitude === undefined) {
      ctx.addIssue({
        code: 'custom',
        path: ['longitude'],
        message: 'Longitude is required when latitude is provided.',
      });
    }

    // Validate latitude range.
    if (latitude !== undefined && (latitude < -90 || latitude > 90)) {
      ctx.addIssue({
        code: 'custom',
        path: ['latitude'],
        message: 'Latitude must be between -90 and 90.',
      });
    }

    // Validate longitude range.
    if (longitude !== undefined && (longitude < -180 || longitude > 180)) {
      ctx.addIssue({
        code: 'custom',
        path: ['longitude'],
        message: 'Longitude must be between -180 and 180.',
      });
    }
  });

export type ClinicInput = z.infer<typeof clinicSchema>;
