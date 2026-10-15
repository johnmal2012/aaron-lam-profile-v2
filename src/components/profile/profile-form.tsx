// ADMIN PROFILE EDIT > ProfileForm (RHF) > useForm() > RHF form state > CredentialEditor/ClinicEditor/ExpertiseEditor > form.handleSubmit() > onFormSubmit(RHF form data) > toProfilePayload(RHF form data) > Server Action > server-side validation: physicianProfileSchema.safe.Parse(RHF form data) > CRUD > Drizzle/Neon > physician_profile table > credential jsonb column > getWebsiteData() > HomepageSections > AboutSection > Training & Credentials
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

import { cn, getSectionBackground } from '@/lib/utils';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  PhysicianProfileFormInput,
  physicianProfileFormSchema,
} from '@/lib/validations/physician-profile';

import { profileFormFields } from '@/lib/profile/profile-form-fields';

import { BasicInformationEditor } from '@/components/profile/basic-information-editor';

import { ClinicEditor } from '@/components/profile/clinic-editor';

import { ExpertiseEditor } from '@/components/profile/expertise-editor';

import { getProfileDefaultValues } from '@/lib/profile/profile-default-values';

import { toProfilePayload } from '@/lib/profile/profile-mappers';
import { CredentialEditor } from '@/components/profile/credential-editor';
import { useState } from 'react';
import { FilePlus2, LoaderCircle, Save, X, UserRound } from 'lucide-react';

// Types
type Profile = InferSelectModel<typeof physicianProfile>;

type ProfileFormProps = {
  profile?: Profile;
  userName?: string | null;
  userImage?: string | null;
};

// const clinicsSectionIndex = profileFormFields.length;
// const expertiseSectionIndex = clinicsSectionIndex + 1;
// const credentialSectionIndex = expertiseSectionIndex + 1;

// Component
export function ProfileForm({
  profile,
  userName,
  userImage,
}: ProfileFormProps) {
  const [activeAccordion, setActiveAccordion] = useState<
    'basic-info' | 'clinics' | 'expertise' | 'credentials' | ''
  >('');

  const router = useRouter();

  const nextSectionBackground = () =>
  getSectionBackground(sectionIndex++);
  
  let sectionIndex = 0;

  // Form
  const form = useForm<PhysicianProfileFormInput>({
    resolver: zodResolver(physicianProfileFormSchema),

    defaultValues: getProfileDefaultValues(profile),

    // explicit setting modes are about the desired validation UX e.g. mode: 'onChange' for login, registration, short form, form where immediate feeback is important
    // explicit settings both modes are optional for our case as they are defaults and so can be omitted
    // mode: 'onSubmit',

    // reValidateMode: 'onChange',
  });

  if (!profile) {
    return <div>Profile not found.</div>;
  }

  // Submit
  // For server actions called from RHF, no need to  use useTransition
  async function onFormSubmit(values: PhysicianProfileFormInput) {
    try {
      // values.expertise or values.clinic are already arrays using useFieldArray()
      // No textarea parsing is performed here such as values.expertise.split('\n')
      // use toProfilePayload() to convert React Hook Form values into the normalized physician profile payload
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

      // Stay on the profile page after saving
      // This also makes repeated clinic editing easier
      router.push('/profile');

      // Refresh any server components that depend on the updated profile
      router.refresh();
    } catch (err) {
      console.error('Profile form submission error:', err);

      toast.error('Something went wrong. Please try again.');
    }
  }

  // Validation error handler
  function onInvalidSubmit(errors: typeof form.formState.errors) {
    console.error('Validation errors:', errors);

    // Give the administrator immediate feedback
    toast.error('Please correct the highlighted fields.');
  }

  // temporary development - only error logger
  //   const isDevelopment = process.env.NODE_ENV === 'development';
  // Render
  // RHF calls this success callback function = onFormSubmit only when validation succeeds
  // RHF calls this failure callback function = onInvalidSubmit only when validation fails
  return (
    <form
      onSubmit={form.handleSubmit(onFormSubmit, onInvalidSubmit)}
      className="container mx-auto space-y-6 py-10"
      noValidate
    >
      {/* Page heading */}
      <div>
        <h1 className="py-6 text-3xl font-bold">
          {profile ? 'Edit Physician Profile' : 'Create Physician Profile'}
        </h1>
      </div>

      {/* Basic Information */}
      <section
        className={cn(
          'rounded-lg border p-4',
          nextSectionBackground(),
        )}
      >
        <BasicInformationEditor
          form={form}
          userName={userName}
          userImage={userImage}
          open={activeAccordion === 'basic-info'}
          onOpenChange={(open) => setActiveAccordion(open ? 'basic-info' : '')}
        />
      </section>

      {/* Clinics */}
      <section
        className={cn(
          'rounded-lg border p-4',
          nextSectionBackground(),
        )}
      >
        <ClinicEditor
          control={form.control}
          register={form.register}
          errors={form.formState.errors}
          open={activeAccordion === 'clinics'}
          onOpenChange={(open) => setActiveAccordion(open ? 'clinics' : '')}
        />
      </section>
      {/* Expertise */}
      <section
        className={cn(
          'rounded-lg border p-4',
          nextSectionBackground(),
        )}
      >
        <ExpertiseEditor
          control={form.control}
          register={form.register}
          setValue={form.setValue}
          errors={form.formState.errors}
          open={activeAccordion === 'expertise'}
          onOpenChange={(open) => setActiveAccordion(open ? 'expertise' : '')}
        />
      </section>

      {/* Training & Credentials */}
      <section
        className={cn(
          'rounded-lg border p-4',
          nextSectionBackground(),
        )}
      >
        <CredentialEditor
          control={form.control}
          register={form.register}
          setValue={form.setValue}
          errors={form.formState.errors}
          open={activeAccordion === 'credentials'}
          onOpenChange={(open) => setActiveAccordion(open ? 'credentials' : '')}
        />
      </section>

      {/* Form actions */}
      <div className="flex items-center justify-start gap-2">
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="h-10 w-24 bg-green-600! px-4 hover:bg-green-700!"
        >
          {form.formState.isSubmitting ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : profile ? (
            <>
              <Save className="h-4 w-4" />
              Update
            </>
          ) : (
            <>
              <FilePlus2 className="h-4 w-4" />
              Create
            </>
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={form.formState.isSubmitting}
          onClick={() => router.push('/profile')}
        >
          <X className="h-4 w-4" />
          Cancel
        </Button>
      </div>
    </form>
  );
}
