import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox } from "@react-component-library/ui";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { filterTrueBooleans } from "@/lib/filterTrueValues";
import useJoinFlowStore, {
  AccessibilityCommunicationPreferences,
} from "@/store/useJoinFlowStore";
import {
  AccessibilityCommunicationPreferencesFormData,
  accessibilityCommunicationPreferencesSchema,
} from "@/validation/join-flow-schema";

import { accessibilityCommunicationPreferencesText } from "./AccessibilityProps";
import { DocumentSelection } from "./DocumentSelection";
import { FormatSelection } from "./FormatSelection";

function toFormContactPreferences(
  pref: { audio?: boolean; braille?: boolean; largePrint?: boolean } = {},
) {
  return {
    audio: !!pref.audio,
    braille: !!pref.braille,
    largePrint: !!pref.largePrint,
  };
}

export const CommunicationRequirements = () => {
  const {
    accessibilityCommunicationPreferences,
    setAccessibilityCommunicationPreferences,
  } = useJoinFlowStore();
  const {
    documentCheckboxes,
    documentCheckboxesTitle,
    formatRadioOptions,
    formatNeededLabel,
    communicationsTitle,
    formatDescription,
    saveButtonText,
    editButtonText,
  } = accessibilityCommunicationPreferencesText;
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AccessibilityCommunicationPreferencesFormData>({
    resolver: zodResolver(accessibilityCommunicationPreferencesSchema),
    defaultValues: {
      contentTypes: {
        monthlyBills: false,
        cics: false,
        termsAndConditions: false,
      },
      contactPreferences: {
        audio: false,
        braille: false,
        largePrint: false,
      },
    },
  });

  const [formatNeeded, setFormatNeeded] = useState(false);
  const [editing, setEditing] = useState(true);

  const showFormContent =
    formatNeeded || !!accessibilityCommunicationPreferences;

  useEffect(() => {
    if (accessibilityCommunicationPreferences) {
      setValue(
        "contentTypes",
        accessibilityCommunicationPreferences.contentTypes,
      );
      setValue(
        "contactPreferences",
        toFormContactPreferences(
          accessibilityCommunicationPreferences.contactPreferences,
        ),
      );
    }
  }, [accessibilityCommunicationPreferences, setValue]);

  const handleFormSubmit = (
    data: AccessibilityCommunicationPreferencesFormData,
  ) => {
    const filteredContentTypes = filterTrueBooleans(data.contentTypes);
    const filteredContactPreferences = filterTrueBooleans(
      data.contactPreferences,
    );

    const filteredData = {
      ...(Object.keys(filteredContentTypes).length > 0 && {
        contentTypes: filteredContentTypes,
      }),
      ...(Object.keys(filteredContactPreferences).length > 0 && {
        contactPreferences: filteredContactPreferences,
      }),
    };

    // If no preferences are selected, set to null, otherwise use filtered data
    const dataToUpdate =
      Object.keys(filteredData).length === 0 ? null : filteredData;

    if (dataToUpdate) {
      setAccessibilityCommunicationPreferences(
        dataToUpdate as AccessibilityCommunicationPreferences,
      );
      setEditing(false);
    } else {
      setFormatNeeded(false);
      setEditing(true);
    }
  };

  const handleFormatNeededChange = () => {
    if (showFormContent) {
      reset();
      setAccessibilityCommunicationPreferences(null);
      setFormatNeeded(false);
    } else {
      setEditing(true);
      setFormatNeeded(true);
    }
  };

  return (
    <>
      <Checkbox
        label={formatNeededLabel}
        value="formatNeeded"
        checked={showFormContent}
        onChange={handleFormatNeededChange}
        labelClassName="text-sm font-medium leading-[1.6] text-core-black"
      />
      {showFormContent && (
        <form
          id="communication-requirements-form"
          onSubmit={handleSubmit(handleFormSubmit)}
          className="bg-core-white p-4 md:p-6 rounded-md md:rounded-sm flex flex-col gap-3 md:gap-4"
        >
          <h3 className="text-xs md:text-sm font-semibold leading-[1.6]">
            {communicationsTitle}
          </h3>
          {editing ? (
            <>
              <FormatSelection
                control={control}
                errors={errors}
                formatRadioOptions={formatRadioOptions}
                formatDescription={formatDescription}
              />
              <hr className="border-ui-grey-300 bg-ui-grey-300 my-1 md:my-2" />
              <DocumentSelection
                control={control}
                errors={errors}
                documentCheckboxes={documentCheckboxes}
                documentCheckboxesTitle={documentCheckboxesTitle}
              />
              <Button
                size="medium"
                variant="solid"
                tint="yellow"
                className="mt-4 w-full md:w-fit md:text-sm"
              >
                {saveButtonText}
              </Button>
            </>
          ) : (
            <Button
              type="button"
              size="medium"
              variant="solid"
              tint="yellow"
              className="mt-4 w-full md:w-fit md:text-sm"
              onClick={() => {
                setEditing(true);
              }}
            >
              {editButtonText}
            </Button>
          )}
        </form>
      )}
    </>
  );
};
