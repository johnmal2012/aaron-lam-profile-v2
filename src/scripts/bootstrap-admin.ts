// two Next.js-specific pieces we should keep out of the bootstrap script: 1. server-only 2. nextCookies(
// bootstrap script doesn't need browser/Next.js cookie handling
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), '.env.local'),
});

async function main() {
  // Import these AFTER .env.local has been loaded.
  const { db } = await import('@/db/db');
  //   const { user } = await import('@/db/schema/auth-schema');
  const { user, USER_ROLE } = await import('@/db/schema/auth-schema');
  //   const { auth } = await import('@/lib/auth/auth');
  const { bootstrapAuth } = await import('@/lib/auth/auth-bootstrap');
  const { eq } = await import('drizzle-orm');

  // ---------------------------------------------
  // Read bootstrap environment variables
  // ---------------------------------------------

  const email = process.env.BOOTSTRAP_ADMIN_EMAIL?.trim().toLowerCase();

  const password = process.env.BOOTSTRAP_ADMIN_PASSWORD;

  const name = process.env.BOOTSTRAP_ADMIN_NAME?.trim();

  if (!email) {
    throw new Error('BOOTSTRAP_ADMIN_EMAIL environment variable is required.');
  }

  if (!password) {
    throw new Error(
      'BOOTSTRAP_ADMIN_PASSWORD environment variable is required.',
    );
  }

  if (!name) {
    throw new Error('BOOTSTRAP_ADMIN_NAME environment variable is required.');
  }

  // ---------------------------------------------
  // Make sure bootstrap email is an approved admin
  // ---------------------------------------------

  const adminEmails =
    process.env.ADMIN_EMAILS?.split(';')
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean) ?? [];

  if (!adminEmails.includes(email)) {
    throw new Error(
      `Bootstrap email ${email} is not included in ADMIN_EMAILS.`,
    );
  }

  console.log(`Creating bootstrap administrator: ${email}`);

  // ---------------------------------------------
  // Check whether administrator already exists
  // ---------------------------------------------

  const existingUser = await db
    .select({
      id: user.id,
      email: user.email,
      role: user.role,
      emailVerified: user.emailVerified,
    })
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    throw new Error(`A user with email ${email} already exists.`);
  }

  // ---------------------------------------------
  // Create the user through Better Auth
  // ---------------------------------------------

  const result = await bootstrapAuth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });

  const newUser = result.user;

  console.log('User created by Better Auth.');

  console.log({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    // role: newUser.role,
    emailVerified: newUser.emailVerified,
  });

  // ---------------------------------------------
  // Promote to ADMIN and verify email
  // ---------------------------------------------

  await db
    .update(user)
    .set({
      role: USER_ROLE.ADMIN,
      emailVerified: true,
    })
    .where(eq(user.id, newUser.id));

  // ---------------------------------------------
  // Verify the final database values
  // ---------------------------------------------

  const [verifiedUser] = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      emailVerified: user.emailVerified,
    })
    .from(user)
    .where(eq(user.id, newUser.id));

  console.log('');
  console.log('Bootstrap administrator created successfully.');

  console.log(verifiedUser);
}

main().catch((error) => {
  console.error('');
  console.error('Bootstrap administrator failed.');
  console.error('');

  console.error(error);

  process.exit(1);
});
