'use client';

import { Plus, Trash2, MapPin } from 'lucide-react';

import {
  Control,
  FieldArrayWithId,
  UseFormRegister,
  useFieldArray,
} from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import type { PhysicianProfileFormInput } from '@/lib/validations/physician-profile';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

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
      latitude: 0,
      longitude: 0,
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
          total={fields.length}
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

/* ---------------------------------------------------------------- */
/* Clinic Card                                                      */
/* ---------------------------------------------------------------- */

interface ClinicCardProps {
  field: FieldArrayWithId<PhysicianProfileFormInput, 'clinics', 'id'>;

  index: number;

  register: UseFormRegister<PhysicianProfileFormInput>;

  remove: (index: number) => void;

  errors?: any;

  total: number;
}
function ClinicCard({
  index,
  register,
  remove,
  errors,
  total,
}: ClinicCardProps) {
  return (
    <Card
      className={cn(
        'rounded-xl border border-slate-200 p-5',
        index % 2 === 0
          ? 'bg-white'
          : 'bg-slate-100',
      )}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-semibold">
            {index + 1}
          </div>

          <div>
            <h4 className="font-semibold">
              Clinic {index + 1}
            </h4>

            <p className="text-xs text-muted-foreground">
              Clinic location and map coordinates
            </p>
          </div>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              aria-label={`Delete clinic ${index + 1}`}
              onClick={() => remove(index)}
            >
              <Trash2 className="size-4" />
            </Button>
          </TooltipTrigger>

          <TooltipContent side="left">
            Delete clinic
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="space-y-5">
        <Field>
          <FieldLabel>Clinic Name</FieldLabel>

          <Input
            {...register(`clinics.${index}.name`)}
            placeholder="Maimonides Bone and Joint Center"
          />

          <FieldError>
            {errors?.name?.message}
          </FieldError>
        </Field>

        <Field>
          <FieldLabel>Address</FieldLabel>

          <Input
            {...register(`clinics.${index}.address`)}
            placeholder="6010 Bay Parkway, Brooklyn, NY 11204"
          />

          <FieldError>
            {errors?.address?.message}
          </FieldError>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel>Latitude</FieldLabel>

            <Input
              type="number"
              step="any"
              {...register(`clinics.${index}.latitude`, {
                valueAsNumber: true,
              })}
            />

            <FieldError>
              {errors?.latitude?.message}
            </FieldError>
          </Field>

          <Field>
            <FieldLabel>Longitude</FieldLabel>

            <Input
              type="number"
              step="any"
              {...register(`clinics.${index}.longitude`, {
                valueAsNumber: true,
              })}
            />

            <FieldError>
              {errors?.longitude?.message}
            </FieldError>
          </Field>
        </div>

        <p className="text-xs text-muted-foreground">
          Latitude must be between -90 and 90. Longitude must be
          between -180 and 180.
        </p>
      </div>
    </Card>
  );
}
