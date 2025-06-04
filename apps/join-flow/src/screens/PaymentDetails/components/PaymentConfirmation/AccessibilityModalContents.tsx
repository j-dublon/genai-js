"use client";

import { Button, Checkbox } from "@react-component-library/ui";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import useJoinFlowStore from "@/store/useJoinFlowStore";
import { AccessibilityRequirements } from "@/store/useJoinFlowStore";

import { accessibilityModalText } from "./AccessibilityModalProps";

export const AccessibilityModalContents = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  const { accessibilityRequirements, setAccessibilityRequirements } =
    useJoinFlowStore();

  const { handleSubmit, control, setValue, watch, reset } =
    useForm<AccessibilityRequirements>({
      defaultValues: {
        visionImpaired: false,
        hearingImpaired: false,
        neurodiverse: false,
        learningDisability: false,
        thirdPartyAssistance: false,
        thirdPartyName: "",
        thirdPartyPhone: "",
        thirdPartyEmail: "",
        physicalIllness: false,
        physicalDisability: false,
        communicationNeeds: false,
        mentalIllness: false,
        additionalInformation: "",
      },
    });

  useEffect(() => {
    if (accessibilityRequirements) {
      Object.entries(accessibilityRequirements).forEach(([key, value]) => {
        setValue(key as keyof AccessibilityRequirements, value);
      });
    }
  }, [accessibilityRequirements, setValue]);

  const {
    resetButtonText,
    submitButtonText,
    accessibilityCheckboxes,
    additionalInformationLabel,
    additionalInformationPlaceholder,
  } = accessibilityModalText;

  const thirdPartyAssistance = watch("thirdPartyAssistance");

  const handleFormSubmit = (data: AccessibilityRequirements) => {
    if (data.thirdPartyAssistance && !data.thirdPartyName) {
      return;
    }

    // Filter out false checkboxes and empty strings
    const changedData = Object.fromEntries(
      Object.entries(data).filter(
        ([, value]) =>
          value === true || (typeof value === "string" && value.length > 0),
      ),
    ) as AccessibilityRequirements;

    // if no changed data, set requirements to null, else update store with new requirements
    const dataToUpdate =
      Object.keys(changedData).length === 0 ? null : changedData;
    setAccessibilityRequirements(dataToUpdate);
    closeModal();
  };

  return (
    <form
      id="accessibility-form"
      onSubmit={handleSubmit(handleFormSubmit)}
      className="p-4 md:p-6 bg-ui-grey-100 rounded-md md:rounded-sm flex flex-col gap-4 md:gap-6 mt-6 md:mt-8"
    >
      {accessibilityCheckboxes.map(({ label, name, moreDetails }) => {
        return (
          <div key={name}>
            <Controller
              name={name as keyof AccessibilityRequirements}
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
                {moreDetails?.map(({ name, placeholder, error }) => {
                  const getInputType = (fieldName: string) => {
                    if (fieldName.includes("email")) return "email";
                    if (fieldName.includes("phone")) return "tel";
                    return "text";
                  };

                  const isRequired =
                    name === "thirdPartyName" && thirdPartyAssistance;

                  return (
                    <Controller
                      key={name}
                      name={name as keyof AccessibilityRequirements}
                      control={control}
                      rules={{
                        required: isRequired ? error : false,
                      }}
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
                          {error && thirdPartyAssistance && (
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
          onClick={() => {
            setAccessibilityRequirements(null);
            closeModal();
            reset();
          }}
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
