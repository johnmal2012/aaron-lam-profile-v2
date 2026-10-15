'use client';
import { UserRound } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FieldGroup } from '@/components/ui/field';

import { cn, getCardBackground } from '@/lib/utils';
import { profileFormFields } from '@/lib/profile/profile-form-fields';
import { ProfileFormField } from '@/components/profile/profile-form-field';

import type { UseFormReturn } from 'react-hook-form';
import type { PhysicianProfileFormInput } from '@/lib/validations/physician-profile';

interface BasicInformationEditorProps {
  form: UseFormReturn<PhysicianProfileFormInput>;
  userName?: string | null;
  userImage?: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BasicInformationEditor({
  form,
  userName,
  userImage,
  open,
  onOpenChange,
}: BasicInformationEditorProps) {
  return (
    <Accordion
      type="single"
      collapsible
      value={open ? 'basic-info' : ''}
      onValueChange={(value) =>
        onOpenChange(value === 'basic-info')
      }
      className="w-full"
    >
      <AccordionItem value="basic-info" className="border-0">
        <AccordionTrigger className="min-w-0 justify-start gap-3 py-3 text-left hover:no-underline">
          <UserRound className="mt-1 size-5 shrink-0" />

          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold">
              Basic Information
            </h2>

            <p className="mt-1 text-sm font-normal text-muted-foreground">
              Manage the physician's photo, contact details, specialties,
              title, and website links.
            </p>
          </div>
        </AccordionTrigger>

        <AccordionContent className="overflow-visible">
          <FieldGroup className="grid min-w-0 gap-4 pt-3 md:grid-cols-2">
            {profileFormFields.map((field, index) => (
              <div
                key={field.id}
                className={cn(
                  'min-w-0 rounded-lg p-4',
                  getCardBackground(index),
                )}
              >
                <ProfileFormField
                  field={field}
                  form={form}
                  userName={userName}
                  userImage={userImage}
                />
              </div>
            ))}
          </FieldGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
