import { zodResolver } from "@hookform/resolvers/zod";
import { InfoModal, useClickOutside } from "@react-component-library/ui";
import { Radio } from "@react-component-library/ui";
import { TickWithCircle } from "@react-component-library/ui/icons";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import FormInput from "@/components/FormInput";
import { ModalContent } from "@/components/ModalContent";
import { TextInput } from "@/components/TextInput";
import { useClearFocus } from "@/hooks/useClearFocus";
import useJoinFlowStore from "@/store/useJoinFlowStore";

import { softCreditCheckRetryProps } from "../SoftCreditCheckRetryProps";
import {
  SoftCreditCheckRetryFormInputs,
  softCreditCheckRetryFormSchema,
  SoftCreditCheckRetryFormValues,
} from "./formValues";

export const RetryCheckForm = ({
  onSubmit,
}: {
  onSubmit: (data: SoftCreditCheckRetryFormValues) => Promise<void>;
}) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const addressModalRef = useRef<HTMLDialogElement>(null);
  const { serviceAddress } = useJoinFlowStore();
  const {
    trigger,
    watch,
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<
    SoftCreditCheckRetryFormInputs,
    SoftCreditCheckRetryFormInputs,
    SoftCreditCheckRetryFormValues
  >({
    resolver: zodResolver(softCreditCheckRetryFormSchema),
    defaultValues: {
      dobDay: "",
      dobMonth: "",
      dobYear: "",
      residencyDuration: null,
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      postcode: "",
    },
  });

  const residencyDuration = watch("residencyDuration");

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

  const closeAddressModal = (e?: MouseEvent) => {
    if (addressModalRef.current) {
      e?.preventDefault();
      addressModalRef.current.close();
      setIsAddressModalOpen(false);
    }
  };

  useClickOutside(addressModalRef, isAddressModalOpen, closeAddressModal);
  useClearFocus(addressModalRef, "close");

  const formSubmitHandler = async (data: SoftCreditCheckRetryFormValues) => {
    const isFormValid = await trigger();

    if (!isFormValid) {
      return;
    }

    setHasSubmitted(true);
    await onSubmit(data);
  };

  return (
    <form
      id="retryCheckForm"
      aria-label="Soft credit check retry form"
      aria-busy={isSubmitting}
      onSubmit={handleSubmit(formSubmitHandler)}
    >
      <div className="flex flex-col gap-6 mb-6 items-start">
        <div className="flex flex-col gap-4 md:gap-6">
          <h2 className="text-xs md:text-sm font-semibold leading-[162.5%]">
            {softCreditCheckRetryProps.dobSection.heading}
          </h2>
          <div className="flex flex-row gap-2 md:gap-4 items-center">
            <TextInput
              type="text"
              placeholder="DD"
              maxLength={2}
              id="dob-day"
              aria-label="Day"
              aria-invalid={!!errors.dobDay}
              className="h-10 w-12 rounded-xs !border-1 !p-2 text-center !font-normal md:h-16 md:w-18 md:!p-3 md:text-left"
              onInput={handleDobInput}
              hasSubmitted={hasSubmitted}
              {...register("dobDay")}
            />
            <TextInput
              type="text"
              placeholder="MM"
              maxLength={2}
              id="dob-month"
              aria-label="Month"
              aria-invalid={!!errors.dobMonth}
              className="h-10 w-12 rounded-xs !border-1 !p-2 text-center !font-normal md:h-16 md:w-18 md:!p-3 md:text-left"
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
              aria-label="Year"
              aria-invalid={!!errors.dobYear}
              className="h-10 w-18 rounded-xs !border-1 !p-2 text-center !font-normal md:h-16 md:w-25 md:!p-3 md:text-left"
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
          {(errors.dobDay || errors.dobMonth || errors.dobYear) && (
            <p className="text-ui-error text-xs md:text-sm mt-1">
              {errors?.dobDay?.message === "You must be at least 18 years old"
                ? "You must be at least 18 years old"
                : "Please enter a valid date"}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4 md:gap-6">
          <h2 className="text-xs leading-[162.5%] font-medium md:text-sm">
            {softCreditCheckRetryProps.addressSection.heading}{" "}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                addressModalRef.current?.showModal();
                setIsAddressModalOpen(true);
              }}
              className="text-ui-link cursor-pointer"
            >
              {softCreditCheckRetryProps.addressSection.modalButtonText}
            </button>
          </h2>
          {serviceAddress && (
            <p className="text-xs font-normal md:text-sm">
              {[serviceAddress.line1, serviceAddress.line2]
                .filter(Boolean)
                .join(" ")}
              {serviceAddress.line3 && <br />}
              {serviceAddress.line3}
              {serviceAddress.postcode && <br />}
              {serviceAddress.postcode}
            </p>
          )}
          <Controller
            name="residencyDuration"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-2">
                {softCreditCheckRetryProps.addressSection.residencyOptions.map(
                  (option) => (
                    <div
                      key={option.value}
                      className="inline-flex items-center text-xs md:text-sm"
                    >
                      <Radio
                        label={option.label}
                        value={option.value}
                        checked={field.value === option.value}
                        onChange={() => field.onChange(option.value)}
                      />
                    </div>
                  ),
                )}
              </div>
            )}
          />
          {errors.residencyDuration && (
            <p className="mt-1 text-xs text-ui-error md:text-sm">
              {errors.residencyDuration.message}
            </p>
          )}
        </div>

        {residencyDuration === "under-year" && (
          <div className="flex flex-col gap-6 w-full">
            <h2 className="text-xs leading-[162.5%] font-medium md:text-sm">
              {softCreditCheckRetryProps.addressSection.heading2}
            </h2>
            <FormInput
              id="addressLine1"
              placeholder={
                softCreditCheckRetryProps.addressSection.fieldPlaceholders
                  .addressLine1
              }
              error={errors.addressLine1}
              {...register("addressLine1")}
              hasSubmitted={hasSubmitted}
              aria-label={
                softCreditCheckRetryProps.addressSection.fieldPlaceholders
                  .addressLine1
              }
            />
            <FormInput
              id="addressLine2"
              placeholder={
                softCreditCheckRetryProps.addressSection.fieldPlaceholders
                  .addressLine2
              }
              error={errors.addressLine2}
              {...register("addressLine2")}
              hasSubmitted={hasSubmitted}
              aria-label={
                softCreditCheckRetryProps.addressSection.fieldPlaceholders
                  .addressLine2
              }
            />
            <FormInput
              id="addressLine3"
              placeholder={
                softCreditCheckRetryProps.addressSection.fieldPlaceholders
                  .addressLine3
              }
              error={errors.addressLine3}
              {...register("addressLine3")}
              hasSubmitted={hasSubmitted}
              aria-label={
                softCreditCheckRetryProps.addressSection.fieldPlaceholders
                  .addressLine3
              }
            />
            <FormInput
              id="postcode"
              placeholder={
                softCreditCheckRetryProps.addressSection.fieldPlaceholders
                  .postcode
              }
              error={errors.postcode}
              {...register("postcode")}
              hasSubmitted={hasSubmitted}
              aria-label={
                softCreditCheckRetryProps.addressSection.fieldPlaceholders
                  .postcode
              }
            />
          </div>
        )}
      </div>
      <InfoModal
        title={softCreditCheckRetryProps.addressSection.modalContent.title}
        modalRef={addressModalRef}
        buttonText={
          softCreditCheckRetryProps.addressSection.modalContent.buttonText
        }
        buttonType="button"
      >
        <ModalContent
          content={
            softCreditCheckRetryProps.addressSection.modalContent.cardContent
          }
          className="mt-4 mb-8"
          textClassName="md:!pb-2"
          titleClassName="!pb-0"
        />
      </InfoModal>
    </form>
  );
};
