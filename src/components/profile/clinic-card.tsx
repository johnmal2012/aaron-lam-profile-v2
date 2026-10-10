'use client';

import { Trash2 } from 'lucide-react';

import {
  type FieldArrayWithId,
  type UseFieldArrayRemove,
  type UseFormRegister,
} from 'react-hook-form';

import type { PhysicianProfileFormInput } from '@/lib/validations/physician-profile';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';

interface ClinicCardProps {
  field: FieldArrayWithId<PhysicianProfileFormInput, 'clinics', 'id'>;
  index: number;
  register: UseFormRegister<PhysicianProfileFormInput>;
  remove: UseFieldArrayRemove;
  errors?: any;
}

export function ClinicCard({
  index,
  register,
  remove,
  errors,
}: ClinicCardProps) {
  return (
    <Card
      className={cn(
        'rounded-xl border border-slate-200 p-5',
        index % 2 === 0 ? 'bg-white' : 'bg-slate-100',
      )}
    >
      {/* Card header */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-semibold">
            {index + 1}
          </div>

          <div>
            <h4 className="font-semibold">Clinic {index + 1}</h4>

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
        {/* Clinic name */}
        <Field>
          <FieldLabel>Clinic Name</FieldLabel>

          <Input
            {...register(`clinics.${index}.name`)}
            placeholder="Maimonides Bone and Joint Center"
          />

          <FieldError>{errors?.name?.message}</FieldError>
        </Field>

        {/* Address */}
        <Field>
          <FieldLabel>Address</FieldLabel>

          <Input
            {...register(`clinics.${index}.address`)}
            placeholder="6010 Bay Parkway, Brooklyn, NY 11204"
          />

          <FieldError>{errors?.address?.message}</FieldError>
        </Field>

        {/* Coordinates */}
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

            <FieldError>{errors?.latitude?.message}</FieldError>
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

            <FieldError>{errors?.longitude?.message}</FieldError>
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
