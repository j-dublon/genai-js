import {
  Checkbox,
  InfoModal,
  Radio,
  TipCard,
  useClickOutside,
} from "@react-component-library/ui";
import { useRef, useState } from "react";
import { Controller } from "react-hook-form";

import FormInput from "@/components/FormInput";
import { ModalContent } from "@/components/ModalContent";
import { ToolTip } from "@/components/Tooltip";
import { getAssetPath } from "@/lib/get-asset-path";

import type { InitialPersonalDetailsProps } from "./formValues";

export const InitialPersonalDetailsForm = ({
  register,
  errors,
  hasSmartphoneValue,
  personalDetailsProps,
  control,
  hasSubmitted,
}: InitialPersonalDetailsProps) => {
  const mobileModalRef = useRef<HTMLDialogElement>(null);

  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const closeDobModal = (e?: MouseEvent) => {
    if (mobileModalRef.current) {
      e?.preventDefault();
      mobileModalRef.current.close();
      setIsMobileModalOpen(false);
    }
  };

  useClickOutside(mobileModalRef, isMobileModalOpen, closeDobModal);

  const renderMarketingText = () => {
    const text = personalDetailsProps.marketingSection.text;
    if (!text) return;
    const parts = text.split("Privacy Notice");

    return (
      <>
        {parts[0]}
        <a
          href={personalDetailsProps.marketingSection.privacyNoticeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ui-link underline hover:text-tertiary-purple cursor-pointer"
          style={{ transition: "color 0.2s ease" }}
        >
          {personalDetailsProps.marketingSection.privacyNoticeText}
        </a>
        {parts[1]}
      </>
    );
  };

  return (
    <form id="personalDetailsForm">
      <div className="flex flex-col md:flex-row md:gap-6 gap-5 mb-5 md:mb-5">
        <FormInput
          id="firstName"
          placeholder={personalDetailsProps.fieldPlaceholders.firstName}
          error={errors.firstName}
          {...register("firstName")}
          hasSubmitted={hasSubmitted}
          required
        />
        <FormInput
          id="lastName"
          placeholder={personalDetailsProps.fieldPlaceholders.lastName}
          error={errors.lastName}
          {...register("lastName")}
          hasSubmitted={hasSubmitted}
          required
        />
      </div>

      <div className="mb-5 md:mb-6">
        <FormInput
          id="phone"
          placeholder={personalDetailsProps.fieldPlaceholders.phone}
          error={errors.phone}
          {...register("phone")}
          hasSubmitted={hasSubmitted}
          required
        />
      </div>

      <div className="text-sm font-medium mb-6">
        {personalDetailsProps.smartphoneSection.mainText}{" "}
        <span className="hidden md:inline">
          <ToolTip
            gap={16}
            className="md:top-14"
            content={
              "Hover over the ‘i’ icon and copy will go here in a tooltip  to explain how we will be sending a code to their email address lorum ipsum dolor sit amet lorum conquistitor."
            }
          >
            <span className="text-ui-link">Why is this?</span>
          </ToolTip>
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            mobileModalRef.current?.showModal();
            setIsMobileModalOpen(true);
          }}
          className="inline md:hidden items-center group cursor-pointer"
        >
          <span className="text-ui-link">Why is this?</span>
        </button>
      </div>

      <div className="flex flex-col gap-6 mb-5 md:mb-6">
        <Controller
          name="hasSmartphone"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              {personalDetailsProps.smartphoneSection.options.map((option) => (
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
          rules={{
            required: true,
          }}
        />
        {errors.hasSmartphone && (
          <p className="text-ui-error text-sm">
            {errors.hasSmartphone.message}
          </p>
        )}
        {hasSmartphoneValue === "no" && (
          <TipCard
            image={getAssetPath("/images/stop-hand.svg")}
            className="bg-tertiary-peach-light justify-center md:w-full items-center"
          >
            You&apos;ll need a smartphone to get Cuckoo. We can&apos;t provide
            our service without a smartphone.
          </TipCard>
        )}
      </div>

      <div className="flex flex-col gap-4 mb-5 md:mb-6">
        <FormInput
          id="email"
          placeholder={personalDetailsProps.fieldPlaceholders.email}
          error={errors.email}
          {...register("email")}
          hasSubmitted={hasSubmitted}
          required
        />
        <FormInput
          id="confirmEmail"
          placeholder={personalDetailsProps.fieldPlaceholders.confirmEmail}
          error={errors.confirmEmail}
          {...register("confirmEmail")}
          hasSubmitted={hasSubmitted}
          required
          iconTooltip="Hover over the ‘i’ icon and copy will go here in a tooltip  to explain how we will be sending a code to their email address lorum ipsum dolor sit amet lorum conquistitor. "
          modalTitle={personalDetailsProps.smartphoneModalDetails.modalTitle}
          modalContent={
            personalDetailsProps.smartphoneModalDetails.modalContent
          }
        />
      </div>

      <div className="mb-5 md:mb-6">
        <div className="mb-5 md:mb-6 text-sm leading-[26px]">
          {renderMarketingText()}
        </div>
        <Controller
          name="marketingConsent"
          control={control}
          render={({ field }) => (
            <Checkbox
              label="Yes count me in"
              value="yes"
              checked={Boolean(field.value)}
              onChange={(checked) => field.onChange(checked)}
            />
          )}
        />
      </div>
      <InfoModal
        title={personalDetailsProps.emailModalDetails.modalTitle}
        modalRef={mobileModalRef}
        buttonText="close"
        buttonType="button"
      >
        <ModalContent
          content={personalDetailsProps.emailModalDetails.modalContent}
        />
      </InfoModal>
    </form>
  );
};
