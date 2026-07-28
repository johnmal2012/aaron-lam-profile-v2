import { PhysicianSectionFormInput } from '@/lib/validations/physician-section';

type BaseField = {
  id: string;
  label: string;
  required?: boolean;
};

type InputField = BaseField & {
  type: 'input' | 'number';
  name: keyof PhysicianSectionFormInput;
  placeholder?: string;
  helperText?: string;
};

type TextareaField = BaseField & {
  type: 'textarea';
  name: keyof PhysicianSectionFormInput;
  placeholder?: string;
  helperText?: string;
};

export type SectionFormField =
  | InputField
  | TextareaField;

export const sectionFormFields: SectionFormField[] = [
  {
    id: 'title',
    name: 'title',
    type: 'input',
    label: 'Section Heading Text',
    required: false,
    placeholder: 'Section title',
    helperText:
      'Specify the heading displayed at the top of this section.',
  },
  {
    id: 'slug',
    name: 'slug',
    type: 'input',
    label: 'Menu Label',
    required: true,
    placeholder: 'about-us',
    helperText:
      'Used as the unique key for this section. Use lowercase letters, numbers, hyphens, or underscores only.',
  },
  {
    id: 'content',
    name: 'content',
    type: 'textarea',
    label: 'Content',
    required: true,
    placeholder: 'Write MDX content here...',
    helperText:
      'Use Markdown formatting such as # headings, **bold**, *italic*, lists, and links.',
  },
  {
    id: 'displayOrder',
    name: 'displayOrder',
    type: 'number',
    label: 'Display Order',
    required: true,
    helperText:
      'Controls the order shown on the public website.',
  },
];