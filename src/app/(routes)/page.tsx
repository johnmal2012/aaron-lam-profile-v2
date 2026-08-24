export const dynamic = 'force-dynamic';

import Navbar from '@/components/navigation/navBar';
import FooterSection from '@/components/sections/footer-section';
import { SectionRenderer } from '@/components/sections/section-renderer';
import { NoSectionState } from '@/components/sections/section-empty-state';
import { getWebsiteData } from '@/lib/website/get-website-data';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';

export default async function PhysicianPage() {
  const websiteData = await getWebsiteData();

  if (!websiteData) {
    return (
      <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <div className="max-w-lg space-y-6">
          <div className="space-y-2">
            <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
              {/* {websiteData.message} */}
              Something went wrong. Please try again.
            </div>
          </div>

          {/* <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div> */}
        </div>
      </div>
    );
  }

  const { profile, sections, navItems } = websiteData;

  console.log('sections: ', sections);

  if (!sections) {
    return <NoSectionState />;
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar
        navItems={navItems}
        logo={profile.logo ?? ''}
        specialty={profile.specialty ?? ''}
        clinicName={profile.clinicName ?? ''}
        linkName={profile.linkName ?? ''}
        footCareLink={profile.footCareLink ?? ''}
      />

      {sections.map((section, index) => (
        <SectionRenderer
          key={section.slug}
          section={section}
          profile={profile}
          index={index}
        />
      ))}

      <FooterSection
        clinicName={profile.clinicName ?? ''}
        clinicAddress={profile.clinicAddress ?? ''}
      />
    </main>
  );
}
