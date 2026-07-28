import Link from "next/link";
import { ReturnButton } from "@/components/navigation/return-button";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

const PAGE_TITLE = 'Physician Profiles';
const CREATE_BUTTON_LABEL = 'Create Profile';
const PAGE_SUBTITLE = 'Manage physician profile content';
const ALERT_MESSAGE = 'Only one profile record is allowed. If multiple records exist, please remove the extra records.';

export function ProfileHeader() {
  return (
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{PAGE_TITLE}</h1>

          <p className="mt-1 text-muted-foreground">
            {PAGE_SUBTITLE}
          </p>

          <Alert className="mt-3 border-amber-300 bg-amber-50 text-amber-900 lg:mb-6">
            <TriangleAlert className="h-4 w-4" />
            <AlertDescription>
              {ALERT_MESSAGE}
            </AlertDescription>
          </Alert>
        </div>

        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center lg:self-start">
          <Button asChild className="h-10 px-4">
            <Link href="/profile/create">{CREATE_BUTTON_LABEL}</Link>
          </Button>

          <ReturnButton href="/" label="Physician Portal" />
        </div>
      </div>
  )
}