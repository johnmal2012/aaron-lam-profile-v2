import { serverEnv } from '@/lib/env/server';

const VALID_DOMAINS = getValidDomains();

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