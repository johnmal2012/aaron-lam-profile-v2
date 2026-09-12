import Link from 'next/link';
import { Field, FieldLabel } from '@/components/ui/field';
import { ProfileImageCard } from '@/components/profile/profile-image-card';
import { PhysicianProfile } from '@/lib/types/physician-profile';
import { getProfileItems } from '@/lib/profile/get-profile-items';
import { Badge } from '@/components/ui/badge';

type CurrentUser = {
  name: string | null;
  image: string | null;
};

type ProfileItem = ReturnType<typeof getProfileItems>[number];

type ProfileDisplayFieldProps = {
  item: ProfileItem;
  profile: PhysicianProfile;
  currentUser: CurrentUser | null;
};

export function ProfileDisplayField({
  item,
  profile,
  currentUser,
}: ProfileDisplayFieldProps) {
  switch (item.type) {
    case 'image':
      return (
        <ProfileImageCard
          label={item.label}
          userName={currentUser?.name}
          userImage={currentUser?.image}
        />
      );

    case 'expertise':
      return (
        <Field>
          <FieldLabel className="ml-2.5 text-sm text-muted-foreground">
            Expertise
          </FieldLabel>

          <div className="mt-2 flex flex-wrap gap-2">
            {profile.expertise?.length ? (
              profile.expertise.map((item, index) => (
                <Badge
                  key={`${item.text}-${item.url}-${index}`}
                  variant="secondary"
                  className="
                h-auto
                rounded-full
                border
                border-blue-200
                bg-blue-50
                px-5
                py-2
                text-sm
                font-medium
                text-blue-700
              "
                >
                  {item.text}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">—</p>
            )}
          </div>
        </Field>
      );

    case 'clinics':
      return (
        <Field>
          <FieldLabel className="ml-2.5 text-sm text-muted-foreground">
            Clinics
          </FieldLabel>

          <div className="mt-3 space-y-4">
            {profile.clinics?.length ? (
              profile.clinics.map((clinic, index) => (
                <div
                  key={`${clinic.name}-${clinic.address}-${index}`}
                  className="rounded-lg border bg-muted/20 p-4"
                >
                  <p className="font-semibold">{clinic.name}</p>

                  <p className="mt-1 wrap-break-word text-sm text-muted-foreground">
                    {clinic.address}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">—</p>
            )}
          </div>
        </Field>
      );

    case 'info':
      return (
        <Field>
          <FieldLabel className="ml-2.5 text-sm text-muted-foreground">
            {item.label}
          </FieldLabel>

          {item.id === 'foot-care-link' && item.value ? (
            <Link
              href={item.value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {item.value}
            </Link>
          ) : (
            <p className="wrap-break-word">{item.value || '—'}</p>
          )}
        </Field>
      );
  }
}
