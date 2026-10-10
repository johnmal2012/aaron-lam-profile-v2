// CredentialEditor
// React Hook Form
//   ↓
// onFormSubmit(RHF form data) = form.getValues() = RHF form data
//   ↓
// toProfilePayload(RHF form data)
//   ↓
// normalizeCredentials()
//   ↓
// credential: Credential[]
//   ↓
// physicianProfileSchema.safeParse(RHF form data)
//   ↓
// validated.data.credential
//   ↓
// back to profileForm
//   ↓
// updatePhysicianProfile(validated data)/createPhysicianProfile(validated data)
//   ↓
// Drizzle UPDATE
//   ↓
// physician_profile.credential JSONB
//
// Image flow:
// UploadThing
//   ↓
// onClientUploadComplete()
//   ↓
// setValue(credential[index].image)
// setValue(credential[index].imageKey)
//   ↓
// React Hook Form
//   ↓
// Main ProfileForm submit
//   ↓
// onFormSubmit(RHF form data) or onInvalidSubmit(errors)
//   ↓
// Neon JSONB
// UploadThing → onClientUploadComplete → set RHF image + imageKey → RHF form state remains the source of truth → main ProfileForm submits the complete array → Zod validates → server action → Drizzle/Neon JSONB
// UploadThing owns the file upload. RHF owns the form data. Neon owns the persisted copy.
'use client';

import { Award, Plus } from 'lucide-react';

import {
  type Control,
  type UseFormRegister,
  type UseFormSetValue,
  useFieldArray,
} from 'react-hook-form';

import type { PhysicianProfileFormInput } from '@/lib/validations/physician-profile';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { CredentialCard } from '@/components/profile/credential-card';

// Types
interface CredentialEditorProps {
  control: Control<PhysicianProfileFormInput>;
  register: UseFormRegister<PhysicianProfileFormInput>;
  setValue: UseFormSetValue<PhysicianProfileFormInput>;
  errors?: any;
}

// Credential Editor
export function CredentialEditor({
  control,
  register,
  setValue,
  errors,
}: CredentialEditorProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'credential',
  });

  function addCredential() {
    append({
      type: 'education',
      label: '',
      institution: '',
      image: '',
      imageKey: '',
    });
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Training & Credentials</h3>

          <p className="text-sm text-muted-foreground">
            Add medical school, residency, fellowship, and certification
            credentials.
          </p>
        </div>

        <Button
          type="button"
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={addCredential}
        >
          <Plus className="mr-2 size-4" />
          Add Credential
        </Button>
      </div>

      {/* Empty state */}
      {fields.length === 0 && (
        <Card className="flex flex-col items-center justify-center gap-3 border-dashed p-8 text-center">
          <Award className="size-10 text-muted-foreground" />

          <div>
            <p className="font-medium">No credentials added</p>

            <p className="text-sm text-muted-foreground">
              Add training or credential information to display on the physician
              website.
            </p>
          </div>

          <Button
            type="button"
            onClick={addCredential}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <Plus className="mr-2 size-4" />
            Add Credential
          </Button>
        </Card>
      )}

      {/* Credential cards */}
      {fields.map((field, index) => (
        <CredentialCard
          key={field.id}
          control={control}
          field={field}
          index={index}
          register={register}
          setValue={setValue}
          remove={remove}
          error={errors?.credential?.[index]}
        />
      ))}

      {/* Add another */}
      {fields.length > 0 && (
        <div className="flex justify-end">
          <Button
            type="button"
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={addCredential}
          >
            <Plus className="mr-2 size-4" />
            Add Another Credential
          </Button>
        </div>
      )}
    </div>
  );
}
