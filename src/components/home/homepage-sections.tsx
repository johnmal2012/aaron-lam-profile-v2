import AboutSection from '@/components/home/about-section';
import ExpertiseSection from '@/components/home/expertise-section';
import PhilosophySection from '@/components/home/philosophy-section';
import ResearchSection from '@/components/home/research-section';
import LocationSection from '@/components/home/location-section';

import OfficeHoursSection from '@/components/sections/office-hours-section';
import InsuranceSection from '@/components/sections/insurance-section';
import ContactSection from '@/components/sections/contact-section';

import type { Clinic } from '@/lib/types/clinic';
import { getWebsiteData } from '@/lib/website/get-website-data';

const SECTION_BACKGROUNDS = [
  'bg-white',
  'bg-[#eaeff5]',
] as const;

function getSectionBackground(index: number) {
  return SECTION_BACKGROUNDS[
    index % SECTION_BACKGROUNDS.length
  ];
}

type WebsiteData = Awaited<
  ReturnType<typeof getWebsiteData>
>;

type Profile = NonNullable<WebsiteData['profile']>;
type WebsiteSection = NonNullable<WebsiteData['sections']>[number];

type HomepageSectionsProps = {
  profile: Profile;
  sections: WebsiteSection[];
  clinics: Clinic[];
};

export default function HomepageSections({
  profile,
  sections,
  clinics,
}: HomepageSectionsProps) {
  const activeSections = sections.filter(
    (section) => section.isActive,
  );

  const getSection = (slug: string) =>
    activeSections.find(
      (section) => section.slug === slug,
    );

  const about = getSection('about');
  const education = getSection('education');
  const expertise = getSection('expertise');
  const philosophy = getSection('philosophy');
  const research = getSection('research');
  const hours = getSection('hours');
  const insurance = getSection('insurance');
  const contact = getSection('contact');
  const location = getSection('location');

  const renderedSections: React.ReactNode[] = [];

  // ABOUT + EDUCATION: intentionally displayed together as one visual section
  if (about || education) {
    renderedSections.push(
      <AboutSection
        key="about"
        profile={profile}
        section={about}
        education={education}
        className={getSectionBackground(
          renderedSections.length,
        )}
      />,
    );
  }

  // EXPERTISE
  if (expertise) {
    renderedSections.push(
      <ExpertiseSection
        key="expertise"
        profile={profile}
        section={expertise}
        className={getSectionBackground(
          renderedSections.length,
        )}
      />,
    );
  }

  // PHILOSOPHY
  if (philosophy) {
    renderedSections.push(
      <PhilosophySection
        key="philosophy"
        section={philosophy}
        className={getSectionBackground(
          renderedSections.length,
        )}
      />,
    );
  }

  // RESEARCH
  if (research) {
    renderedSections.push(
      <ResearchSection
        key="research"
        section={research}
        className={getSectionBackground(
          renderedSections.length,
        )}
      />,
    );
  }

  // OFFICE HOURS
  if (hours) {
    renderedSections.push(
      <OfficeHoursSection
        key="hours"
        title={hours.title ?? 'Office Hours'}
        content={hours.content ?? ''}
        background={getSectionBackground(
          renderedSections.length,
        )}
        slug={hours.slug ?? 'hours'}
      />,
    );
  }

  // INSURANCE
  if (insurance) {
    renderedSections.push(
      <InsuranceSection
        key="insurance"
        title={insurance.title ?? 'Insurance'}
        content={insurance.content ?? ''}
        background={getSectionBackground(
          renderedSections.length,
        )}
        slug={insurance.slug ?? 'insurance'}
      />,
    );
  }

  // CONTACT
  if (contact) {
    renderedSections.push(
      <ContactSection
        key="contact"
        title={contact.title ?? 'Contact'}
        phone={profile.phone ?? undefined}
        email={profile.email ?? ''}
        clinics={clinics}
        address={profile.location ?? undefined}
        background={getSectionBackground(
          renderedSections.length,
        )}
        slug={contact.slug ?? 'contact'}
      />,
    );
  }

  // LOCATIONS
  if (location && clinics.length > 0) {
    renderedSections.push(
      <LocationSection
        key="location"
        clinics={clinics}
        className={getSectionBackground(
          renderedSections.length,
        )}
      />,
    );
  }
  return <>{renderedSections}</>;
}
