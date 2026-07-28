// using resend to send verification email
import { Resend } from 'resend';
import { serverEnv } from '@/lib/env/server';

export const resend = new Resend(serverEnv.RESEND_API_KEY);

export default async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const { data, error } = await resend.emails.send({
    from: serverEnv.EMAIL_FROM,
    to,
    subject,
    html,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
