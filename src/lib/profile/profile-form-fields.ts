// Instead of storing register and error, only store metadata
import type { PhysicianProfileFormInput } from '@/lib/validations/physician-profile';

/* ---------------------------------------------------------------- */
/* Base field                                                       */
/* ---------------------------------------------------------------- */

type BaseField = {
  id: string;
  label: string;
  required?: boolean;
};

/* ---------------------------------------------------------------- */
/* Image field                                                       */
/* ---------------------------------------------------------------- */

type ImageField = BaseField & {
  type: 'image';
};

/* ---------------------------------------------------------------- */
/* Input field                                                       */
/* ---------------------------------------------------------------- */

type InputField = BaseField & {
  type: 'input';
  name: keyof PhysicianProfileFormInput;
  placeholder?: string;
  helperText?: string;
};

/* ---------------------------------------------------------------- */
/* Textarea field                                                    */
/* ---------------------------------------------------------------- */

/**
 * Kept for future single-value textarea fields.
 *
 * IMPORTANT:
 *
 * Do not use this for clinics or expertise.
 *
 * Clinics are now:
 *
 *   clinics: Clinic[]
 *
 * Expertise is now:
 *
 *   expertise: Expertise[]
 *
 * They are rendered by dedicated repeatable editors.
 */
type TextareaField = BaseField & {
  type: 'textarea';
  name: keyof PhysicianProfileFormInput;
  placeholder?: string;
  helperText?: string;
};

/* ---------------------------------------------------------------- */
/* Field configuration                                               */
/* ---------------------------------------------------------------- */

export type ProfileFieldConfig =
  | ImageField
  | InputField
  | TextareaField;

/* ---------------------------------------------------------------- */
/* Standard profile fields                                           */
/* ---------------------------------------------------------------- */

/**
 * Standard one-value physician profile fields.
 *
 * Clinics and expertise are intentionally NOT included here.
 *
 * They should be rendered separately by:
 *
 *   <ClinicEditor />
 *   <ExpertiseEditor />
 */
// Define field configurations with their properties
export const profileFormFields: ProfileFieldConfig[] = [
  /* -------------------------------------------------------------- */
  /* Profile image                                                   */
  /* -------------------------------------------------------------- */

  {
    id: 'image',
    type: 'image',
    label: 'Image',
  },

  /* -------------------------------------------------------------- */
  /* Basic information                                               */
  /* -------------------------------------------------------------- */

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

  /* -------------------------------------------------------------- */
  /* Logo                                                            */
  /* -------------------------------------------------------------- */

  {
    id: 'logo',
    name: 'logo',
    type: 'input',
    label: 'Logo',
    placeholder: 'e.g., Dr. Nikki Lam',
    required: false,
  },

  /* -------------------------------------------------------------- */
  /* Board specialty                                                 */
  /* -------------------------------------------------------------- */

  {
    id: 'boardSpecialty',
    name: 'boardSpecialty',
    type: 'input',
    label: 'Board Specialty',
    placeholder:
      'e.g., Board-Certified Foot & Ankle Specialist',
    required: false,
  },

  /* -------------------------------------------------------------- */
  /* Link                                                             */
  /* -------------------------------------------------------------- */

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
    placeholder:
      'e.g., https://www.footcaremd.org/',
    required: false,
    helperText:
      'URL must begin with https:// or http://',
  }, 
];
