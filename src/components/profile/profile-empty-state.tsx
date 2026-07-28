import { UserRoundArrowLeft } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";

export function NoProfileState() {
  return (
    <EmptyState
      title="No physician profile found."
      description="Create a physician profile to display on the website."
      icon={<UserRoundArrowLeft className="size-12" />}
    />
  );
}