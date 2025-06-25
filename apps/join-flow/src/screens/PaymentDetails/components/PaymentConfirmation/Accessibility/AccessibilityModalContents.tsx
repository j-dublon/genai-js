"use client";

import { Button, Checkbox } from "@react-component-library/ui";
import {
  Control,
  Controller,
  UseFormHandleSubmit,
  UseFormSetValue,
} from "react-hook-form";

import { AccessibilityRequirementsFormData } from "@/validation/join-flow-schema";

import { accessibilityModalText } from "./AccessibilityProps";

interface AccessibilityModalContentsProps {
  control: Control<AccessibilityRequirementsFormData>;
  handleSubmit: UseFormHandleSubmit<AccessibilityRequirementsFormData>;
  setValue: UseFormSetValue<AccessibilityRequirementsFormData>;
  onSubmit: (data: AccessibilityRequirementsFormData) => void;
  onClear: () => void;
}

export const AccessibilityModalContents = ({
  control,
  handleSubmit,
  setValue,
  onSubmit,
  onClear,
}: AccessibilityModalContentsProps) => {
  const {
    resetButtonText,
    submitButtonText,
    accessibilityCheckboxes,
    additionalInformationLabel,
    additionalInformationPlaceholder,
  } = accessibilityModalText;

  return (
    <form
      id="accessibility-form"
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 md:p-6 bg-ui-grey-100 rounded-md md:rounded-sm flex flex-col gap-4 md:gap-6 mt-6 md:mt-8"
    >
      {accessibilityCheckboxes.map(({ label, name, moreDetails }) => {
        return (
          <div key={name}>
            <Controller
              name={name as keyof AccessibilityRequirementsFormData}
              control={control}
              render={({ field }) => (
                <Checkbox
                  label={label}
                  value={name}
                  checked={Boolean(field.value)}
                  onChange={(checked) => field.onChange(checked)}
                />
              )}
            />
            {name === "thirdPartyAssistance" && (
              <div className="flex flex-col gap-4 mt-4 md:mt-6">
                {moreDetails?.map(({ name, placeholder }) => {
                  const getInputType = (fieldName: string) => {
                    if (fieldName.includes("email")) return "email";
                    if (fieldName.includes("phone")) return "tel";
                    return "text";
                  };

                  return (
                    <Controller
                      key={name}
                      name={name as keyof AccessibilityRequirementsFormData}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <div className="flex flex-col gap-1">
                          <input
                            {...field}
                            type={getInputType(name)}
                            placeholder={placeholder}
                            className={`w-full md:max-w-[480px] py-2 px-4 md:py-4 border-1 ${
                              error ? "border-red-500" : "border-ui-grey-400"
                            } rounded-xs bg-core-white placeholder:text-ui-grey-500 placeholder:text-xs md:placeholder:text-sm`}
                            value={field.value?.toString() ?? ""}
                            onChange={(e) => {
                              field.onChange(e);
                              if (e.target.value) {
                                setValue("thirdPartyAssistance", true);
                              }
                            }}
                          />
                          {error && (
                            <span className="text-ui-error text-xs">
                              {error.message}
                            </span>
                          )}
                        </div>
                      )}
                    />
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
      <p className="text-xs md:text-sm leading-[1.6] font-semibold">
        {additionalInformationLabel}
      </p>
      <Controller
        name="additionalInformation"
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            className="bg-core-white w-full md:max-w-[480px] p-4 border-1 border-ui-grey-400 rounded-xs h-auto min-h-[130px] md:min-h-[120px] resize-y scrollbar-none placeholder:text-ui-grey-400 placeholder:text-xs md:placeholder:text-sm"
            placeholder={additionalInformationPlaceholder}
          />
        )}
      />
      <div className="flex md:justify-end gap-4 flex-col md:flex-row">
        <Button
          size="small"
          variant="outline"
          tint="white"
          aria-label="Clear requirements"
          className="w-full md:w-auto"
          type="button"
          onClick={onClear}
        >
          {resetButtonText}
        </Button>
        <Button
          type="submit"
          size="small"
          variant="solid"
          tint="yellow"
          aria-label="Save my requirements"
          className="w-full md:w-auto"
        >
          {submitButtonText}
        </Button>
      </div>
    </form>
  );
};
