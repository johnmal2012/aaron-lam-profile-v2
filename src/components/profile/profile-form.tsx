'use client';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { InferSelectModel } from 'drizzle-orm';

import { physicianProfile } from '@/db/schema';

import {
  createPhysicianProfile,
  updatePhysicianProfile,
} from '@/actions/profile/physician-profile-actions';

import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';

import { getCardBackground } from '@/lib/utils';

import { cn } from '@/lib/utils';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  PhysicianProfileFormInput,
  physicianProfileFormSchema,
} from '@/lib/validations/physician-profile';

import { profileFormFields } from '@/lib/profile/profile-form-fields';

import { ProfileFormField } from '@/components/profile/profile-form-field';

import { ClinicEditor } from '@/components/profile/clinic-editor';

import { ExpertiseEditor } from '@/components/profile/expertise-editor';

import { getProfileDefaultValues } from '@/lib/profile/profile-default-values';

import { toProfilePayload } from '@/lib/profile/profile-mappers';

/* ---------------------------------------------------------------- */
/* Types                                                            */
/* ---------------------------------------------------------------- */

type Profile = InferSelectModel<typeof physicianProfile>;

type ProfileFormProps = {
  profile?: Profile;
  userName?: string | null;
  userImage?: string | null;
};

const clinicsSectionIndex = profileFormFields.length;
const expertiseSectionIndex = clinicsSectionIndex + 1;

/* ---------------------------------------------------------------- */
/* Component                                                        */
/* ---------------------------------------------------------------- */

export function ProfileForm({
  profile,
  userName,
  userImage,
}: ProfileFormProps) {
  const router = useRouter();

  /* -------------------------------------------------------------- */
  /* Form                                                           */
  /* -------------------------------------------------------------- */

  const form = useForm<PhysicianProfileFormInput>({
    resolver: zodResolver(physicianProfileFormSchema),

    defaultValues: getProfileDefaultValues(profile),

    /*
     * Important for dynamically added/removed
     * clinics and expertise records.
     */
    mode: 'onSubmit',

    reValidateMode: 'onChange',
  });

  /* -------------------------------------------------------------- */
  /* Submit                                                         */
  /* -------------------------------------------------------------- */
  // For server actions called from RHF, no need to  use useTransition
  async function onFormSubmit(values: PhysicianProfileFormInput) {
    try {
      /*
       * Clinics and expertise are already arrays.
       *
       * No textarea parsing is performed here.
       */
      const payload = toProfilePayload(values);

      const result = profile
        ? await updatePhysicianProfile(profile.id, payload)
        : await createPhysicianProfile(payload);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success(
        profile
          ? 'Profile updated successfully'
          : 'Profile created successfully',
      );

      /*
       * Stay on the profile page after saving.
       *
       * This also makes repeated clinic editing easier.
       */
      router.push('/profile');

      /*
       * Refresh any server components that depend
       * on the updated profile.
       */
      router.refresh();
    } catch (err) {
      console.error('Profile form submission error:', err);

      toast.error('Something went wrong. Please try again.');
    }
  }

  /* -------------------------------------------------------------- */
  /* Validation error handler                                       */
  /* -------------------------------------------------------------- */

  function onInvalidSubmit(errors: typeof form.formState.errors) {
    console.error('Validation errors:', errors);

    /*
     * Give the administrator immediate feedback.
     */
    toast.error('Please correct the highlighted fields.');
  }

  /* -------------------------------------------------------------- */
  /* Render                                                         */
  /* -------------------------------------------------------------- */

  // temporary development - only error logger
//   const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    // <form
    //   onSubmit={form.handleSubmit(
    //     onFormSubmit,
    //     isDevelopment
    //       ? (errors) => console.log('Validation errors:', errors)
    //       : undefined,
    //   )}
    //   className="container mx-auto py-10 space-y-6"
    //   noValidate
    // >
    <form
      onSubmit={form.handleSubmit(onFormSubmit, onInvalidSubmit)}
      className="container mx-auto space-y-6 py-10"
      noValidate
    >
      {/* ---------------------------------------------------------- */}
      {/* Page heading                                               */}
      {/* ---------------------------------------------------------- */}

      <div>
        <h1 className="py-6 text-3xl font-bold">
          {profile ? 'Edit Physician Profile' : 'Create Physician Profile'}
        </h1>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* Basic / standard profile fields                            */}
      {/* ---------------------------------------------------------- */}

      <FieldGroup className="grid gap-4 md:grid-cols-2">
        {profileFormFields.map((field, index) => (
          <div
            key={field.id}
            className={cn('rounded-lg p-4', getCardBackground(index))}
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

      {/* ---------------------------------------------------------- */}
      {/* Clinics                                                     */}
      {/* ---------------------------------------------------------- */}

      <section
        className={cn(
          'rounded-lg border p-4',
          getCardBackground(clinicsSectionIndex),
        )}
      >
        <ClinicEditor
          control={form.control}
          register={form.register}
          errors={form.formState.errors}
        />
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Expertise                                                   */}
      {/* ---------------------------------------------------------- */}

      <section
        className={cn(
          'rounded-lg border p-4',
          getCardBackground(expertiseSectionIndex),
        )}
      >
        <ExpertiseEditor
          control={form.control}
          register={form.register}
          errors={form.formState.errors}
        />
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Form actions                                                */}
      {/* ---------------------------------------------------------- */}

      <div className="flex items-center justify-start gap-2">
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="h-10 w-24 bg-green-600! px-4 hover:bg-green-700!"
        >
          {form.formState.isSubmitting
            ? 'Saving...'
            : profile
              ? 'Update'
              : 'Create'}
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={form.formState.isSubmitting}
          onClick={() => router.push('/profile')}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
