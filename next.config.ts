import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ['@node-rs/argon2'],
  //   experimental: {
  //     authInterrupts: true,
  //   }, // enable for forbidden() in auth-utils for authenticated users lacking permission
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io', // old uploadthing url
      },
      {
        protocol: 'https',
        hostname: '*.ufs.sh', // latest uploadthing url
      },
    ],
  },
  trailingSlash: false, // disable trailing slash in URLs otherwise signout not working
};

export default nextConfig;
