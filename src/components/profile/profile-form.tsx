'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  createPhysicianProfile,
  updatePhysicianProfile,
} from '@/actions/profile/physician-profile-actions';
import { Button } from '@/components/ui/button';
import { getCardBackground } from '@/lib/utils';
import { InferSelectModel } from 'drizzle-orm';
import { physicianProfile } from '@/db/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  PhysicianProfileFormInput,
  physicianProfileFormSchema,
} from '@/lib/validations/physician-profile';
import z from 'zod';
import { FieldGroup } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import { profileFormFields } from '@/components/profile/profile-form-fields';
import { ProfileFormField } from '@/components/profile/profile-form-field';
import { getProfileDefaultValues } from '@/components/profile/profile-default-values';
import { toProfilePayload } from '@/components/profile/profile-mappers';

type Profile = InferSelectModel<typeof physicianProfile>;

type ProfileFormProps = {
  profile?: Profile;
  userName?: string | null;
  userImage?: string | null;
};

export function ProfileForm({
  profile,
  userName,
  userImage,
}: ProfileFormProps) {
  const router = useRouter();

  const form = useForm<
    PhysicianProfileFormInput,
    unknown,
    z.output<typeof physicianProfileFormSchema>
  >({
    resolver: zodResolver(physicianProfileFormSchema),
    defaultValues: getProfileDefaultValues(profile),
  });

  async function onFormSubmit(
    values: z.output<typeof physicianProfileFormSchema>,
  ) {
    try {
      const payload = toProfilePayload(values);

      const { error } = profile
        ? await updatePhysicianProfile(profile.id, payload)
        : await createPhysicianProfile(payload);

      if (error) {
        toast.error(error);
        return;
      }
      toast.success('Profile created/updated successfully');
      router.push('/profile');
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
      console.error(err);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onFormSubmit)}
      className="container mx-auto py-10 space-y-6"
      noValidate
    >
      <div>
        <h1 className="text-3xl py-6 font-bold">Edit Physician Profiles</h1>
      </div>

      {/* Desktop View - Hidden on mobile */}
      <FieldGroup className="hidden gap-4 md:grid md:grid-cols-2">
        {profileFormFields.map((field, index) => (
          <div
            key={field.id}
            className={cn('rounded-lg p-4', getCardBackground(index, 2))}
          >
            <ProfileFormField
              field={field}
              form={form}
              userName={userName}
              userImage={userImage}
            />
          </div>
        ))}
      </FieldGroup>

      {/* Mobile View - Hidden on desktop */}
      <FieldGroup className="grid gap-4 md:hidden">
        {profileFormFields.map((field, index) => (
          <div
            key={field.id}
            className={cn('rounded-lg p-4', getCardBackground(index, 2))}
          >
            <ProfileFormField
              field={field}
              form={form}
              userName={userName}
              userImage={userImage}
            />
          </div>
        ))}
      </FieldGroup>

      <div className="flex justify-start items-center gap-2">
        <Button
          disabled={form.formState.isSubmitting}
          className="h-10 px-4 w-24 bg-green-600! hover:bg-green-700!"
        >
          {profile ? 'Update' : 'Create'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/profile')}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
