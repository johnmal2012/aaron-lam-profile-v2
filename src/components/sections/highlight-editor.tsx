
'use client';

import { useWatch, type Control, type UseFormRegister, type UseFormSetValue } from 'react-hook-form';
import { Plus, Trash2, Lightbulb } from 'lucide-react';

import type { PhysicianSectionFormInput } from '@/lib/validations/physician-section';
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

interface HighlightEditorProps {
  control: Control<PhysicianSectionFormInput>;
  register: UseFormRegister<PhysicianSectionFormInput>;
  setValue: UseFormSetValue<PhysicianSectionFormInput>;
  errors?: any;
}

export function HighlightEditor({
  control,
  register,
  setValue,
  errors,
}: HighlightEditorProps) {
  const highlights =
    useWatch({
      control,
      name: 'highlights',
    }) ?? [];

  function addHighlight() {
    setValue('highlights', [...highlights, ''], {
      shouldDirty: true,
      shouldTouch: false,
      shouldValidate: false,
    });
  }

  function removeHighlight(index: number) {
    const updated = highlights.filter((_, i) => i !== index);

    setValue('highlights', updated, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">
            Research Highlights
          </h3>
          <p className="text-sm text-muted-foreground">
            Add the key areas or topics to display in the Research
            section.
          </p>
        </div>

        <Button
          type="button"
          className="bg-purple-600 text-white hover:bg-purple-700"
          onClick={addHighlight}
        >
          <Plus className="mr-2 size-4" />
          Add Highlight
        </Button>
      </div>

      {/* Empty State */}
      {highlights.length === 0 && (
        <Card className="flex flex-col items-center justify-center gap-3 border-dashed p-8 text-center">
          <Lightbulb className="size-10 text-muted-foreground" />
          <div>
            <p className="font-medium">No highlights added</p>
            <p className="text-sm text-muted-foreground">
              Add research topics or areas of focus.
            </p>
          </div>

          <Button
            type="button"
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={addHighlight}
          >
            <Plus className="mr-2 size-4" />
            Add Highlight
          </Button>
        </Card>
      )}

      {/* Highlight Cards */}
      {highlights.map((_, index) => (
        <HighlightCard
          key={`highlight-${index}`}
          index={index}
          register={register}
          remove={removeHighlight}
          error={errors?.highlights?.[index]}
        />
      ))}

      {/* Add Another */}
      {highlights.length > 0 && (
        <div className="flex justify-end">
          <Button
            type="button"
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={addHighlight}
          >
            <Plus className="mr-2 size-4" />
            Add Another Highlight
          </Button>
        </div>
      )}
    </div>
  );
}

interface HighlightCardProps {
  index: number;
  register: UseFormRegister<PhysicianSectionFormInput>;
  remove: (index: number) => void;
  error?: any;
}

function HighlightCard({
  index,
  register,
  remove,
  error,
}: HighlightCardProps) {
  return (
    <Card
      className={cn(
        'rounded-xl border border-slate-200 p-5',
        index % 2 === 0 ? 'bg-white' : 'bg-slate-100',
      )}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-semibold">
            {index + 1}
          </div>
          <div>
            <h4 className="font-semibold">
              Highlight {index + 1}
            </h4>
            <p className="text-xs text-muted-foreground">
              Research area or topic
            </p>
          </div>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              aria-label={`Delete highlight ${index + 1}`}
              onClick={() => remove(index)}
            >
              <Trash2 className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            Delete highlight
          </TooltipContent>
        </Tooltip>
      </div>

      <Field>
        <FieldLabel>Highlight</FieldLabel>
        <Input
          {...register(`highlights.${index}` as `highlights.${number}`)}
          placeholder="e.g. Reconstructive Techniques"
        />
        <FieldError>{error?.message}</FieldError>
      </Field>
    </Card>
  );
}
