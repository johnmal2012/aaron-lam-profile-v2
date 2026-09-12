import { PhysicianProfile } from '@/lib/types/physician-profile';
import { PhysicianProfileFormInput } from '@/lib/validations/physician-profile';
import type { Clinic } from '@/lib/types/clinic';

export function clinicsToFormValues(clinics: Clinic[] | null | undefined) {
  const validClinics = clinics ?? [];

  return {
    clinicNames: validClinics.map((clinic) => clinic.name).join('\n'),

    clinicAddresses: validClinics.map((clinic) => clinic.address).join('\n'),
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
    // clinicName: profile?.clinicName ?? '',
    // clinicAddress: profile?.clinicAddress ?? '',
    // clinics:
    //   profile?.clinics
    //     ?.map(
    //       (clinic) =>
    //         `${clinic.name} | ${clinic.address}`,
    //     )
    //     .join('\n') ?? '',
    clinicNames: clinicValues.clinicNames,
    clinicAddresses: clinicValues.clinicAddresses,
    phone: profile?.phone ?? '',
    email: profile?.email ?? '',
    // location: profile?.location ?? '',
    linkName: profile?.linkName ?? '',
    footCareLink: profile?.footCareLink ?? '',
    // expertise: profile?.expertise?.join(', ') ?? '',
    expertiseTexts: expertiseValues.expertiseTexts,
    expertiseUrls: expertiseValues.expertiseUrls,
  };
}
