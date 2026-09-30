'use client';

import {
  Plus,
  Trash2,
  Building2,
} from 'lucide-react';

import {
  useFieldArray,
  type Control,
  type FieldArrayWithId,
  type UseFormRegister,
} from 'react-hook-form';

import type { PhysicianSectionFormInput } from '@/lib/validations/physician-section';
import {
  heroFactIcons,
  type HeroFact,
} from '@/lib/types/hero-fact';

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

// Types
interface HeroFactEditorProps {
  control: Control<PhysicianSectionFormInput>;
  register: UseFormRegister<PhysicianSectionFormInput>;
  errors?: any;
}

// Hero Fact Editor
// use seFieldArray because heroFacts contains objects (icon, title, subtitle), just like expertise contains objects
export function HeroFactEditor({
  control,
  register,
  errors,
}: HeroFactEditorProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'heroFacts',
  });

  function addHeroFact() {
    if (fields.length >= 3) return;

    const newFact: HeroFact = {
      icon: 'building-2',
      title: '',
      subtitle: '',
    };

    append(newFact);
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Hero Facts</h3>

          <p className="text-sm text-muted-foreground">
            Manage the key facts displayed below the homepage hero.
            Add up to three facts.
          </p>
        </div>

        <Button
          type="button"
          disabled={fields.length >= 3}
          className="bg-purple-600 text-white hover:bg-purple-700"
          onClick={addHeroFact}
        >
          <Plus className="mr-2 size-4" />
          Add Fact
        </Button>
      </div>

      {/* Empty State */}
      {fields.length === 0 && (
        <Card className="flex flex-col items-center justify-center gap-3 border-dashed p-8 text-center">
          <Building2 className="size-10 text-muted-foreground" />

          <div>
            <p className="font-medium">No hero facts added</p>

            <p className="text-sm text-muted-foreground">
              Add facts such as primary affiliation, training,
              or location.
            </p>
          </div>

          <Button
            type="button"
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={addHeroFact}
          >
            <Plus className="mr-2 size-4" />
            Add Hero Fact
          </Button>
        </Card>
      )}

      {/* Hero Fact Cards */}
      {fields.map((field, index) => (
        <HeroFactCard
          key={field.id}
          field={field}
          index={index}
          register={register}
          remove={remove}
          error={errors?.heroFacts?.[index]}
        />
      ))}

      {/* Add Another */}
      {fields.length > 0 && fields.length < 3 && (
        <div className="flex justify-end">
          <Button
            type="button"
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={addHeroFact}
          >
            <Plus className="mr-2 size-4" />
            Add Another Fact
          </Button>
        </div>
      )}

      {/* Supported Icons */}
      <p className="text-xs text-muted-foreground">
        Supported icons: {heroFactIcons.join(', ')}
      </p>
    </div>
  );
}

/* Hero Fact Card */
interface HeroFactCardProps {
  field: FieldArrayWithId<
    PhysicianSectionFormInput,
    'heroFacts',
    'id'
  >;
  index: number;
  register: UseFormRegister<PhysicianSectionFormInput>;
  remove: (index: number) => void;
  error?: any;
}

function HeroFactCard({
  index,
  register,
  remove,
  error,
}: HeroFactCardProps) {
  return (
    <Card
      className={cn(
        'rounded-xl border border-slate-200 p-5',
        index % 2 === 0 ? 'bg-white' : 'bg-slate-100',
      )}
    >
      {/* Card Header */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-semibold">
            {index + 1}
          </div>

          <div>
            <h4 className="font-semibold">
              Hero Fact {index + 1}
            </h4>

            <p className="text-xs text-muted-foreground">
              Icon, title, and supporting text
            </p>
          </div>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              aria-label={`Delete hero fact ${index + 1}`}
              onClick={() => remove(index)}
            >
              <Trash2 className="size-4" />
            </Button>
          </TooltipTrigger>

          <TooltipContent side="left">
            Delete hero fact
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="space-y-5">
        {/* Icon */}
        <Field>
          <FieldLabel>Icon Name</FieldLabel>

          <Input
            {...register(`heroFacts.${index}.icon`)}
            placeholder="building-2"
          />

          <FieldError>{error?.icon?.message}</FieldError>

          <p className="text-xs text-muted-foreground">
            Use one of the supported Lucide icon names listed below.
          </p>
        </Field>

        {/* Title */}
        <Field>
          <FieldLabel>Title</FieldLabel>

          <Input
            {...register(`heroFacts.${index}.title`)}
            placeholder="Maimonides Medical Center"
          />

          <FieldError>{error?.title?.message}</FieldError>
        </Field>

        {/* Subtitle */}
        <Field>
          <FieldLabel>Subtitle</FieldLabel>

          <Input
            {...register(`heroFacts.${index}.subtitle`)}
            placeholder="Primary Affiliation"
          />

          <FieldError>{error?.subtitle?.message}</FieldError>
        </Field>
      </div>
    </Card>
  );
}
