import { z } from 'zod';

import { optionalText } from '@/lib/optionalText';
import { optionalSpecial } from '@/lib/optionalSpecial';

/* ---------------------------------------------------------------- */
/* Server / database schemas                                        */
/* ---------------------------------------------------------------- */

const clinicSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Clinic name is required'),

  address: z
    .string()
    .trim()
    .min(1, 'Clinic address is required'),

  latitude: z
    .number()
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90'),

  longitude: z
    .number()
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180'),
});

const expertiseSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, 'Expertise text is required'),

  url: z.url('Expertise URL must be a valid URL'),
});

/* ---------------------------------------------------------------- */
/* Server / database payload schema                                 */
/* ---------------------------------------------------------------- */

export const physicianProfileSchema = z.object({
  logo: optionalText(
    z.string().min(1),
  ),

  name: z
    .string()
    .trim()
    .min(1, 'Name is required'),

  boardSpecialty: optionalText(
    z.string().min(1),
  ),

  specialty: optionalText(
    z.string().min(1),
  ),

  title: optionalText(
    z.string().min(1),
  ),

  image: optionalText(
    z.string().min(1),
  ),

  clinics: z
    .array(clinicSchema)
    .default([]),

  phone: z
    .string()
    .trim()
    .min(1, 'Phone is required'),

  email: optionalSpecial(
    z.email(),
  ),

  linkName: optionalText(
    z.string().min(1),
  ),

  footCareLink: optionalSpecial(
    z.url(),
  ),

  expertise: z
    .array(expertiseSchema)
    .default([]),
});

/* ---------------------------------------------------------------- */
/* Client / form schema                                             */
/* ---------------------------------------------------------------- */

/**
 * Split a clinic textarea into positional lines.
 *
 * IMPORTANT:
 *
 * Empty lines are preserved.
 *
 * Example:
 *
 * "\nAddress 2\nAddress 3\nAddress 4"
 *
 * becomes:
 *
 * [
 *   '',
 *   'Address 2',
 *   'Address 3',
 *   'Address 4',
 * ]
 *
 * Therefore the empty value remains associated with clinic #1.
 *
 * Only trailing empty lines are removed so that an accidental
 * Enter at the very end of a textarea does not create another
 * clinic record.
 */
function splitClinicLines(value: string): string[] {
  const lines = value
    .split(/\r?\n/)
    .map((item) => item.trim());

  while (
    lines.length > 0 &&
    lines[lines.length - 1] === ''
  ) {
    lines.pop();
  }

  return lines;
}

/**
 * Return the number of positional clinic records.
 *
 * The clinic names textarea is the authoritative source for the
 * number of clinics.
 *
 * IMPORTANT:
 *
 * We do NOT filter empty values because an empty first or middle
 * line represents a missing clinic record that must be reported.
 */
function getClinicCount(names: string[]): number {
  return names.length;
}

/* ---------------------------------------------------------------- */
/* Client / form schema                                             */
/* ---------------------------------------------------------------- */

