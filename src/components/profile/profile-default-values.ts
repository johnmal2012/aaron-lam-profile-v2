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
    clinicName: profile?.clinicName ?? '',
    clinicAddress: profile?.clinicAddress ?? '',
    phone: profile?.phone ?? '',
    email: profile?.email ?? '',
    // location: profile?.location ?? '',
    linkName: profile?.linkName ?? '',
    footCareLink: profile?.footCareLink ?? '',
    expertise: profile?.expertise?.join(', ') ?? ''
  };
}
