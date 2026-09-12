import { physicianProfileFormSchema } from '@/lib/validations/physician-profile';
import z from 'zod';
import type { Clinic } from '@/lib/types/clinic';
import type { Expertise } from '@/lib/types/expertise';

function splitLines(value: string | undefined | null) {
  return (value ?? '')
    .split('\n')
    .map((value) => value.trim())
    .filter(Boolean);
}

// Convert form clinic fields into the Clinic[] format used by the database
export function formValuesToClinics(
  clinicNames: string,
  clinicAddresses: string,
): Clinic[] {
  const names = splitLines(clinicNames);
  const addresses = splitLines(clinicAddresses);

  const clinicCount = Math.max(names.length, addresses.length);

  return Array.from({ length: clinicCount }, (_, index) => ({
    name: names[index] ?? '',
    address: addresses[index] ?? '',
  })).filter((clinic) => clinic.name && clinic.address);
}

// Convert form expertise fields into the Expertise[] format used by the database.
export function formValuesToExpertise(
  expertiseTexts: string,
  expertiseUrls: string,
): Expertise[] {
  const texts = splitLines(expertiseTexts);
  const urls = splitLines(expertiseUrls);

  const expertiseCount = Math.max(texts.length, urls.length);

  return Array.from({ length: expertiseCount }, (_, index) => ({
    text: texts[index] ?? '',
    url: urls[index] ?? '',
  })).filter((item) => item.text && item.url);
}

// Convert database Clinic[] into the two form fields
export function clinicsToFormValues(clinics: Clinic[] | null | undefined) {
  const validClinics = clinics ?? [];
  return {
    clinicNames: validClinics.map((clinic) => clinic.name).join('\n'),
    clinicAddresses: validClinics.map((clinic) => clinic.address).join('\n'),
  };
}

// Convert database Expertise[] into the two form fields.
export function expertiseToFormValues(
  expertise: Expertise[] | null | undefined,
) {
  const validExpertise = expertise ?? [];

  return {
    expertiseTexts: validExpertise.map((item) => item.text).join('\n'),

    expertiseUrls: validExpertise.map((item) => item.url).join('\n'),
  };
}

// Convert the complete form values into the database payload
// export function toProfilePayload(
//   values: z.output<typeof physicianProfileFormSchema>,
// ) {
//   const clinics = formValuesToClinics(
//     values.clinicNames,
//     values.clinicAddresses,
//   );

//   return {
//     ...values,
//     clinics,
//     expertise: (values.expertise ?? '')
//       .split(',')
//       .map((x) => x.trim())
//       .filter(Boolean),

//       // Do not send the form-only fields to the database.
//       clinicNames: undefined, clinicAddresses: undefined,
//   };
// }
export function toProfilePayload(
  values: z.output<typeof physicianProfileFormSchema>,
) {
  const {
    clinicNames,
    clinicAddresses,
    expertiseTexts,
    expertiseUrls,
    ...rest
  } = values;

  return {
    ...rest,

    clinics: formValuesToClinics(clinicNames, clinicAddresses),

    expertise: formValuesToExpertise(expertiseTexts, expertiseUrls),
  };
}
