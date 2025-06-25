import { Checkbox } from "@react-component-library/ui";
import { Control, Controller, FieldErrors } from "react-hook-form";

import { AccessibilityCommunicationPreferencesFormData } from "@/validation/join-flow-schema";

type DocumentCheckbox = {
  label: string;
  name: string;
};

interface DocumentSelectionProps {
  control: Control<AccessibilityCommunicationPreferencesFormData>;
  errors: FieldErrors<AccessibilityCommunicationPreferencesFormData>;
  documentCheckboxes: DocumentCheckbox[];
  documentCheckboxesTitle: string;
}

export const DocumentSelection = ({
  control,
  errors,
  documentCheckboxes,
  documentCheckboxesTitle,
}: DocumentSelectionProps) => {
  return (
    <>
      <h3 className="text-xs md:text-sm font-semibold leading-[1.6]">
        {documentCheckboxesTitle}
      </h3>
      {documentCheckboxes.map(({ label, name }) => {
        return (
          <div key={name}>
            <Controller
              name={
                `contentTypes.${name}` as keyof AccessibilityCommunicationPreferencesFormData
              }
              control={control}
              render={({ field }) => (
                <Checkbox
                  label={label}
                  value={name}
                  checked={Boolean(field.value)}
                  onChange={(checked) => field.onChange(checked)}
                  labelClassName="text-core-black"
                />
              )}
            />
          </div>
        );
      })}
      {errors.contentTypes && (
        <div className="text-ui-error text-xs md:text-sm mt-1">
          {errors.contentTypes.message}
        </div>
      )}
    </>
  );
};
