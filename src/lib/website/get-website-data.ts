import { getActivePhysicianProfile } from '@/lib/profile/get-physician-profile';
import { getActivePhysicianSections } from '@/lib/sections/get-physician-sections';
import { buildNavItems } from '@/lib/sections/get-navitems';

export async function getWebsiteData() {
  const [profileResult, sections] = await Promise.all([
    getActivePhysicianProfile(),
    getActivePhysicianSections(),
  ]);

  if (!profileResult.success) {
    return {
      success: false,
      message: profileResult.message,
      profile: null,
      sections: null,
      navItems: [],
    };
  }

  return {
    success: true,
    profile: profileResult.profile,
    sections,
    navItems: sections ? buildNavItems(sections) : [],
  };
}
