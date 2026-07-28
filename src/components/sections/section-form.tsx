'use client';

import { useRouter } from 'next/navigation';
// Form
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// Database
import { physicianSections } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
// Actions
import {
  createPhysicianSection,
  updatePhysicianSection,
} from '@/actions/section/physician-section-actions';
// UI
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';
// Validation
import {
  PhysicianSectionFormInput,
  physicianSectionUpdateSchema,
} from '@/lib/validations/physician-section';
// Utils
import { cn, getCardBackground } from '@/lib/utils';
// const
import { SectionField } from '@/components/sections/section-form-field';
// Misc
import { toast } from 'sonner';
import { getSectionDefaultValues } from './section-default-values';
import { sectionFormFields } from '@/lib/sections/section-form-fields';

type SectionFormProps = {
  section?: Section;
};

type Section = InferSelectModel<typeof physicianSections>;

export default function SectionForm({ section }: SectionFormProps) {
  const router = useRouter();

  const form = useForm<PhysicianSectionFormInput>({
    resolver: zodResolver(physicianSectionUpdateSchema),
    defaultValues: getSectionDefaultValues(section),
  });

  async function onFormSubmit(values: PhysicianSectionFormInput) {
    try {
      const { error } = section
        ? await updatePhysicianSection(section.id, values)
        : await createPhysicianSection(values);

      if (error) {
        toast.error(error);
        return;
      }
      toast.success('Section created/updated successfully');

      router.push('/sections');
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
      console.error(err);
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6 md:p-8">
          {/* Header */}
          <div className="mb-8 space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Edit Section</h1>

            <p className="text-sm text-muted-foreground">
              Update physician section content, metadata, and display order.
            </p>
          </div>

          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-6"
            noValidate
          >
            <FieldGroup className="space-y-4">
              {sectionFormFields.map((field, index) => (
                <Field
                  key={field.id}
                  className={cn('rounded-lg p-4', getCardBackground(index, 1))} // one-column form if size > md:
                >
                  <SectionField field={field} form={form} />
                </Field>
              ))}
            </FieldGroup>
            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                disabled={form.formState.isSubmitting}
                className="h-10 px-4 w-28 bg-green-600! hover:bg-green-700!"
              >
                {section ? 'Update' : 'Create'}
              </Button>

              <Button
                type="button"
                className="h-10 w-24"
                variant="outline"
                onClick={() => router.push('/sections')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
