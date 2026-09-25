import Navbar from '@/components/navigation/navBar';
import FooterSection from '@/components/sections/footer-section';

import HeroSection from '@/components/home/hero-section';
import HomepageSections from '@/components/home/homepage-sections';

import { getWebsiteData } from '@/lib/website/get-website-data';
import type { Clinic } from '@/lib/types/clinic';

export const dynamic = 'force-dynamic';

function normalizeClinics(
  clinics: Clinic[] | null | undefined,
): Clinic[] {
  return Array.isArray(clinics) ? clinics : [];
}

export default async function PhysicianPage() {
  const websiteData = await getWebsiteData();

  if (!websiteData.success || !websiteData.profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6">
        <div className="w-full max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <h1 className="text-lg font-semibold text-red-800">
            Website unavailable
          </h1>

          <p className="mt-2 text-sm text-red-700">
            {websiteData.message ??
              'Something went wrong. Please try again.'}
          </p>
        </div>
      </main>
    );
  }

  const { profile, sections, navItems } = websiteData;

  if (!sections) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-slate-500">
          No website sections are currently available.
        </p>
      </main>
    );
  }

  const clinics = normalizeClinics(profile.clinics);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar
        navItems={navItems}
        logo={profile.logo ?? ''}
        specialty={profile.specialty ?? ''}
        clinics={clinics}
        linkName={profile.linkName ?? ''}
        footCareLink={profile.footCareLink ?? ''}
      />

      <HeroSection profile={profile} />

      <HomepageSections
        profile={profile}
        sections={sections}
        clinics={clinics}
      />

      <FooterSection clinics={clinics} />
    </main>
  );
}
