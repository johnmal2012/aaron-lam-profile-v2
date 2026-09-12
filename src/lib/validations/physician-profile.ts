import { z } from 'zod';
import { optionalText } from '@/lib/optionalText';
import { optionalSpecial } from '@/lib/optionalSpecial';

export const physicianProfileSchema = z.object({
  logo: optionalText(z.string().min(1)),
  name: z.string().min(1, 'Name is required'),
  boardSpecialty: optionalText(z.string().min(1)),
  specialty: optionalText(z.string().min(1)),
  title: optionalText(z.string().min(1)),
  image: optionalText(z.string().min(1)),
  //   clinicName: z.string().min(1, 'Clinic name is required'),
  //   clinicAddress: z.string().min(1, 'Clinic address is required'),
  clinics: z
    .array(
      z.object({
        name: z.string().trim().min(1),
        address: z.string().trim().min(1),
      }),
    )
    .default([]),
  phone: z.string().min(1, 'Phone is required'),
  email: optionalSpecial(z.email()),
  //   address: optionalText(z.string().min(1)),
  //   location: z.string().min(1, 'Header Location Section'),
  linkName: optionalText(z.string().min(1)),
  footCareLink: optionalSpecial(z.url()),
  //   expertise: optionalArray(z.string().trim().min(1)),
  expertise: z
    .array(
      z.object({
        text: z.string().trim().min(1),
        url: z.url(),
      }),
    )
    .default([]),
});

export const physicianProfileFormSchema = z
  .object({
    logo: optionalText(z.string().min(1)),
    name: z.string().trim().min(1, 'Name is required'),
    boardSpecialty: optionalText(z.string().min(1)),
    specialty: optionalText(z.string().min(1)),
    title: optionalText(z.string().min(1)),
    //   clinicName: z.string().trim().min(1, 'Clinic name is required'),
    //   clinicAddress: z.string().trim().min(1, 'Clinic address is required'),
    clinicNames: z.string(),
    clinicAddresses: z.string(),
    phone: z.string().trim().min(1, 'Phone is required'),
    email: optionalSpecial(z.email()),
    //   address: optionalText(z.string().min(1)),
    //   location: z.string().min(1, 'Header Location Section'),
    linkName: optionalText(z.string().min(1)),
    footCareLink: optionalSpecial(z.url()),
    // expertise: optionalText(z.string()),
    expertiseTexts: z.string(),
    expertiseUrls: z.string(),
  })
  .superRefine((data, ctx) => {
    // clinics
    const names = data.clinicNames
      .split('\n')
      .map((value) => value.trim())
      .filter(Boolean);
    const addresses = data.clinicAddresses
      .split('\n')
      .map((value) => value.trim())
      .filter(Boolean);
    if (names.length !== addresses.length) {
      ctx.addIssue({
        code: 'custom',
        path: ['clinicAddresses'],
        message: 'Enter one address for each clinic name.',
      });
    }
    // expertise
    const expertiseTexts = data.expertiseTexts
      .split('\n')
      .map((value) => value.trim())
      .filter(Boolean);

    const expertiseUrls = data.expertiseUrls
      .split('\n')
      .map((value) => value.trim())
      .filter(Boolean);

    if (expertiseTexts.length !== expertiseUrls.length) {
      ctx.addIssue({
        code: 'custom',
        path: ['expertiseUrls'],
        message: 'Enter one URL for each expertise item.',
      });
    }
    // Validate each expertise URL
    expertiseUrls.forEach((url, index) => {
      const result = z.url().safeParse(url);

      if (!result.success) {
        ctx.addIssue({
          code: 'custom',
          path: ['expertiseUrls'],
          message: `Invalid URL for expertise item ${index + 1}.`,
        });
      }
    });
  });

export type PhysicianProfileFormInput = z.input<
  typeof physicianProfileFormSchema
>;

export type PhysicianProfileInput = z.output<typeof physicianProfileSchema>;
