import { PhysicianProfile } from '@/lib/types/physician-profile';

export function getProfileItems(profile: PhysicianProfile) {
  return [
    {
      id: 'title',
      label: 'Title',
      value: profile.title,
      type: 'info',
    },
    {
      id: 'board-specialty',
      label: 'Board Specialty',
      value: profile.boardSpecialty,
      type: 'info',
    },
    {
      id: 'email',
      label: 'Email',
      value: profile.email,
      type: 'info',
    },
    {
      id: 'phone',
      label: 'Phone',
      value: profile.phone,
      type: 'info',
    },
    {
      id: 'clinic-name',
      label: 'Clinic Name',
      value: profile.clinicName,
      type: 'info',
    },
    {
      id: 'clinic-address',
      label: 'Clinic Address',
      value: profile.clinicAddress,
      type: 'info',
    },
    {
      id: 'logo',
      label: 'Logo',
      value: profile.logo,
      type: 'info',
    },
    {
      id: 'link-name',
      label: 'Link Name',
      value: profile.linkName,
      type: 'info',
    },
    {
      id: 'foot-care-link',
      label: 'Foot Care Link',
      value: profile.footCareLink,
      type: 'info',
    },
    {
      id: 'image',
      label: 'Image',
      type: 'image',
    },
    {
      id: 'expertise',
      label: 'Expertise',
      type: 'expertise',
    },
  ] as const;
}
