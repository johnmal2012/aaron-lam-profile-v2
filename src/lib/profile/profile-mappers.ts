import type { Clinic } from '@/lib/types/clinic';
import type { Expertise } from '@/lib/types/expertise';
import type { PhysicianProfileFormInput } from '@/lib/validations/physician-profile';

function splitLines(value: string): string[] {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

// Convert form clinic fields into the Clinic[] format used by the database
function formValuesToClinics(
  data: Pick<
    PhysicianProfileFormInput,
    | 'clinicNames'
    | 'clinicAddresses'
    | 'clinicLatitudes'
    | 'clinicLongitudes'
  >,
): Clinic[] {
  const names = splitLines(data.clinicNames);
  const addresses = splitLines(data.clinicAddresses);
  const latitudes = splitLines(data.clinicLatitudes);
  const longitudes = splitLines(data.clinicLongitudes);

  return names.map((name, index) => ({
    name,
    address: addresses[index],
    latitude: Number(latitudes[index]),
    longitude: Number(longitudes[index]),
  }));
}

// Convert form expertise fields into the Expertise[] format used by the database.
function formValuesToExpertise(
  data: Pick<
    PhysicianProfileFormInput,
    'expertiseTexts' | 'expertiseUrls'
  >,
): Expertise[] {
  const texts = splitLines(data.expertiseTexts);
  const urls = splitLines(data.expertiseUrls);

  return texts.map((text, index) => ({
    text,
    url: urls[index],
  }));
}

// Payload sent to the server action.
// The four clinic textarea fields and the two expertise textarea fields are form-only fields and are converted into their database structures below
export type PhysicianProfilePayload = Omit<
  PhysicianProfileFormInput,
  | 'clinicNames'
  | 'clinicAddresses'
  | 'clinicLatitudes'
  | 'clinicLongitudes'
  | 'expertiseTexts'
  | 'expertiseUrls'
> & {
  clinics: Clinic[];
  expertise: Expertise[];
};

export function toProfilePayload(
  values: PhysicianProfileFormInput,
): PhysicianProfilePayload {
  const {
    clinicNames,
    clinicAddresses,
    clinicLatitudes,
    clinicLongitudes,
    expertiseTexts,
    expertiseUrls,
    ...rest
  } = values;

  return {
    ...rest,

    clinics: formValuesToClinics({
      clinicNames,
      clinicAddresses,
      clinicLatitudes,
      clinicLongitudes,
    }),

    expertise: formValuesToExpertise({
      expertiseTexts,
      expertiseUrls,
    }),
  };
}
