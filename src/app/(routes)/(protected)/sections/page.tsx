// 1) admin sections page
// Components
import { DesktopSectionGrid } from '@/components/sections/desktop-section-grid';
import { MobileSectionList } from '@/components/sections/mobile-section-list';
import { NoSectionState } from '@/components/sections/section-empty-state';

// Lib
import { getActivePhysicianSections } from '@/lib/sections/get-physician-sections';
import { SectionHeader } from '@/components/sections/section-header';

export default async function SectionsPage() {
  const sections = await getActivePhysicianSections();

  if (!sections.length) return <NoSectionState />;

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-10 space-y-6 sm:px-6 lg:px-8">
        <section className="rounded-2xl border bg-card p-6 shadow-sm">
          <SectionHeader />
          {/* Responsive Grid */}
          <div className="space-y-4">
            {/* Desktop: Show in pairs with alternating row backgrounds */}
            <DesktopSectionGrid sections={sections} />

            {/* Mobile: Show individual items with alternating backgrounds */}
            <MobileSectionList sections={sections} />
          </div>
        </section>
      </div>
    </main>
  );
}
