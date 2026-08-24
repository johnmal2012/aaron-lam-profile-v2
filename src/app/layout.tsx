import { Inter, Geist } from 'next/font/google';
import '@/app/globals.css';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import { TooltipProvider } from '@/components/ui/tooltip';
import { getActivePhysicianProfile } from '@/lib/profile/get-physician-profile';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export async function generateMetadata(): Promise<Metadata> {
  const result = await getActivePhysicianProfile();
  const profile = result.success ? result.profile : null;

  return {
    title: profile?.name ?? 'Dr. Arron Lam',
    description: profile?.clinicName ?? 'Dr. Arron Lam Site',
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn('antialiased', inter.variable, 'font-sans', geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
