'use client';

import { useState } from 'react';

import { Plus, Stethoscope } from 'lucide-react';

import {
  type Control,
  type UseFormRegister,
  type UseFormSetValue,
  useFieldArray,
} from 'react-hook-form';

import type { PhysicianProfileFormInput } from '@/lib/validations/physician-profile';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { ExpertiseCard } from '@/components/profile/expertise-card';

// Types
interface ExpertiseEditorProps {
  control: Control<PhysicianProfileFormInput>;
  register: UseFormRegister<PhysicianProfileFormInput>;
  setValue: UseFormSetValue<PhysicianProfileFormInput>;
  errors?: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Expertise Editor
export function ExpertiseEditor({
  control,
  register,
  setValue,
  errors,
  open,
  onOpenChange,
}: ExpertiseEditorProps) {
  //   const [openItems, setOpenItems] = useState<string[]>([]);

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

    // Automatically expand the Expertise section.
    // setOpenItems((current) =>
    //   current.includes('expertise') ? current : [...current, 'expertise'],
    // );
    // Open Clinics and automatically close the previously open section.
    onOpenChange(true);
  }

  return (
    <Accordion
      type="single"
      collapsible
      value={open ? 'expertise' : ''}
      onValueChange={(value) => onOpenChange(value === 'expertise')}
      className="w-full"
    >
      <AccordionItem value="expertise" className="border-0">
        {/* Section heading */}
        <div className="flex min-w-0 items-center gap-4">
          <AccordionTrigger className="min-w-0 flex-1 justify-start gap-3 py-3 text-left hover:no-underline">
            <Stethoscope className="size-5 shrink-0" />

            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold">Expertises</h3>

              <p className="text-sm font-normal text-muted-foreground">
                Add areas of medical expertise displayed on the physician
                website.
              </p>
            </div>

            <span className="relative -top-2 shrink-0 rounded-md bg-muted px-2 py-1 text-xs font-semibold tabular-nums">
              {fields.length}
            </span>
          </AccordionTrigger>

          {/* Outside AccordionTrigger so Add doesn't toggle it */}
          <Button
            type="button"
            className="w-36 shrink-0 justify-center bg-purple-600 text-white hover:bg-purple-700"
            onClick={addExpertise}
          >
            <Plus className="mr-2 size-4" />
            Add Expertise
          </Button>
        </div>

        <AccordionContent className="overflow-visible">
          <div className="min-w-0 space-y-4 overflow-visible pt-3">
            {fields.length === 0 ? (
              <Card className="flex flex-col items-center justify-center gap-3 border-dashed p-8 text-center">
                <Stethoscope className="size-10 text-muted-foreground" />

                <div>
                  <p className="font-medium">No expertise added</p>

                  <p className="text-sm text-muted-foreground">
                    Add an area of expertise to display on the physician
                    website.
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
            ) : (
              <>
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
              </>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
