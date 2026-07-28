import { ReturnButton } from "@/components/navigation/return-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PAGE_TITLE = 'Manage Sections';
const CREATE_BUTTON_LABEL = 'Create Section';

export function SectionHeader() {
  return (
    <div className="flex items-center justify-between pb-4">
      {/* Left Side */}
      <div>
        <h1 className="text-4xl font-bold">{PAGE_TITLE}</h1>
      </div>

      {/* Right Side */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          className="h-10 px-4 bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-500/20"
          asChild
        >
          <Link href="/sections/create">{CREATE_BUTTON_LABEL}</Link>
        </Button>

        <ReturnButton href="/" label="Physician Portal" />
      </div>
    </div>
  );
}
