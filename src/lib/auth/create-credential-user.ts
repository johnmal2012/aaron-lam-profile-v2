import { db } from '@/db/db';
import { USER_ROLE } from '@/db/schema/auth-schema';
import { and, eq } from 'drizzle-orm';
import { user, account } from '@/db/schema';
import { hashPassword } from '@/lib/auth/argon2';

export async function createCredentialUser({
  name,
  email,
  password,
  role,
}: {
  name: string;
  email: string;
  password: string;
  role: typeof USER_ROLE.ADMIN | typeof USER_ROLE.USER;
}) {
  console.log('createCredentialUser() called');
  // create user
  let existingUser = await db.query.user.findFirst({
    where: eq(user.email, email),
  });

  console.log('existingUser:', !!existingUser);

  if (!existingUser) {
    const [createdUser] = await db
      .insert(user)
      .values({
        name,
        email,
        emailVerified: true,
        role,
        isActive: true,
      })
      .returning();

    existingUser = createdUser;

    console.log('✓ User created');
  } else {
    console.log('✓ User already exists');
  }
  // create credential account
  const CREDENTIAL_PROVIDER = 'credential';

  const existingAccount = await db.query.account.findFirst({
    where: and(
      eq(account.providerId, CREDENTIAL_PROVIDER),
      eq(account.accountId, email),
    ),
  });

  console.log('existingAccount:', !!existingAccount);
  
  if (!existingAccount) {
    const hashedPassword = await hashPassword(password);

    await db.insert(account).values({
      accountId: email,
      providerId: CREDENTIAL_PROVIDER,
      password: hashedPassword,
      userId: existingUser.id,
    });

    console.log('✓ Credential account created');
  } else {
    console.log('✓ Credential account already exists');
  }
}
