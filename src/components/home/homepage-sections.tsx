
import AboutSection from '@/components/home/about-section';
import HeroSection from '@/components/home/hero-section';
import ExpertiseSection from '@/components/home/expertise-section';
import PhilosophySection from '@/components/home/philosophy-section';
import ResearchSection from '@/components/home/research-section';
import LocationSection from '@/components/home/location-section';

import OfficeHoursSection from '@/components/sections/office-hours-section';
import InsuranceSection from '@/components/sections/insurance-section';
import ContactSection from '@/components/sections/contact-section';

import type { Clinic } from '@/lib/types/clinic';
import type { HeroFact } from '@/lib/types/hero-fact';
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

type WebsiteSection = NonNullable<
  WebsiteData['sections']
>[number];

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
  // Only active sections should be displayed.
  const activeSections = sections.filter(
    (section) => section.isActive,
  );

  const getSection = (slug: string) =>
    activeSections.find(
      (section) => section.slug === slug,
    );

  // Support both possible hero slugs.
  const hero = activeSections.find(
    (section) =>
      section.slug === 'home' ||
      section.slug === 'hero',
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

  // HERO
  // Render before all other homepage sections.
  if (hero) {
    const heroFacts: HeroFact[] | null =
      Array.isArray(hero.heroFacts)
        ? (hero.heroFacts as HeroFact[])
        : null;

    renderedSections.push(
      <HeroSection
        key="home"
        profile={profile}
        heroFacts={heroFacts}
        title={hero.title ?? 'Specialized Care for Foot & Ankle Conditions'}
        quote={hero.quote ?? ''}
        message={hero.message ?? ''}
      />,
    );
  }

  // Exclude the hero from the alternating background index.
  const backgroundIndex = () =>
    renderedSections.length - (hero ? 1 : 0);

  // ABOUT + EDUCATION
  if (about || education) {
    renderedSections.push(
      <AboutSection
        key="about"
        profile={profile}
        section={about}
        education={education}
        className={getSectionBackground(
          backgroundIndex(),
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
          backgroundIndex(),
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
          backgroundIndex(),
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
          backgroundIndex(),
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
          backgroundIndex(),
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
          backgroundIndex(),
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
          backgroundIndex(),
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
          backgroundIndex(),
        )}
      />,
    );
  }

  return <>{renderedSections}</>;
}
