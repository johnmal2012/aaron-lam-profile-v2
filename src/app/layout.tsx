import { Inter, Geist } from 'next/font/google';
import '@/app/globals.css';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import { db } from '@/db/db';
import { TooltipProvider } from '@/components/ui/tooltip';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export async function generateMetadata(): Promise<Metadata> {
  const physician = await db.query.physicianProfile.findFirst();

  return {
    title: physician?.name ?? 'Dr. Nikki Lam',
    description: physician?.clinicName ?? 'Dr. Nikki Lam Site',
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
