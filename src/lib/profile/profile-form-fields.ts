import { PhysicianProfileFormInput } from '@/lib/validations/physician-profile';

type BaseField = {
  id: string;
  label: string;
  required?: boolean;
};

type ImageField = BaseField & {
  type: 'image';
};

type InputField = BaseField & {
  type: 'input';
  name: keyof PhysicianProfileFormInput;
  placeholder?: string;
  helperText?: string;
};

export type ProfileFieldConfig  = ImageField | InputField;

export const profileFormFields: ProfileFieldConfig [] = [
  {
    id: 'image',
    type: 'image',
    label: 'Image',
  },
  {
    id: 'name',
    name: 'name',
    type: 'input',
    label: 'Name',
    placeholder: 'e.g., Dr. Nikki Lam, DPM',
    required: true,
  },
  {
    id: 'specialty',
    name: 'specialty',
    type: 'input',
    label: 'Specialty',
    placeholder: 'e.g., Foot & Ankle Specialist',
    required: false,
  },
  {
    id: 'email',
    name: 'email',
    type: 'input',
    label: 'Email',
    placeholder: 'e.g., info@hudsonfootankle.com',
    required: false,
  },
  {
    id: 'phone',
    name: 'phone',
    type: 'input',
    label: 'Phone',
    placeholder: 'e.g., (718) 123-4567',
    required: true,
  },
  {
    id: 'title',
    name: 'title',
    type: 'input',
    label: 'Title',
    placeholder: 'e.g., Board-Certified Podiatric Surgeon',
    required: false,
  },
  {
    id: 'clinicName',
    name: 'clinicName',
    type: 'input',
    label: 'Clinic Name',
    placeholder: 'e.g., Meimo Foot & Ankle',
    required: true,
  },
  {
    id: 'clinicAddress',
    name: 'clinicAddress',
    type: 'input',
    label: 'Clinic Address',
    placeholder: 'e.g., 4802 Tenth Avenue Brooklyn, NY 11219',
    required: true,
  },
  {
    id: 'logo',
    name: 'logo',
    type: 'input',
    label: 'Logo',
    placeholder: 'e.g., Dr. Nikki Lam',
    required: false,
  },
  {
    id: 'boardSpecialty',
    name: 'boardSpecialty',
    type: 'input',
    label: 'Board Specialty',
    placeholder: 'e.g., Board-Certified Foot & Ankle Specialist',
    required: false,
  },
  {
    id: 'linkName',
    name: 'linkName',
    type: 'input',
    label: 'Link Name',
    placeholder: 'e.g., Foot Care',
    required: false,
  },
  {
    id: 'footCareLink',
    name: 'footCareLink',
    type: 'input',
    label: 'Foot Care Link',
    placeholder: 'e.g., https://www.footcaremd.org/',
    required: false,
    helperText: 'URL must begin with https:// or http://',
  },
  {
    id: 'expertise',
    name: 'expertise',
    type: 'input',
    label: 'Expertise',
    placeholder: 'e.g., Sports Injuries, Foot Surgery, bunions',
    required: false,
    helperText: 'Items must be separated by commas',
  },
];
