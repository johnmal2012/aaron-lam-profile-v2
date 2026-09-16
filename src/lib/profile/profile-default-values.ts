import { PhysicianProfile } from '@/lib/types/physician-profile';
import { PhysicianProfileFormInput } from '@/lib/validations/physician-profile';
import type { Clinic } from '@/lib/types/clinic';

export function clinicsToFormValues(clinics: Clinic[] | null | undefined) {
  const validClinics = clinics ?? [];

  return {
    clinicNames: validClinics.map((clinic) => clinic.name).join('\n'),

    clinicAddresses: validClinics.map((clinic) => clinic.address).join('\n'),

    clinicLatitudes: validClinics
      .map((clinic) => String(clinic.latitude))
      .join('\n'),

    clinicLongitudes: validClinics
      .map((clinic) => String(clinic.longitude))
      .join('\n'),
  };
}

export function expertiseToFormValues(
  expertise: PhysicianProfile['expertise'] | null | undefined,
) {
  const expertiseValues = expertise ?? [];

  return {
    expertiseTexts: expertiseValues.map((item) => item.text).join('\n'),

    expertiseUrls: expertiseValues.map((item) => item.url).join('\n'),
  };
}

export function getProfileDefaultValues(
  profile?: PhysicianProfile,
): PhysicianProfileFormInput {
  const clinicValues = clinicsToFormValues(profile?.clinics);
  const expertiseValues = expertiseToFormValues(profile?.expertise);

  return {
    logo: profile?.logo ?? '',
    name: profile?.name ?? '',
    boardSpecialty: profile?.boardSpecialty ?? '',
    specialty: profile?.specialty ?? '',
    title: profile?.title ?? '',
    clinicNames: clinicValues.clinicNames,
    clinicAddresses: clinicValues.clinicAddresses,
    clinicLatitudes: clinicValues.clinicLatitudes,
    clinicLongitudes: clinicValues.clinicLongitudes,
    phone: profile?.phone ?? '',
    email: profile?.email ?? '',
    linkName: profile?.linkName ?? '',
    footCareLink: profile?.footCareLink ?? '',
    expertiseTexts: expertiseValues.expertiseTexts,
    expertiseUrls: expertiseValues.expertiseUrls,
  };
}
