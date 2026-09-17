'use client';

import { Plus, Trash2, Stethoscope } from 'lucide-react';

import {
  Control,
  FieldArrayWithId,
  UseFormRegister,
  useFieldArray,
} from 'react-hook-form';

import type { PhysicianProfileFormInput } from '@/lib/validations/physician-profile';

import {
  Field,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ExpertiseEditorProps {
  control: Control<PhysicianProfileFormInput>;
  register: UseFormRegister<PhysicianProfileFormInput>;
  errors?: any;
}

export function ExpertiseEditor({
  control,
  register,
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
    });
  }

  return (
    <div className="space-y-4">
      {/* -------------------------------------------------------- */}
      {/* Header                                                   */}
      {/* -------------------------------------------------------- */}

      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Expertise</h3>

          <p className="text-sm text-muted-foreground">
            Add areas of expertise and their links.
          </p>
        </div>

        <Button
          type="button"
          className="bg-purple-600 hover:bg-purple-700!"
          onClick={addExpertise}
        >
          <Plus className="mr-2 size-4" />
          Add Expertise
        </Button>
      </div>

      {/* -------------------------------------------------------- */}
      {/* Empty State                                              */}
      {/* -------------------------------------------------------- */}

      {fields.length === 0 && (
        <Card className="bg-slate-100 p-6">
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <Stethoscope className="size-8 text-muted-foreground" />

            <div>
              <p className="font-medium">No expertise added</p>

              <p className="text-sm text-muted-foreground">
                Add an area of expertise.
              </p>
            </div>

            <Button
              type="button"
              className="bg-purple-600 hover:bg-purple-700!"
              onClick={addExpertise}
            >
              <Plus className="mr-2 size-4" />
              Add Expertise
            </Button>
          </div>
        </Card>
      )}

      {/* -------------------------------------------------------- */}
      {/* Expertise Cards                                          */}
      {/* -------------------------------------------------------- */}

      {fields.map((field, index) => (
        <ExpertiseCard
          key={field.id}
          field={field}
          index={index}
          register={register}
          remove={remove}
          errors={errors?.expertise?.[index]}
        />
      ))}

      {/* -------------------------------------------------------- */}
      {/* Add Another                                              */}
      {/* -------------------------------------------------------- */}

      {fields.length > 0 && (
        <div className="flex justify-end">
          <Button
            type="button"
            className="bg-purple-600 hover:bg-purple-700!"
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

/* ---------------------------------------------------------------- */
/* Expertise Card                                                   */
/* ---------------------------------------------------------------- */

interface ExpertiseCardProps {
  field: FieldArrayWithId<
    PhysicianProfileFormInput,
    'expertise',
    'id'
  >;

  index: number;

  register: UseFormRegister<PhysicianProfileFormInput>;

  remove: (index: number) => void;

  errors?: any;
}

function ExpertiseCard({
  field,
  index,
  register,
  remove,
  errors,
}: ExpertiseCardProps) {
  /*
   * Alternate the card background:
   *
   * Expertise 1 → bg-slate-100
   * Expertise 2 → bg-slate-200
   * Expertise 3 → bg-slate-100
   * Expertise 4 → bg-slate-200
   */

  const backgroundClass =
    index % 2 === 0
      ? 'bg-slate-100'
      : 'bg-slate-200';

  return (
    <Card
      className={`p-5 ${backgroundClass}`}
    >
      {/* ------------------------------------------------------ */}
      {/* Card Header                                             */}
      {/* ------------------------------------------------------ */}

      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-semibold">
            {index + 1}
          </div>

          <h4 className="font-semibold">
            Expertise {index + 1}
          </h4>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              aria-label={`Delete expertise ${index + 1}`}
              onClick={() => remove(index)}
            >
              <Trash2 className="size-4" />
            </Button>
          </TooltipTrigger>

          <TooltipContent side="left">
            Delete expertise
          </TooltipContent>
        </Tooltip>
      </div>

      {/* ------------------------------------------------------ */}
      {/* Fields                                                  */}
      {/* ------------------------------------------------------ */}

      <div className="space-y-5">
        {/* Expertise */}
        <Field>
          <FieldLabel>Expertise</FieldLabel>

          <Input
            {...register(`expertise.${index}.text`)}
            placeholder="Diabetic Foot Care"
            className="bg-white"
          />

          <FieldError>
            {errors?.text?.message}
          </FieldError>
        </Field>

        {/* URL */}
        <Field>
          <FieldLabel>URL</FieldLabel>

          <Input
            type="url"
            {...register(`expertise.${index}.url`)}
            placeholder="https://example.com/diabetic-foot-care"
            className="bg-white"
          />

          <FieldError>
            {errors?.url?.message}
          </FieldError>
        </Field>
      </div>
    </Card>
  );
}
