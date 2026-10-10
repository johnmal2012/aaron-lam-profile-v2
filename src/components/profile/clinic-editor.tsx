'use client';

import { Plus, MapPin } from 'lucide-react';

import {
  type Control,
  type UseFormRegister,
  useFieldArray,
} from 'react-hook-form';

import { FieldError } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import type { PhysicianProfileFormInput } from '@/lib/validations/physician-profile';

import { ClinicCard } from '@/components/profile/clinic-card';

interface ClinicEditorProps {
  control: Control<PhysicianProfileFormInput>;
  register: UseFormRegister<PhysicianProfileFormInput>;
  errors?: any;
}

export function ClinicEditor({ control, register, errors }: ClinicEditorProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'clinics',
  });

  function addClinic() {
    append({
      name: '',
      address: '',
      latitude: undefined,
      longitude: undefined,
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Clinics</h3>

          <p className="text-sm text-muted-foreground">
            Add one or more clinic locations.
          </p>
        </div>

        <Button
          type="button"
          //   variant="outline"
          className="bg-green-600 hover:bg-green-700!"
          onClick={addClinic}
        >
          <Plus className="mr-2 size-4" />
          Add Clinic
        </Button>
      </div>

      {fields.length === 0 && (
        <Card className="p-6">
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <MapPin className="size-8 text-muted-foreground" />

            <div>
              <p className="font-medium">No clinics added</p>

              <p className="text-sm text-muted-foreground">
                Add your first clinic location.
              </p>
            </div>

            <Button type="button" onClick={addClinic}>
              <Plus className="mr-2 size-4" />
              Add Clinic
            </Button>
          </div>
        </Card>
      )}

      {fields.map((field, index) => (
        <ClinicCard
          key={field.id}
          field={field}
          index={index}
          register={register}
          remove={remove}
          errors={errors?.clinics?.[index]}
        //   total={fields.length}
        />
      ))}

      {fields.length > 0 && (
        <div className="flex justify-end">
          <Button
            type="button"
            className="bg-green-600 hover:bg-green-700!"
            onClick={addClinic}
          >
            <Plus className="mr-2 size-4" />
            Add Another Clinic
          </Button>
        </div>
      )}
    </div>
  );
}
