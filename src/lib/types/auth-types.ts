import type { auth } from '@/lib/auth/auth';

export type Session = typeof auth.$Infer.Session;
export type SessionUser = Session['user'];
