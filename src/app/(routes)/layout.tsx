import { Toaster } from 'sonner';

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <AuthNavbar /> */}
      {children}
      <Toaster position="top-right" richColors />
    </>
  );
}
