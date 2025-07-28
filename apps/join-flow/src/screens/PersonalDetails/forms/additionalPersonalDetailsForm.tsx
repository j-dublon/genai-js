import {
  Checkbox,
  InfoModal,
  Radio,
  TipCard,
  useClickOutside,
} from "@react-component-library/ui";
import { TickWithCircle } from "@react-component-library/ui/icons";
import { useRef, useState } from "react";
import { Controller, useFieldArray, useWatch } from "react-hook-form";

import { ManualAddressFields } from "@/components/ManualAddressForm/ManualAddressFields";
import { ModalContent } from "@/components/ModalContent";
import { TextInput } from "@/components/TextInput";
import { useClearFocus } from "@/hooks/useClearFocus";
import { getAssetPath } from "@/lib/get-asset-path";

import personalDetailsProps from "../personalDetailsProps";
import type { AdditionalPersonalDetailsFormProps } from "./formValues";

export const AdditionalPersonalDetailsForm = ({
  register,
  errors,
  address,
  requiresLandline,
  control,
  hasSubmitted,
}: AdditionalPersonalDetailsFormProps) => {
  const { goodToKnow, signUpCheckDetails } = personalDetailsProps.tipCard;
  const {
    dobTitle,
    dobLink,
    addressTitle,
    residencyOptions,
    landlineTitle,
    landlineText,
    landlineTextLink,
    landlineCheckboxText,
    requiresLandlineText,
    dobModalTitle,
    dobModal,
    teleHealthDeviceModalTitle,
    modalCloseText,
    teleHealthDeviceModal,
    previousAddress,
    addAnotherAddress,
    removePreviousAddress,
  } = personalDetailsProps.additionalSection;

  const residencyDuration = useWatch({ control, name: "residencyDuration" });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addressHistory",
  });

  const dobModalRef = useRef<HTMLDialogElement>(null);
  const teleHealthModalRef = useRef<HTMLDialogElement>(null);

  const [isDobModalOpen, setIsDobModalOpen] = useState(false);
  const [isTeleHealthModalOpen, setIsTeleHealthModalOpen] = useState(false);

  const closeDobModal = (e?: MouseEvent) => {
    if (dobModalRef.current) {
      e?.preventDefault();
      dobModalRef.current.close();
      setIsDobModalOpen(false);
    }
  };

  const closeTeleHealthModal = (e?: MouseEvent) => {
    if (teleHealthModalRef.current) {
      e?.preventDefault();
      teleHealthModalRef.current.close();
      setIsTeleHealthModalOpen(false);
    }
  };

  useClickOutside(dobModalRef, isDobModalOpen, closeDobModal);
  useClickOutside(
    teleHealthModalRef,
    isTeleHealthModalOpen,
    closeTeleHealthModal,
  );

  useClearFocus(dobModalRef, "close");
  useClearFocus(teleHealthModalRef, "close");

  const handleDobInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.currentTarget.id === "dob-day" &&
      event.currentTarget.value.length === 2
    ) {
      document.getElementById("dob-month")?.focus();
      event.preventDefault();
    } else if (
      event.currentTarget.id === "dob-month" &&
      event.currentTarget.value.length === 2
    ) {
      document.getElementById("dob-year")?.focus();
      event.preventDefault();
    }
  };

  const handleDobKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      if (
        event.currentTarget.id === "dob-month" &&
        event.currentTarget.value.length === 1
      ) {
        event.currentTarget.value = "";
        document.getElementById("dob-day")?.focus();
        event.preventDefault();
      } else if (
        event.currentTarget.id === "dob-year" &&
        event.currentTarget.value.length === 1
      ) {
        event.currentTarget.value = "";
        document.getElementById("dob-month")?.focus();
        event.preventDefault();
      }
    }
  };

  const handleAddAnotherAddress = () => {
    append({
      line1: "",
      line2: "",
      line3: "",
      postcode: "",
    });
  };

  const handleRemoveAddress = (index: number) => {
    remove(index);
  };

  const getAddressTitle = (index: number) => {
    if (index === 1) return "Previous Address";
    return `Previous Address ${index - 1}`;
  };

  return (
    <form id="additionalDetailsForm">
      <TipCard
        image={getAssetPath("/images/linked-hands.svg")}
        className="mt-10 md:mt-12 mb-10 md:mb-12 bg-tertiary-blue-light justify-center md:w-full items-center"
      >
        <span>
          <span className="text-tertiary-blue-dark font-semibold">
            {goodToKnow}
          </span>{" "}
          {signUpCheckDetails}
        </span>
      </TipCard>
      <div className="flex flex-col gap-6 mb-12 items-start">
        <h2 className="text-md font-semibold">{dobTitle}</h2>
        <div className="flex flex-row gap-4 items-center">
          <TextInput
            type="text"
            placeholder="DD"
            maxLength={2}
            id="dob-day"
            aria-invalid={!!errors.dobDay}
            className="w-21 h-16 rounded-sm"
            onInput={handleDobInput}
            hasSubmitted={hasSubmitted}
            {...register("dobDay")}
          />
          <TextInput
            type="text"
            placeholder="MM"
            maxLength={2}
            id="dob-month"
            aria-invalid={!!errors.dobMonth}
            className="w-21 h-16 rounded-sm"
            onKeyDown={handleDobKeyDown}
            onInput={handleDobInput}
            {...register("dobMonth")}
            hasSubmitted={hasSubmitted}
          />
          <TextInput
            type="text"
            placeholder="YYYY"
            maxLength={4}
            id="dob-year"
            aria-invalid={!!errors.dobYear}
            className="w-21 h-16 rounded-sm"
            onKeyDown={handleDobKeyDown}
            {...register("dobYear")}
            hasSubmitted={hasSubmitted}
          />
          {hasSubmitted &&
            !errors.dobDay &&
            !errors.dobMonth &&
            !errors.dobYear && (
              <TickWithCircle width={22} height={22} circleFill={"#009EA8"} />
            )}
        </div>
        {hasSubmitted &&
          (errors.dobDay || errors.dobMonth || errors.dobYear) && (
            <p className="text-ui-error text-sm mt-1">
              {errors?.dobDay?.message === "You must be at least 18 years old"
                ? "You must be at least 18 years old"
                : "Please enter a valid date"}
            </p>
          )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            dobModalRef.current?.showModal();
            setIsDobModalOpen(true);
          }}
          className="leading-[1.6] underline font-medium cursor-pointer text-ui-link"
        >
          {dobLink}
        </button>
      </div>

      <div className="flex flex-col gap-4 mb-12">
        <h2 className="text-md font-semibold">{addressTitle}</h2>
        {address && (
          <p className="mb-4 font-medium">
            {[address.line1, address.line2, address.line3, address.postcode]
              .filter(Boolean)
              .join(", ")}
          </p>
        )}
        <Controller
          name="residencyDuration"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              {residencyOptions.map((option) => (
                <div key={option.value} className="inline-flex items-center">
                  <Radio
                    label={option.label}
                    value={option.value}
                    checked={field.value === option.value}
                    onChange={() => field.onChange(option.value)}
                  />
                </div>
              ))}
            </div>
          )}
        />
        {residencyDuration === "under-year" && (
          <>
            <div className="text-sm font-semibold mt-8 mb-4">
              {previousAddress}
            </div>
            {fields.slice(1).map((field, index) => {
              const actualIndex = index + 1;
              return (
                <div key={field.id} className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm font-semibold">
                      {getAddressTitle(actualIndex)}
                    </div>
                    <div className="flex justify-between items-center mb-4"></div>
                    {actualIndex > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveAddress(actualIndex)}
                        className="leading-[1.6] underline font-semibold cursor-pointer text-ui-link"
                      >
                        {removePreviousAddress}
                      </button>
                    )}
                  </div>
                  <ManualAddressFields
                    register={register}
                    errors={errors}
                    hasSubmitted={hasSubmitted}
                    fieldPlaceholders={{
                      line1: "House number/name",
                      line2: "First line of your address",
                      line3: "Second line of your address",
                      postcode: "Postcode",
                    }}
                    fieldPrefix={`addressHistory.${actualIndex}`}
                  />
                </div>
              );
            })}

            <button
              type="button"
              onClick={handleAddAnotherAddress}
              className="font-semibold underline pointer-events-auto text-ui-link mt-4"
              disabled={fields.length >= 3}
              style={{
                display: fields.length >= 3 ? "none" : "block",
              }}
            >
              {addAnotherAddress}
            </button>
          </>
        )}
        {errors.residencyDuration && (
          <p className="text-ui-error text-sm mt-1">
            {errors.residencyDuration.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4 mb-16">
        <h2 className="text-md font-semibold">{landlineTitle}</h2>
        <p>
          {landlineText}{" "}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              teleHealthModalRef.current?.showModal();
              setIsTeleHealthModalOpen(true);
            }}
            className="leading-[1.6] underline font-medium cursor-pointer text-ui-link"
          >
            {landlineTextLink}
          </button>
        </p>
        <Controller
          name="requiresLandline"
          control={control}
          render={({ field }) => (
            <Checkbox
              label={landlineCheckboxText}
              value="yes"
              checked={Boolean(field.value)}
              onChange={(checked) => field.onChange(checked)}
            />
          )}
        />
        {requiresLandline && (
          <TipCard
            image={getAssetPath("/images/stop-hand.svg")}
            className="bg-tertiary-peach-light justify-center md:w-full items-center"
          >
            {requiresLandlineText}
          </TipCard>
        )}
      </div>
      <InfoModal
        title={dobModalTitle}
        modalRef={dobModalRef}
        buttonText="close"
        buttonType="button"
      >
        <ModalContent content={dobModal} />
      </InfoModal>
      <InfoModal
        title={teleHealthDeviceModalTitle}
        modalRef={teleHealthModalRef}
        buttonText={modalCloseText}
        buttonType="button"
      >
        <ModalContent content={teleHealthDeviceModal} />
      </InfoModal>
    </form>
  );
};
