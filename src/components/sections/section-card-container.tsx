import { PhysicianSection } from "@/lib/types/physician-section";
import { SectionCard } from "@/components/sections/section-card";

export function SectionCardContainer({
  section,
}: {
  section: PhysicianSection;
}) {
  return (
    <div className="rounded-2xl border bg-background p-5 transition hover:shadow-md">
      <SectionCard section={section} />
    </div>
  );
}