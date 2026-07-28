'use server';

import { auth } from '@/lib/auth';
import { APIError } from 'better-auth/api';
import { LoginFormInput, loginSchema } from '@/lib/validations/auth';
import { headers } from 'next/headers';

export async function signInEmailAction(values: LoginFormInput) {
  const validated = loginSchema.safeParse(values);

  if (!validated.success) {
    return {
      error: 'Invalid login data',
    };
  }

  try {
    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email: validated.data.email,
        password: validated.data.password,
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
