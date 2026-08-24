export function SiteStatusBanner() {
  if (process.env.NEXT_PUBLIC_SITE_STATUS !== 'demo') {
    return null;
  }

  return (
    <div className="w-full bg-yellow-400 px-4 py-2 text-center text-sm font-bold text-black">
      DRAFT / DEMO SITE — NOT PRODUCTION
    </div>
  );
}
