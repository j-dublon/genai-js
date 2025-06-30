"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  InfoModal,
  useClickOutside,
} from "@react-component-library/ui";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { useClearFocus } from "@/hooks/useClearFocus";
import { filterTrueBooleans, filterTrueValues } from "@/lib/filterTrueValues";
import useJoinFlowStore, {
  AccessibilityRequirements as AccessibilityRequirementsType,
} from "@/store/useJoinFlowStore";
import {
  AccessibilityRequirementsFormData,
  accessibilityRequirementsSchema,
} from "@/validation/join-flow-schema";

import { AccessibilityModalContents } from "./AccessibilityModalContents";
import { accessibilityModalText } from "./AccessibilityProps";
import { CommunicationRequirements } from "./CommunicationRequirements";

export const AccessibilityRequirements = () => {
  const {
    accessibilityRequirementsTitle,
    accessibilityRequirementsDescription,
    accessibilityRequirementsCheckboxText,
    accessibilityRequirementsModalTitle,
  } = accessibilityModalText;

  const {
    accessibilityRequirements,
    setAccessibilityRequirements,
    setAccessibilityCommunicationPreferences,
  } = useJoinFlowStore();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { handleSubmit, control, setValue, reset, watch } =
    useForm<AccessibilityRequirementsFormData>({
      resolver: zodResolver(accessibilityRequirementsSchema),
      defaultValues: {
        blindVisionImpaired: false,
        deafOrHardOfHearing: false,
        neurodivergent: false,
        learningDisability: false,
        thirdPartyAssistance: false,
        thirdPartyName: "",
        thirdPartyPhone: "",
        thirdPartyEmail: "",
        physicalIllness: false,
        physicalDisability: false,
        communicationDifficulties: false,
        otherIllness: false,
        additionalInformation: "",
      },
    });

  useEffect(() => {
    if (accessibilityRequirements) {
      Object.entries(accessibilityRequirements).forEach(([key, value]) => {
        setValue(key as keyof AccessibilityRequirementsType, value);
      });
    }
  }, [accessibilityRequirements, setValue]);

  const thirdPartyAssistance = watch("thirdPartyAssistance");

  useEffect(() => {
    if (!thirdPartyAssistance) {
      setValue("thirdPartyName", "");
      setValue("thirdPartyPhone", "");
      setValue("thirdPartyEmail", "");
    }
  }, [thirdPartyAssistance, setValue]);

  useClearFocus(modalRef, "close");

  const closeFunction = () => {
    if (modalRef.current) {
      modalRef.current.close();
      setIsModalOpen(false);
    }
  };

  useClickOutside(modalRef, isModalOpen, closeFunction);

  const handleCheckboxChange = () => {
    const isCurrentlyChecked = accessibilityRequirements !== null;

    if (isCurrentlyChecked) {
      setAccessibilityRequirements(null);
      reset();
    } else {
      modalRef.current?.showModal();
      setIsModalOpen(true);
    }
  };

  const handleFormSubmit = (data: AccessibilityRequirementsFormData) => {
    // Filter out false checkboxes and empty strings
    const changedData = filterTrueValues<AccessibilityRequirementsType>(data);

    // if no changed data, set requirements to null, else update store with new requirements
    const dataToUpdate =
      Object.keys(changedData).length === 0 ? null : changedData;
    setAccessibilityRequirements(dataToUpdate);
    closeFunction();
  };

  const handleClearRequirements = () => {
    setAccessibilityRequirements(null);
    setAccessibilityCommunicationPreferences(null);
    closeFunction();
    reset();
  };

  const getSelectedRequirements = () => {
    if (!accessibilityRequirements) return [];

    const trueBooleanRequirements = filterTrueBooleans(
      accessibilityRequirements,
    );
    const booleanRequirements = Object.keys(trueBooleanRequirements).map(
      (key) => {
        const checkboxConfig =
          accessibilityModalText.accessibilityCheckboxes.find(
            (checkbox) => checkbox.name === key,
          );
        return checkboxConfig?.label || key;
      },
    );

    const additionalInfo = accessibilityRequirements.additionalInformation;
    if (additionalInfo && additionalInfo.trim().length > 0) {
      booleanRequirements.push("Additional information provided");
    }

    return booleanRequirements;
  };

  return (
    <div className="bg-ui-grey-100 p-6 rounded-md flex flex-col gap-4 md:gap-6">
      <p className="text-md font-semibold">{accessibilityRequirementsTitle}</p>
      <p className="text-sm">{accessibilityRequirementsDescription}</p>
      <Checkbox
        label={accessibilityRequirementsCheckboxText}
        value="accessibilityRequirements"
        checked={accessibilityRequirements !== null}
        onChange={handleCheckboxChange}
        labelClassName="text-sm font-medium leading-[1.6] text-core-black"
      />
      {accessibilityRequirements && (
        <>
          <div className="bg-core-white p-4 md:p-6 rounded-md md:rounded-sm flex flex-col gap-2">
            <h3 className="text-xs md:text-sm font-semibold leading-[1.6]">
              Your requirements
            </h3>
            {getSelectedRequirements().map((requirementText, index) => (
              <p key={index} className="text-xs md:text-sm">
                {requirementText}
              </p>
            ))}
            <Button
              type="button"
              size="medium"
              variant="solid"
              tint="yellow"
              className="mt-4 w-full md:w-fit md:text-sm"
              onClick={() => {
                modalRef.current?.showModal();
                setIsModalOpen(true);
              }}
            >
              Edit my requirements
            </Button>
          </div>
          <CommunicationRequirements />
        </>
      )}

      <InfoModal
        title={accessibilityRequirementsModalTitle}
        titleStyling="md:text-md max-w-[500px]"
        modalRef={modalRef}
      >
        <AccessibilityModalContents
          control={control}
          handleSubmit={handleSubmit}
          setValue={setValue}
          onSubmit={handleFormSubmit}
          onClear={handleClearRequirements}
        />
      </InfoModal>
    </div>
  );
};
