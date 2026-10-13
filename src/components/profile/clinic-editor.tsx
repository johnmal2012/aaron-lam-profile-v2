'use client';
import { Plus, MapPin } from 'lucide-react';

import {
  type Control,
  type UseFormRegister,
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

import { ClinicCard } from '@/components/profile/clinic-card';

interface ClinicEditorProps {
  control: Control<PhysicianProfileFormInput>;
  register: UseFormRegister<PhysicianProfileFormInput>;
  errors?: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClinicEditor({
  control,
  register,
  errors,
  open,
  onOpenChange,
}: ClinicEditorProps) {
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
    // Open Clinics and automatically close the previously open section.
    onOpenChange(true);
  }

  return (
    <Accordion
      type="single"
      collapsible
      value={open ? 'clinics' : ''}
      onValueChange={(value) => onOpenChange(value === 'clinics')}
      className="w-full"
    >
      <AccordionItem value="clinics" className="border-0">
        {/* Section heading */}
        <div className="flex min-w-0 items-center gap-4">
          <AccordionTrigger className="min-w-0 flex-1 justify-start gap-3 py-3 text-left hover:no-underline">
            <MapPin className="size-5 shrink-0" />

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="min-w-0 text-lg font-semibold">
                  Clinics
                </h3>

                <span className="shrink-0 rounded-md bg-muted px-2 py-1 text-xs font-semibold tabular-nums">
                  {fields.length}
                </span>
              </div>

              <p className="text-sm font-normal text-muted-foreground">
                Add one or more clinic locations
              </p>
            </div>

            {/* <span className="shrink-0 rounded-md bg-muted px-2 py-1 text-xs font-semibold tabular-nums">
              {fields.length}
            </span> */}
          </AccordionTrigger>

          {/* Keep Add Clinic outside AccordionTrigger. */}
          <Button
            type="button"
            onClick={addClinic}
            // style={{
            //   width: '160px',
            //   minWidth: '160px',
            //   maxWidth: '160px',
            //   flex: '0 0 160px',
            // }}
            className="w-36 shrink-0 justify-center bg-green-600 text-white hover:bg-green-700"
          >
            <Plus className="mr-2 size-4" />
            Add Clinic
          </Button>
        </div>

        <AccordionContent className="overflow-visible">
          <div className="min-w-0 space-y-4 overflow-visible pt-3">
            {fields.length === 0 ? (
              <Card className="flex flex-col items-center justify-center gap-3 border-dashed p-8 text-center">
                <MapPin className="size-10 text-muted-foreground" />

                <div>
                  <p className="font-medium">No clinics added</p>

                  <p className="text-sm text-muted-foreground">
                    Add your first clinic location.
                  </p>
                </div>

                {/* <Button
                  type="button"
                  onClick={addClinic}
                  style={{
                    width: '160px',
                    minWidth: '160px',
                    flexShrink: 0,
                  }}
                  className="justify-center bg-green-600 text-white hover:bg-green-700"
                >
                  <Plus className="mr-2 size-4" />
                  Add Clinic
                </Button> */}
                <Button
                  type="button"
                  onClick={addClinic}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  <Plus className="mr-2 size-4" />
                  Add Clinic
                </Button>
              </Card>
            ) : (
              <>
                {fields.map((field, index) => (
                  <ClinicCard
                    key={field.id}
                    field={field}
                    index={index}
                    register={register}
                    remove={remove}
                    errors={errors?.clinics?.[index]}
                  />
                ))}

                <div className="flex justify-end">
                  <Button
                    type="button"
                    className="bg-green-600 text-white hover:bg-green-700"
                    onClick={addClinic}
                  >
                    <Plus className="mr-2 size-4" />
                    Add Another Clinic
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
