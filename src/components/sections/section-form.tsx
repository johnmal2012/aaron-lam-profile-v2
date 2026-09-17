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
import { getSectionDefaultValues } from '@/lib/sections/section-default-values';
import { sectionFormFields } from '@/lib/sections/section-form-fields';

type SectionFormProps = {
  section?: Section;
};

type Section = InferSelectModel<typeof physicianSections>;

export default function SectionForm({ section }: SectionFormProps) {
  const router = useRouter();

  // This state update is not urgent. Keep the UI responsive while you update it where some state updates may trigger expensive rendering
  // For server actions called from RHF, no need to  use useTransition
  //   const [isPending, startTransition] = useTransition();

  //   const [errors, setErrors] = useState<FormErrors>({});

  //   const [generalError, setGeneralError] = useState<string | null>(null);

  const form = useForm<PhysicianSectionFormInput>({
    resolver: zodResolver(physicianSectionUpdateSchema),
    defaultValues: getSectionDefaultValues(section),
  });

  // prev = arbitary name = the previous state that react calls your function and passes in the previous or most recent current state as the argument
  // square brackets = computed property name syntax, allows you to use the value stored in variable field as the property name; otherwise, javascript treats field as the literal property name, not the variable.
  //   function updateField(field: keyof SessionFormData, value: string | number) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [field]: value,
  //     }));
  //   }

  // useEffect(() => {
  //   if (!errors) return;

  //   const timer = setTimeout(() => {
  //     setErrors({});
  //     setGeneralError(null);
  //   }, 4000);

  //   return () => clearTimeout(timer);
  // }, [errors]);

  async function onFormSubmit(values: PhysicianSectionFormInput) {
    // TESTING:
    // Use an ID that does not exist in database
    // const testId = 999999;
    // console.log('Deleting section id:', testId);
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
                  className={cn('rounded-lg p-4', getCardBackground(index))} // one-column form if size > md:
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
