import AboutSection from '@/components/sections/about-section';
import EducationSection from '@/components/sections/education-section';
import ExpertiseSection from '@/components/sections/expertise-section';
import PhilosophySection from '@/components/sections/philosophy-section';
import ResearchSection from '@/components/sections/research-section';
import OfficeHoursSection from '@/components/sections/office-hours-section';
import InsuranceSection from '@/components/sections/insurance-section';
import ContactSection from '@/components/sections/contact-section';
import MapSection from '@/components/sections/map-section';
import TestSection from '@/components/sections/test-section';
import type { PhysicianProfile } from '@/lib/types/physician-profile';
import type { PhysicianSection } from '@/lib/types/physician-section';

type SectionRendererProps = {
  section: PhysicianSection;
  profile: PhysicianProfile;
  index: number;
};

export function SectionRenderer({
  section,
  profile,
  index,
}: SectionRendererProps) {
  const background = index % 2 === 0 ? 'bg-white' : 'bg-slate-100';

  switch (section.slug) {
    case 'about':
      return (
        <AboutSection
          image={profile.image ?? ''}
          name={profile.name ?? ''}
          title={profile.title ?? ''}
          boardSpecialty={profile.boardSpecialty ?? ''}
          specialty={profile.specialty ?? ''}
          content={section.content ?? ''}
          background={background}
          slug={section.slug ?? ''}
        />
      );

    case 'education':
      return (
        <EducationSection
          title={section.title ?? ''}
          content={section.content ?? ''}
          slug={section.slug ?? ''}
          background={background}
        />
      );

    case 'expertise':
      return (
        <ExpertiseSection
          title={section.title ?? ''}
          content={section.content ?? ''}
          expertise={profile.expertise ?? []}
          slug={section.slug ?? ''}
          background={background}
        />
      );

    case 'philosophy':
      return (
        <PhilosophySection
          title={section.title ?? ''}
          content={section.content ?? ''}
          background={background}
          slug={section.slug ?? ''}
        />
      );

    case 'research':
      return (
        <ResearchSection
          title={section.title ?? ''}
          content={section.content ?? ''}
          background={background}
          slug={section.slug ?? ''}
        />
      );

    case 'hours':
      return (
        <OfficeHoursSection
          title={section.title ?? ''}
          content={section.content ?? ''}
          background={background}
          slug={section.slug ?? ''}
        />
      );

    case 'insurance':
      return (
        <InsuranceSection
          title={section.title ?? ''}
          content={section.content ?? ''}
          slug={section.slug ?? ''}
          background={background}
        />
      );

    case 'contact':
      return (
        <ContactSection
          title={section.title ?? ''}
          phone={profile.phone ?? ''}
          email={profile.email ?? ''}
          //   address={profile.clinicAddress ?? ''}
          clinics={profile.clinics ?? []}
          slug={section.slug ?? ''}
          background={background}
        />
      );

    case 'location':
      return (
        <MapSection
          //   location={profile.location ?? ''}
          location={section.title ?? ''}
          //   address={profile.clinicAddress ?? ''}
          clinics={profile.clinics ?? []}
          slug={section.slug ?? ''}
          background={background}
        />
      );

    case 'test1':
      return (
        <TestSection
          title={section.title ?? ''}
          content={section.content ?? ''}
          slug={section.slug ?? ''}
          background={background}
        />
      );

    default:
      return null;
  }
}
