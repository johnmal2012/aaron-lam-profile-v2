import type { Clinic } from '@/lib/types/clinic';
import type { Expertise } from '@/lib/types/expertise';

import type {
  PhysicianProfileFormInput,
  PhysicianProfileInput,
} from '@/lib/validations/physician-profile';

function splitLines(value: string): string[] {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

/* ---------------------------------------------------------------- */
/* Payload type                                                     */
/* ---------------------------------------------------------------- */

// Payload sent to the server action.
// The four clinic textarea fields and the two expertise textarea fields are form-only fields and are converted into their database structures below
export type PhysicianProfilePayload =
  PhysicianProfileInput;

/* ---------------------------------------------------------------- */
/* Form → Server Payload                                            */
/* ---------------------------------------------------------------- */

/**
 * Convert React Hook Form values into the normalized
 * physician profile payload.
 *
 * The repeatable Clinic Editor and Expertise Editor already
 * provide arrays, so there is no textarea parsing here.
 *
 * Zod's output type is used for the final payload because
 * form input types may contain undefined/unknown values,
 * particularly when using z.coerce.number().
 */
export function toProfilePayload(
  values: PhysicianProfileFormInput,
): PhysicianProfilePayload {
  return {
    logo: values.logo ?? '',
    name: values.name,
    boardSpecialty:
      values.boardSpecialty ?? '',
    specialty:
      values.specialty ?? '',
    title:
      values.title ?? '',
    image:
      values.image ?? '',

    clinics: normalizeClinics(
      values.clinics,
    ),

    phone: values.phone,
    email: values.email ?? '',
    linkName:
      values.linkName ?? '',
    footCareLink:
      values.footCareLink ?? '',

    expertise: normalizeExpertise(
      values.expertise,
    ),
  };
}

/* ---------------------------------------------------------------- */
/* Clinics                                                          */
/* ---------------------------------------------------------------- */

/**
 * Normalize clinic form values into the database Clinic type.
 *
 * The form schema may expose latitude/longitude as unknown
 * because Zod coercion operates on input values.
 *
 * At this point the form has already passed RHF/Zod validation,
 * so Number() gives us the final numeric representation.
 */
function normalizeClinics(
  clinics: PhysicianProfileFormInput['clinics'],
): Clinic[] {
  if (!clinics) {
    return [];
  }

  return clinics.map((clinic) => ({
    name: clinic.name.trim(),
    address: clinic.address.trim(),
    latitude: Number(clinic.latitude),
    longitude: Number(clinic.longitude),
  }));
}

/* ---------------------------------------------------------------- */
/* Expertise                                                        */
/* ---------------------------------------------------------------- */

/**
 * Normalize expertise form values into Expertise[].
 */
function normalizeExpertise(
  expertise: PhysicianProfileFormInput['expertise'],
): Expertise[] {
  if (!expertise) {
    return [];
  }

  return expertise.map((item) => ({
    text: item.text.trim(),
    url: item.url.trim(),
  }));
}