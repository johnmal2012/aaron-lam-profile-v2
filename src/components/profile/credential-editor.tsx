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

import { Award, GraduationCap, Plus } from 'lucide-react';

import {
  type Control,
  type UseFormRegister,
  type UseFormSetValue,
  useFieldArray,
} from 'react-hook-form';

import type { PhysicianProfileFormInput } from '@/lib/validations/physician-profile';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { CredentialCard } from '@/components/profile/credential-card';

import { useState } from 'react';

// Types
interface CredentialEditorProps {
  control: Control<PhysicianProfileFormInput>;
  register: UseFormRegister<PhysicianProfileFormInput>;
  setValue: UseFormSetValue<PhysicianProfileFormInput>;
  errors?: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Credential Editor
export function CredentialEditor({
  control,
  register,
  setValue,
  errors,
  open,
  onOpenChange,
}: CredentialEditorProps) {
  //   const [openItems, setOpenItems] = useState<string[]>([]);

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

    // Automatically expand the Credentials section.
    // setOpenItems((current) =>
    //   current.includes('credentials') ? current : [...current, 'credentials'],
    // );
    // Open Clinics and automatically close the previously open section.
    onOpenChange(true);
  }

  return (
    <Accordion
      type="single"
      collapsible
      value={open ? 'credentials' : ''}
      onValueChange={(value) => onOpenChange(value === 'credentials')}
      className="w-full"
    >
      <AccordionItem value="credentials" className="border-0">
        {/* Section heading */}
        <div className="flex min-w-0 items-center gap-4">
          <AccordionTrigger className="min-w-0 flex-1 justify-start gap-3 py-3 text-left hover:no-underline">
            <GraduationCap className="size-5 shrink-0" />

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <h3 className="min-w-0 flex-1 text-lg font-semibold">
                  Credentials
                </h3>

                <span className="shrink-0 rounded-md bg-muted px-2 py-1 text-xs font-semibold tabular-nums">
                  {fields.length}
                </span>
              </div>

              <p className="text-sm font-normal text-muted-foreground">
                Add medical school, residency, fellowship, and certification
                credentials.
              </p>
            </div>

            {/* <span className="shrink-0 rounded-md bg-muted px-2 py-1 text-xs font-semibold tabular-nums">
              {fields.length}
            </span> */}
          </AccordionTrigger>

          {/* Outside AccordionTrigger so Add doesn't toggle it */}
          <Button
            type="button"
            className="w-36 shrink-0 bg-blue-600 text-white hover:bg-blue-700"
            onClick={addCredential}
          >
            <Plus className="mr-2 size-4" />
            Add Credential
          </Button>
        </div>

        <AccordionContent>
          <div className="space-y-4 pt-3">
            {fields.length === 0 ? (
              <Card className="flex flex-col items-center justify-center gap-3 border-dashed p-8 text-center">
                <Award className="size-10 text-muted-foreground" />

                <div>
                  <p className="font-medium">No credentials added</p>
                  <p className="text-sm text-muted-foreground">
                    Add training or credential information to display on the
                    physician website.
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
            ) : (
              <>
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
              </>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
