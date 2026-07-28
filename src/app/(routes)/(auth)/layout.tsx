import { AuthNavbar } from '@/components/shared/auth-navbar';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthNavbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">{children}</div>
      </main>
    </>
  );
}
