import { SiteStatusBanner } from '@/components/site/site-status-banner';
import { Toaster } from 'sonner';

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <AuthNavbar /> */}
      <SiteStatusBanner />
      {children}
      <Toaster position="top-right" richColors />
    </>
  );
}
