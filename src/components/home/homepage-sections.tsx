
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
import { ReactNode } from 'react';

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
  const activeSections = sections
    .filter((section) => section.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const about = activeSections.find((section) => section.slug === 'about');
  const education = activeSections.find(
    (section) => section.slug === 'education',
  );

  const renderedSections: ReactNode[] = [];
  let backgroundIndex = 0;
  let aboutRendered = false;

  for (const section of activeSections) {
    const background = getSectionBackground(backgroundIndex);

    switch (section.slug) {
      case 'home':
      case 'hero': {
        const heroFacts: HeroFact[] | null = Array.isArray(
          section.heroFacts,
        )
          ? (section.heroFacts as HeroFact[])
          : null;

        renderedSections.push(
          <HeroSection
            key="home"
            profile={profile}
            heroFacts={heroFacts}
            title={
              section.title ??
              'Specialized Care for Foot & Ankle Conditions'
            }
            quote={section.quote ?? ''}
            message={section.message ?? ''}
          />,
        );
        backgroundIndex++;
        break;
      }

      case 'about':
      case 'education': {
        // Combine About and Education at the position of
        // whichever section appears first in displayOrder.
        if (!aboutRendered) {
          renderedSections.push(
            <AboutSection
              key="about"
              profile={profile}
              section={about}
              education={education}
              className={background}
            />,
          );

          aboutRendered = true;
          backgroundIndex++;
        }
        break;
      }

      case 'expertise':
        renderedSections.push(
          <ExpertiseSection
            key="expertise"
            profile={profile}
            section={section}
            className={background}
          />,
        );
        backgroundIndex++;
        break;

      case 'philosophy':
        renderedSections.push(
          <PhilosophySection
            key="philosophy"
            section={section}
            className={background}
          />,
        );
        backgroundIndex++;
        break;

      case 'research':
        renderedSections.push(
          <ResearchSection
            key="research"
            section={section}
            className={background}
          />,
        );
        backgroundIndex++;
        break;

      case 'hours':
        renderedSections.push(
          <OfficeHoursSection
            key="hours"
            title={section.title ?? 'Office Hours'}
            content={section.content ?? ''}
            background={background}
            slug={section.slug ?? 'hours'}
          />,
        );
        backgroundIndex++;
        break;

      case 'insurance':
        renderedSections.push(
          <InsuranceSection
            key="insurance"
            title={section.title ?? 'Insurance'}
            content={section.content ?? ''}
            background={background}
            slug={section.slug ?? 'insurance'}
          />,
        );
        backgroundIndex++;
        break;

      case 'contact':
        renderedSections.push(
          <ContactSection
            key="contact"
            title={section.title ?? 'Contact'}
            phone={profile.phone ?? undefined}
            email={profile.email ?? ''}
            clinics={clinics}
            address={profile.location ?? undefined}
            background={background}
            slug={section.slug ?? 'contact'}
          />,
        );
        backgroundIndex++;
        break;

      case 'location':
        if (clinics.length > 0) {
          renderedSections.push(
            <LocationSection
              key="location"
              title={section.title ?? 'Our Locations'}
              clinics={clinics}
              className={background}
            />,
          );
          backgroundIndex++;
        }
        break;
    }
  }

  return <>{renderedSections}</>;
}
