export type CredentialType =
  | 'education'
  | 'residency'
  | 'fellowship'
  | 'certification';

export type Credential = {
  type: CredentialType;
  label: string;
  institution: string;
  //   breakAfter: string;
  image: string;
  imageKey: string;
};
