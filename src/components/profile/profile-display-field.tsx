import Link from 'next/link';

import { Field, FieldLabel } from '@/components/ui/field';

import { ProfileImageCard } from '@/components/profile/profile-image-card';

import { PhysicianProfile } from '@/lib/types/physician-profile';

import { getProfileItems } from '@/lib/profile/get-profile-items';

import { cn } from '@/lib/utils';

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

          <div className="mt-3 space-y-3">
            {profile.expertise?.length ? (
              profile.expertise.map((expertise, index) => (
                <div
                  key={`${expertise.text}-${expertise.url}-${index}`}
                  className={cn(
                    'rounded-lg border px-4 py-3 text-sm font-medium',
                    index % 2 === 0 ? 'bg-slate-100' : 'bg-slate-200',
                  )}
                >
                  {expertise.url ? (
                    <Link
                      href={expertise.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline"
                    >
                      {expertise.text}
                    </Link>
                  ) : (
                    expertise.text
                  )}
                </div>
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

          <div className="mt-3 space-y-3">
            {profile.clinics?.length ? (
              profile.clinics.map((clinic, index) => (
                <div
                  key={`${clinic.name}-${clinic.address}-${index}`}
                  className={cn(
                    'rounded-lg border border-slate-200 p-4',
                    index % 2 === 0 ? 'bg-white' : 'bg-slate-100',
                  )}
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
              className="break-all text-blue-600 hover:underline"
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
