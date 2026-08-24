'use server';

import { db } from '@/db/db';
import { user, USER_ROLE } from '@/db/schema';
import { auth } from '@/lib/auth/auth';
import {
  CreateAdminFormInput,
  createAdminSchema,
} from '@/lib/validations/user';
import { APIError } from 'better-auth/api';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';

export async function createAdminUserAction(values: CreateAdminFormInput) {
  /*
   * SECURITY CHECK
   *
   * Never rely on the client-side form to determine
   * whether the caller is an administrator.
   *
   * This check MUST happen on the server.
   */
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return {
      error: 'Unauthorized.',
    };
  }

  if (session.user.role !== 'admin') {
    return {
      error: 'Forbidden.',
    };
  }

  /*
   * SERVER-SIDE VALIDATION
   *
   * Even though React Hook Form validates on the client,
   * the server must validate again.
   */
  const validated = createAdminSchema.safeParse(values);

  if (!validated.success) {
    return {
      error: 'Invalid create admin data',
    };
  }

  try {
    const newUser = await auth.api.createUser({
      headers: await headers(),
      body: {
        name: validated.data.name,
        email: validated.data.email,
        password: validated.data.password,
        role: USER_ROLE.ADMIN,
      },
    });

    /*
     * --------------------------------------------------
     * 4. MARK EMAIL AS VERIFIED
     * --------------------------------------------------
     *
     * The existing admin has explicitly created this
     * account, so email verification is not required.
     */
    await db
      .update(user)
      .set({
        emailVerified: true,
      })
      .where(eq(user.id, newUser.user.id));

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }
    return { error: 'Internal Server Error' };
  }
}
