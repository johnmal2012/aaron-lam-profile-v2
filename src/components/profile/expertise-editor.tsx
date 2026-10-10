'use client';

import { Plus, Stethoscope } from 'lucide-react';

import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray,
} from 'react-hook-form';

import type { PhysicianProfileFormInput } from '@/lib/validations/physician-profile';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { ExpertiseCard } from '@/components/profile/expertise-card';

// Types
interface ExpertiseEditorProps {
  control: Control<PhysicianProfileFormInput>;
  register: UseFormRegister<PhysicianProfileFormInput>;
  setValue: UseFormSetValue<PhysicianProfileFormInput>;
  errors?: any;
}

// Expertise Editor
export function ExpertiseEditor({
  control,
  register,
  setValue,
  errors,
}: ExpertiseEditorProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'expertise',
  });

  function addExpertise() {
    append({
      text: '',
      url: '',
      image: '',
      imageKey: '',
    });
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Expertise</h3>

          <p className="text-sm text-muted-foreground">
            Add areas of expertise displayed on the physician profile.
          </p>
        </div>

        <Button
          type="button"
          className="bg-purple-600 text-white hover:bg-purple-700"
          onClick={addExpertise}
        >
          <Plus className="mr-2 size-4" />
          Add Expertise
        </Button>
      </div>

      {/* Empty state */}
      {fields.length === 0 && (
        <Card className="flex flex-col items-center justify-center gap-3 border-dashed p-8 text-center">
          <Stethoscope className="size-10 text-muted-foreground" />

          <div>
            <p className="font-medium">No expertise added</p>

            <p className="text-sm text-muted-foreground">
              Add an area of expertise to display on the physician profile.
            </p>
          </div>

          <Button
            type="button"
            onClick={addExpertise}
            className="bg-purple-600 text-white hover:bg-purple-700"
          >
            <Plus className="mr-2 size-4" />
            Add Expertise
          </Button>
        </Card>
      )}

      {/* Expertise cards */}
      {fields.map((field, index) => (
        <ExpertiseCard
          key={field.id}
          control={control}
          field={field}
          index={index}
          register={register}
          setValue={setValue}
          remove={remove}
          error={errors?.expertise?.[index]}
        />
      ))}

      {/* Add another */}
      {fields.length > 0 && (
        <div className="flex justify-end">
          <Button
            type="button"
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={addExpertise}
          >
            <Plus className="mr-2 size-4" />
            Add Another Expertise
          </Button>
        </div>
      )}
    </div>
  );
}
