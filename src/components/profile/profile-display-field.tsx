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
            {profile.expertise?.map((item: string) => (
              <Badge key={item} variant="secondary" className="h-auto
                rounded-full
                border
                border-blue-200
                bg-blue-50
                px-5
                py-2
                text-sm
                font-medium
                text-blue-700">
                {item}
              </Badge>
            ))}
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
