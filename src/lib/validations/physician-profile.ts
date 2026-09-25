import { z } from 'zod';

import { optionalText } from '@/lib/optionalText';
import { optionalSpecial } from '@/lib/optionalSpecial';
import { clinicSchema } from '@/lib/validations/clinic';
import { expertiseSchema } from '@/lib/validations/expertise';

// Server / database schema 
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

// Client / form schema
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

  // Clinics
  clinics: z.array(clinicSchema).default([]),

  // Contact
  phone: z.string().trim().min(1, 'Phone is required'),

  email: optionalSpecial(z.email()),

  linkName: optionalText(z.string().min(1)),

  footCareLink: optionalSpecial(z.url()),

  // Expertise
  expertise: z.array(expertiseSchema).default([]),
});

// Types
export type PhysicianProfileFormInput = z.input<
  typeof physicianProfileFormSchema
>;

export type PhysicianProfileInput = z.output<typeof physicianProfileSchema>;