export const physicianProfileFormSchema = z
  .object({
    logo: optionalText(
      z.string().min(1),
    ),

    name: z
      .string()
      .trim()
      .min(1, 'Name is required'),

    boardSpecialty: optionalText(
      z.string().min(1),
    ),

    specialty: optionalText(
      z.string().min(1),
    ),

    title: optionalText(
      z.string().min(1),
    ),

    /* ------------------------------ Clinics -------------------- */

    /*
     * Do NOT use .trim() here.
     *
     * A leading empty line must remain visible to superRefine()
     * so that deleting clinic #1 produces:
     *
     * Clinic name 1 is required.
     */
    clinicNames: z
      .string()
      .refine(
        (value) => value.trim().length > 0,
        'At least one clinic name is required.',
      ),

    /*
     * Do NOT use .trim().
     *
     * Empty lines must remain positional.
     */
    clinicAddresses: z
      .string()
      .refine(
        (value) => value.trim().length > 0,
        'At least one clinic address is required.',
      ),

    /*
     * Coordinates are intentionally allowed to be empty at the
     * base-schema level.
     *
     * superRefine() validates them positionally.
     */
    clinicLatitudes: z.string(),

    clinicLongitudes: z.string(),

    /* ------------------------------ Other ---------------------- */

    phone: z
      .string()
      .trim()
      .min(1, 'Phone is required'),

    email: optionalSpecial(
      z.email(),
    ),

    linkName: optionalText(
      z.string().min(1),
    ),

    footCareLink: optionalSpecial(
      z.url(),
    ),

    /* ----------------------------- Expertise ------------------- */

    expertiseTexts: z.string(),

    expertiseUrls: z.string(),
  })
  .superRefine((data, ctx) => {
    /* ============================================================ */
    /* Clinics                                                      */
    /* ============================================================ */

    const names = splitClinicLines(
      data.clinicNames,
    );

    const addresses = splitClinicLines(
      data.clinicAddresses,
    );

    const latitudes = splitClinicLines(
      data.clinicLatitudes,
    );

    const longitudes = splitClinicLines(
      data.clinicLongitudes,
    );

    const clinicCount = getClinicCount(names);

    /* ------------------------------------------------------------ */
    /* Clinic count                                                 */
    /* ------------------------------------------------------------ */

    if (clinicCount === 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['clinicNames'],
        message:
          'At least one clinic name is required.',
      });

      return;
    }

    /* ------------------------------------------------------------ */
    /* Clinic names                                                 */
    /* ------------------------------------------------------------ */

    /*
     * Validate every clinic name by position.
     *
     * This fixes the specific problem where deleting the first
     * clinic name previously caused no validation error.
     *
     * Example:
     *
     * ""
     * Clinic 2
     * Clinic 3
     * Clinic 4
     *
     * produces:
     *
     * Clinic name 1 is required.
     */
    for (
      let index = 0;
      index < clinicCount;
      index++
    ) {
      const name = names[index];

      if (!name) {
        ctx.addIssue({
          code: 'custom',
          path: ['clinicNames'],
          message:
            `Clinic name ${index + 1} is required.`,
        });
      }
    }

    /* ------------------------------------------------------------ */
    /* Clinic addresses                                             */
    /* ------------------------------------------------------------ */

    /*
     * Validate every address by position.
     *
     * Example:
     *
     * Address 1
     *
     * Address 3
     * Address 4
     *
     * produces:
     *
     * Clinic address 2 is required.
     *
     * The error is attached ONLY to clinicAddresses.
     */
    for (
      let index = 0;
      index < clinicCount;
      index++
    ) {
      const address = addresses[index];

      if (!address) {
        ctx.addIssue({
          code: 'custom',
          path: ['clinicAddresses'],
          message:
            `Clinic address ${index + 1} is required.`,
        });
      }
    }

    /*
     * More addresses than clinic names is also invalid.
     */
    if (addresses.length > clinicCount) {
      ctx.addIssue({
        code: 'custom',
        path: ['clinicAddresses'],
        message:
          `Enter exactly ${clinicCount} clinic address${
            clinicCount === 1 ? '' : 'es'
          } to match the clinic names.`,
      });
    }

    /* ------------------------------------------------------------ */
    /* Latitude                                                     */
    /* ------------------------------------------------------------ */

    for (
      let index = 0;
      index < clinicCount;
      index++
    ) {
      const latitude = latitudes[index];

      /*
       * Missing latitude.
       *
       * The error is attached ONLY to clinicLatitudes.
       */
      if (!latitude) {
        ctx.addIssue({
          code: 'custom',
          path: ['clinicLatitudes'],
          message:
            `Latitude for clinic ${index + 1} is required.`,
        });

        continue;
      }

      const value = Number(latitude);

      /*
       * Number('abc') => NaN
       */
      if (!Number.isFinite(value)) {
        ctx.addIssue({
          code: 'custom',
          path: ['clinicLatitudes'],
          message:
            `Invalid latitude for clinic ${index + 1}.`,
        });

        continue;
      }

      if (value < -90 || value > 90) {
        ctx.addIssue({
          code: 'custom',
          path: ['clinicLatitudes'],
          message:
            `Invalid latitude for clinic ${index + 1}. ` +
            'Latitude must be between -90 and 90.',
        });
      }
    }

    /*
     * More latitude records than clinics is invalid.
     */
    if (latitudes.length > clinicCount) {
      ctx.addIssue({
        code: 'custom',
        path: ['clinicLatitudes'],
        message:
          `Enter exactly ${clinicCount} latitude${
            clinicCount === 1 ? '' : 's'
          } — one for each clinic.`,
      });
    }

    /* ------------------------------------------------------------ */
    /* Longitude                                                    */
    /* ------------------------------------------------------------ */

    for (
      let index = 0;
      index < clinicCount;
      index++
    ) {
      const longitude = longitudes[index];

      /*
       * Missing longitude.
       *
       * The error is attached ONLY to clinicLongitudes.
       */
      if (!longitude) {
        ctx.addIssue({
          code: 'custom',
          path: ['clinicLongitudes'],
          message:
            `Longitude for clinic ${index + 1} is required.`,
        });

        continue;
      }

      const value = Number(longitude);

      if (!Number.isFinite(value)) {
        ctx.addIssue({
          code: 'custom',
          path: ['clinicLongitudes'],
          message:
            `Invalid longitude for clinic ${index + 1}.`,
        });

        continue;
      }

      if (value < -180 || value > 180) {
        ctx.addIssue({
          code: 'custom',
          path: ['clinicLongitudes'],
          message:
            `Invalid longitude for clinic ${index + 1}. ` +
            'Longitude must be between -180 and 180.',
        });
      }
    }

    /*
     * More longitude records than clinics is invalid.
     */
    if (longitudes.length > clinicCount) {
      ctx.addIssue({
        code: 'custom',
        path: ['clinicLongitudes'],
        message:
          `Enter exactly ${clinicCount} longitude${
            clinicCount === 1 ? '' : 's'
          } — one for each clinic.`,
      });
    }

    /* ============================================================ */
    /* Expertise                                                    */
    /* ============================================================ */

    const expertiseTexts = data.expertiseTexts
      .split(/\r?\n/)
      .map((value) => value.trim())
      .filter(Boolean);

    const expertiseUrls = data.expertiseUrls
      .split(/\r?\n/)
      .map((value) => value.trim())
      .filter(Boolean);

    /*
     * Expertise text and URL counts must match.
     */
    if (
      expertiseTexts.length !==
      expertiseUrls.length
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['expertiseUrls'],
        message:
          'Enter one URL for each expertise item.',
      });
    }

    /*
     * Validate every expertise URL.
     */
    expertiseUrls.forEach((url, index) => {
      const result = z
        .url()
        .safeParse(url);

      if (!result.success) {
        ctx.addIssue({
          code: 'custom',
          path: ['expertiseUrls'],
          message:
            `Invalid URL for expertise item ${
              index + 1
            }.`,
        });
      }
    });
  });

/* ---------------------------------------------------------------- */
/* Types                                                            */
/* ---------------------------------------------------------------- */

export type PhysicianProfileFormInput =
  z.input<typeof physicianProfileFormSchema>;

export type PhysicianProfileInput =
  z.output<typeof physicianProfileSchema>;
