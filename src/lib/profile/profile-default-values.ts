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
    clinics: profile?.clinics ?? [],
    phone: profile?.phone ?? '',
    email: profile?.email ?? '',
    linkName: profile?.linkName ?? '',
    footCareLink: profile?.footCareLink ?? '',
    expertise: profile?.expertise ?? [],
  };
}
