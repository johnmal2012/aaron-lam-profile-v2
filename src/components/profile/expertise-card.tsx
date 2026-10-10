import {
  Control,
  FieldArrayWithId,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form';
import { Trash2 } from 'lucide-react';
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
import { EditorImageUpload } from '@/components/profile/editor-image-upload';

/* Expertise Card */
interface ExpertiseCardProps {
  control: Control<PhysicianProfileFormInput>;
  field: FieldArrayWithId<PhysicianProfileFormInput, 'expertise', 'id'>;
  index: number;
  register: UseFormRegister<PhysicianProfileFormInput>;
  setValue: UseFormSetValue<PhysicianProfileFormInput>;
  remove: (index: number) => void;
  error?: any;
}

export function ExpertiseCard({
  control,
  index,
  register,
  setValue,
  remove,
  error,
}: ExpertiseCardProps) {
  // useWatch keeps the thumbnail synchronized with React Hook Form
  // setValue() changes the form value after UploadThing finishes, and useWatch() causes this component to re-render with the newly uploaded image
  const image = useWatch({
    control,
    name: `expertise.${index}.image`,
  });

  const expertiseText = useWatch({
    control,
    name: `expertise.${index}.text`,
  });

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
            <h4 className="font-semibold">Expertise {index + 1}</h4>

            <p className="text-xs text-muted-foreground">
              Expertise information and image
            </p>
          </div>
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

          <TooltipContent side="left">Delete expertise</TooltipContent>
        </Tooltip>
      </div>

      <div className="space-y-5">
        {/* Expertise text */}
        <Field>
          <FieldLabel>Expertise</FieldLabel>

          <Input
            // register() is used to connect an individual input to React Hook Form, and the name is dynamically generated based on the index of the expertise in the array
            {...register(`expertise.${index}.text`)}
            placeholder="Sports Injuries"
          />

          <FieldError>{error?.text?.message}</FieldError>
        </Field>

        {/* URL */}
        <Field>
          <FieldLabel>URL</FieldLabel>

          <Input
            {...register(`expertise.${index}.url`)}
            placeholder="https://example.com/sports-injuries"
          />

          <FieldError>{error?.url?.message}</FieldError>
        </Field>

        {/* Expertise image */}
        <Field>
          <FieldLabel>Expertise Image</FieldLabel>

          <EditorImageUpload
            image={image}
            imageAlt={expertiseText || `Expertise ${index + 1} image`}
            index={index}
            setValue={setValue}
            imageField={`expertise.${index}.image`}
            imageKeyField={`expertise.${index}.imageKey`}
            endpoint="expertiseImage"
            theme="purple"
            previewSize="small"
            toastLabel="Expertise"
            description="Upload an image for this expertise. Maximum size: 2 MB."
          />

          <FieldError>{error?.image?.message}</FieldError>
        </Field>
      </div>
    </Card>
  );
}
