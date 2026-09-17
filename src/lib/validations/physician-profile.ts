import { z } from 'zod';

import { optionalText } from '@/lib/optionalText';
import { optionalSpecial } from '@/lib/optionalSpecial';

/* ---------------------------------------------------------------- */
/* Shared schemas                                                   */
/* ---------------------------------------------------------------- */

export const clinicSchema = z.object({
  name: z.string().trim().min(1, 'Clinic name is required'),

  address: z.string().trim().min(1, 'Clinic address is required'),

  latitude: z.coerce
    .number({
      error: 'Latitude is required',
    })
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90'),

  longitude: z.coerce
    .number({
      error: 'Longitude is required',
    })
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180'),
});

export const expertiseSchema = z.object({
  text: z.string().trim().min(1, 'Expertise text is required'),

  url: z.url('Expertise URL must be a valid URL'),
});

/* ------------------------------------------------------- */
/* Server / database schema                                */
/* ------------------------------------------------------- */

export const physicianProfileSchema = z.object({
  logo: optionalText(z.string().min(1)),

  name: z.string().trim().min(1, 'Name is required'),

  boardSpecialty: optionalText(z.string().min(1)),

  specialty: optionalText(z.string().min(1)),

  title: optionalText(z.string().min(1)),

  image: optionalText(z.string().min(1)),

  clinics: z.array(clinicSchema).default([]),

  phone: z.string().trim().min(1, 'Phone is required'),

  email: optionalSpecial(z.email()),

  linkName: optionalText(z.string().min(1)),

  footCareLink: optionalSpecial(z.url()),

  expertise: z.array(expertiseSchema).default([]),
});

/* ---------------------------------------------------------------- */
/* Client / form schema                                             */
/* ---------------------------------------------------------------- */

// export const physicianProfileFormSchema =
//   physicianProfileSchema.extend({
//     /*
//      * RHF's input values are strings while the server payload
//      * requires numbers.
//      *
//      * valueAsNumber is used in the form for these fields, so
//      * the resulting form values are numbers.
//      */
//   });
export const physicianProfileFormSchema = z.object({
  logo: optionalText(z.string().min(1)),

  name: z.string().trim().min(1, 'Name is required'),

  boardSpecialty: optionalText(z.string().min(1)),

  specialty: optionalText(z.string().min(1)),

  title: optionalText(z.string().min(1)),

  image: optionalText(z.string().min(1)),

  /* -------------------------------------------------- */
  /* Clinics                                            */
  /* -------------------------------------------------- */

  clinics: z.array(clinicSchema).default([]),

  /* -------------------------------------------------- */
  /* Contact                                            */
  /* -------------------------------------------------- */

  phone: z.string().trim().min(1, 'Phone is required'),

  email: optionalSpecial(z.email()),

  linkName: optionalText(z.string().min(1)),

  footCareLink: optionalSpecial(z.url()),

  /* -------------------------------------------------- */
  /* Expertise                                          */
  /* -------------------------------------------------- */

  expertise: z.array(expertiseSchema).default([]),
});
/* ------------------------------------------------------ */
/* Types                                                  */
/* ------------------------------------------------------ */

export type PhysicianProfileFormInput = z.input<
  typeof physicianProfileFormSchema
>;

export type PhysicianProfileInput = z.output<typeof physicianProfileSchema>;
