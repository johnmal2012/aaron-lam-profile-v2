'use client';

import { useRouter } from 'next/navigation';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { InferSelectModel } from 'drizzle-orm';
import { toast } from 'sonner';

import { physicianSections } from '@/db/schema';

import {
  createPhysicianSection,
  updatePhysicianSection,
} from '@/actions/section/physician-section-actions';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';

import { HighlightEditor } from '@/components/sections/highlight-editor';
import { HeroFactEditor } from '@/components/sections/hero-fact-editor';
import { SectionField } from '@/components/sections/section-form-field';

import {
  physicianSectionUpdateSchema,
  type PhysicianSectionFormInput,
} from '@/lib/validations/physician-section';

import { cn, getCardBackground } from '@/lib/utils';
import { getSectionDefaultValues } from '@/lib/sections/section-default-values';
import { sectionFormFields } from '@/lib/sections/section-form-fields';

type Section = InferSelectModel<typeof physicianSections>;

interface SectionFormProps {
  section?: Section;
}

export default function SectionForm({ section }: SectionFormProps) {
  const router = useRouter();

  // Initialize React Hook Form
  const form = useForm<PhysicianSectionFormInput>({
    resolver: zodResolver(physicianSectionUpdateSchema),
    defaultValues: getSectionDefaultValues(section),
  });

  // Watch section slug to render the appropriate JSONB editor
  const watchedSlug = form.watch('slug');
  const slug = watchedSlug?.trim() || section?.slug || '';

  const isExistingSection = Boolean(section);

  // Submit section data
  async function onFormSubmit(values: PhysicianSectionFormInput) {
    try {
      const result = section
        ? await updatePhysicianSection(section.id, values)
        : await createPhysicianSection(values);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success(
        section
          ? 'Section updated successfully'
          : 'Section created successfully',
      );

      router.push('/sections');
      router.refresh();
    } catch (error) {
      console.error('Section form submission failed:', error);
      toast.error('Something went wrong. Please try again.');
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6 md:p-8">
          <SectionFormHeader
            isExistingSection={isExistingSection}
          />

          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-6"
            noValidate
          >
            {/* Common Section Fields */}
            <FieldGroup className="space-y-4">
              {sectionFormFields.map((field, index) => (
                <Field
                  key={field.id}
                  className={cn(
                    'rounded-lg p-4',
                    getCardBackground(index),
                  )}
                >
                  <SectionField field={field} form={form} />
                </Field>
              ))}
            </FieldGroup>

            {/* Section-Specific JSONB Editors */}
            <SectionCustomFields
              slug={slug}
              form={form}
            />

            {/* Form Actions */}
            <SectionFormActions
              isSubmitting={form.formState.isSubmitting}
              isExistingSection={isExistingSection}
              onCancel={() => router.push('/sections')}
            />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// Form Header
interface SectionFormHeaderProps {
  isExistingSection: boolean;
}

function SectionFormHeader({
  isExistingSection,
}: SectionFormHeaderProps) {
  return (
    <div className="mb-8 space-y-2">
      <h1 className="text-3xl font-bold tracking-tight">
        {isExistingSection ? 'Edit Section' : 'Create Section'}
      </h1>

      <p className="text-sm text-muted-foreground">
        Update physician section content, metadata, and display order.
      </p>
    </div>
  );
}

// Section-Specific Editors
interface SectionCustomFieldsProps {
  slug: string;
  form: UseFormReturn<PhysicianSectionFormInput>;
}

function SectionCustomFields({
  slug,
  form,
}: SectionCustomFieldsProps) {
  // Hero Facts JSONB editor
  if (slug === 'home' || slug === 'hero') {
    return (
      <HeroFactEditor
        control={form.control}
        register={form.register}
        errors={form.formState.errors}
      />
    );
  }

  // Research Highlights JSONB editor
  if (slug === 'research') {
    return (
      <HighlightEditor
        control={form.control}
        register={form.register}
        setValue={form.setValue}
        errors={form.formState.errors}
      />
    );
  }

  return null;
}

// Form Actions
interface SectionFormActionsProps {
  isSubmitting: boolean;
  isExistingSection: boolean;
  onCancel: () => void;
}

function SectionFormActions({
  isSubmitting,
  isExistingSection,
  onCancel,
}: SectionFormActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 pt-2">
      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-10 w-28 bg-green-600! hover:bg-green-700!"
      >
        {isSubmitting
          ? 'Saving...'
          : isExistingSection
            ? 'Update'
            : 'Create'}
      </Button>

      <Button
        type="button"
        className="h-10 w-24"
        variant="outline"
        disabled={isSubmitting}
        onClick={onCancel}
      >
        Cancel
      </Button>
    </div>
  );
}
