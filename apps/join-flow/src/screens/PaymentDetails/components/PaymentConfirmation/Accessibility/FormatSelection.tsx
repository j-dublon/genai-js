import { Radio } from "@react-component-library/ui";
import { Control, Controller, FieldErrors } from "react-hook-form";

import { AccessibilityCommunicationPreferencesFormData } from "@/validation/join-flow-schema";

type FormatPreferences = {
  audio?: boolean;
  braille?: boolean;
  largePrint?: boolean;
};

type FormatRadioOption = {
  label: string;
  name: string;
};

interface FormatSelectionProps {
  control: Control<AccessibilityCommunicationPreferencesFormData>;
  errors: FieldErrors<AccessibilityCommunicationPreferencesFormData>;
  formatRadioOptions: FormatRadioOption[];
  formatDescription: string;
}

const getSelectedRadioValue = (
  formatRadioOptions: FormatRadioOption[],
  contactPreferences?: FormatPreferences,
): string => {
  if (!contactPreferences) return "";
  const selectedOption = formatRadioOptions.find(
    (option) =>
      contactPreferences[option.name as keyof FormatPreferences] === true,
  );
  return selectedOption ? selectedOption.name : "";
};

export const FormatSelection = ({
  control,
  errors,
  formatRadioOptions,
  formatDescription,
}: FormatSelectionProps) => {
  return (
    <Controller
      name="contactPreferences"
      control={control}
      render={({ field }) => {
        const currentValue = getSelectedRadioValue(
          formatRadioOptions,
          field.value,
        );
        return (
          <>
            <p className="text-xs md:text-sm">{formatDescription}</p>
            <div className="flex flex-col gap-2">
              {formatRadioOptions.map(({ label, name }) => (
                <Radio
                  key={name}
                  label={label}
                  value={name}
                  checked={currentValue === name}
                  onChange={() => {
                    const newContactPreferences: FormatPreferences = {
                      audio: false,
                      braille: false,
                      largePrint: false,
                      [name]: true,
                    };
                    field.onChange(newContactPreferences);
                  }}
                  labelClassName="text-core-black"
                />
              ))}
              {errors.contactPreferences && (
                <div className="text-ui-error text-xs md:text-sm mt-1">
                  {errors.contactPreferences.message}
                </div>
              )}
            </div>
          </>
        );
      }}
    />
  );
};
