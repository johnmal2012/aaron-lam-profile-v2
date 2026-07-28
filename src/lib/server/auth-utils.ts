import 'server-only';

import { serverEnv } from '@/lib/env/server';

export function getValidDomains() {
  const domains = [
    'gmail.com',
    'yahoo.com',
    'outlook.com',
  ];

  if (serverEnv.NODE_ENV === 'development') {
    domains.push('example.com');
  }

  return domains;
}