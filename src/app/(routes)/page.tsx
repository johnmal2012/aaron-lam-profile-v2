export const dynamic = 'force-dynamic';

import Navbar from '@/components/navigation/navBar';
import FooterSection from '@/components/sections/footer-section';
import { SectionRenderer } from '@/components/sections/section-renderer';
import { NoSectionState } from '@/components/sections/section-empty-state';
import { NoProfileState } from '@/components/profile/profile-empty-state';
import { getWebsiteData } from '@/lib/website/get-website-data';

export default async function PhysicianPage() {
  const { profile, sections, navItems } = await getWebsiteData();

  if (!profile) return <NoProfileState />;
  
  if (!sections) return <NoSectionState />;

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
