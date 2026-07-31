// using with RHF
'use server';

import { auth } from '@/lib/auth/auth';
import {
  ChangePasswordFormInput,
  changePasswordSchema,
} from '@/lib/validations/auth';
import { APIError } from 'better-auth/api';
import { headers } from 'next/headers';

export async function changePasswordAction(values: ChangePasswordFormInput) {
  const validated = changePasswordSchema.safeParse(values);

  if (!validated.success) {
    return {
      error: 'Invalid password data',
    };
  }
  try {
    await auth.api.changePassword({
      headers: await headers(),
      body: {
        currentPassword: validated.data.currentPassword,
        newPassword: validated.data.newPassword,
      },
    });

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }

    return { error: 'Internal Server Error' };
  }
}
