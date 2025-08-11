import {
  Checkbox,
  InfoModal,
  InsertLinksOrButtons,
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

  const closeMobileModal = (e?: MouseEvent) => {
    if (mobileModalRef.current) {
      e?.preventDefault();
      mobileModalRef.current.close();
      setIsMobileModalOpen(false);
    }
  };

  useClickOutside(mobileModalRef, isMobileModalOpen, closeMobileModal);

  const MarketingText = () => {
    const {
      marketingText,
      privacyInfoText,
      privacyNoticeText,
      privacyNoticeUrl,
    } = personalDetailsProps.marketingSection;

    return (
      <>
        <p className="font-medium text-xs md:text-sm mb-4">{marketingText}</p>
        <InsertLinksOrButtons
          text={privacyInfoText}
          items={[
            {
              searchText: privacyNoticeText,
              href: privacyNoticeUrl,
            },
          ]}
          defaultClassName="ds:text-xs ds:md:text-sm"
        />
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
            content={personalDetailsProps.smartphoneSection.smartphoneTooltip}
          >
            <span className="text-ui-link">
              {personalDetailsProps.smartphoneSection.whyText}
            </span>
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
          <span className="text-ui-link">
            {personalDetailsProps.smartphoneSection.whyText}
          </span>
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
            backgroundColor="peach"
            className="justify-center md:w-full items-center"
          >
            {personalDetailsProps.smartphoneSection.noSmartphoneAlertText}
          </TipCard>
        )}
      </div>

      <div className="flex flex-col gap-4 mb-6">
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
          iconTooltip={personalDetailsProps.emailSection.emailTooltip}
          modalTitle={personalDetailsProps.emailModalDetails.modalTitle}
          modalContent={personalDetailsProps.emailModalDetails.modalContent}
        />
      </div>

      <div className="mb-5 md:mb-6">
        <div className="mb-6 text-sm leading-[26px]">
          <MarketingText />
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
        title={personalDetailsProps.smartphoneModalDetails.modalTitle}
        modalRef={mobileModalRef}
        buttonText="close"
        buttonType="button"
      >
        <ModalContent
          content={personalDetailsProps.smartphoneModalDetails.modalContent}
        />
      </InfoModal>
    </form>
  );
};
