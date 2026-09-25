import { PhysicianProfile } from '@/lib/types/physician-profile';

import { PhysicianProfileFormInput } from '@/lib/validations/physician-profile';

export function getProfileDefaultValues(
  profile?: PhysicianProfile,
): PhysicianProfileFormInput {
  return {
    logo: profile?.logo ?? '',
    name: profile?.name ?? '',
    boardSpecialty: profile?.boardSpecialty ?? '',
    specialty: profile?.specialty ?? '',
    title: profile?.title ?? '',

    // Keep each clinic as one complete object
    clinics:
      profile?.clinics?.map((clinic) => ({
        name: clinic.name ?? '',
        address: clinic.address ?? '',
        latitude: clinic.latitude ?? 0,
        longitude: clinic.longitude ?? 0,
      })) ?? [],

    phone: profile?.phone ?? '',
    email: profile?.email ?? '',
    linkName: profile?.linkName ?? '',
    footCareLink: profile?.footCareLink ?? '',

    // Keep each expertise item as one complete object.
    // Older database records may not have image/imageKey yet,
    // so normalize missing values to empty strings.
    expertise:
      profile?.expertise?.map((item) => ({
        text: item.text ?? '',
        url: item.url ?? '',
        image: item.image ?? '',
        imageKey: item.imageKey ?? '',
      })) ?? [],
  };
}
