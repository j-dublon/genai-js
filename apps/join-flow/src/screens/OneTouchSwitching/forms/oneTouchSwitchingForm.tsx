"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Checkbox,
  InsertFormattedText,
  TipCard,
} from "@react-component-library/ui";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { FormDropdown } from "@/components/FormDropdown";
import FormInput from "@/components/FormInput";
import { getAssetPath } from "@/lib/get-asset-path";
import { oneTouchSwitchingText } from "@/screens/OneTouchSwitching/oneTouchSwitchingProps";

import {
  createOneTouchSwitchingSchema,
  OneTouchSwitchingFormData,
  OneTouchSwitchingFormProps,
} from "./formValues";

export const OneTouchSwitchingForm = ({
  onSubmit,
  defaultProvider = "",
  matchResult,
  setMatchResult,
  isSubmitting = false,
  providers,
  providerError,
}: OneTouchSwitchingFormProps) => {
  const { switchingDetails } = useJoinFlowStore();
  const [customProviderError, setCustomProviderError] = useState<string | null>(
    null,
  );

  const shouldShowAccountNumber =
    switchingDetails?.otsSwitchStatus === "FIRST_ATTEMPT_FAILED";

  const schema = createOneTouchSwitchingSchema(
    switchingDetails?.otsSwitchStatus,
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<OneTouchSwitchingFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      provider: defaultProvider,
      consentGiven: false,
      accountNumber: "",
    },
  });

  const currentProvider = watch("provider");
  const currentConsent = watch("consentGiven");

  const handleFormSubmit = async (data: OneTouchSwitchingFormData) => {
    setCustomProviderError(null);

    if (!data.provider) {
      setCustomProviderError("Please select a provider from the list");
      return;
    }

    await onSubmit(data);
  };

  const providerOptions = providers.reduce(
    (acc, provider) => {
      acc[provider.name] = provider.losingRcpid;
      return acc;
    },
    {} as Record<string, string>,
  );

  useEffect(() => {
    if (matchResult?.provider?.losingRcpid && !currentProvider) {
      setValue("provider", matchResult.provider.losingRcpid);
    }
  }, [matchResult?.provider?.losingRcpid, currentProvider, setValue]);

  useEffect(() => {
    if (currentProvider) {
      setValue("consentGiven", false, { shouldValidate: false });
      setMatchResult(null);
      setCustomProviderError(null);
    }
  }, [currentProvider, setValue, setMatchResult]);

  const errorTextStyling = "text-ui-error text-xs md:text-sm mt-1";

  return (
    <>
      {!shouldShowAccountNumber && (
        <p className="font-semibold text-xs md:text-sm leading-[1.6]">
          {oneTouchSwitchingText.subtitle}
        </p>
      )}
      <form
        id="oneTouchSwitchingForm"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="flex flex-col gap-4 md:gap-6">
          {shouldShowAccountNumber && (
            <>
              <TipCard
                backgroundColor="orange"
                subtitle={oneTouchSwitchingText.firstAttemptFailTitle}
                subtitleColor="tertiary-peach"
                image={getAssetPath("/images/signingUp.svg")}
                hideImageOnMobile
              >
                {oneTouchSwitchingText.firstAttemptFailText}
              </TipCard>
              <div className="flex flex-col gap-4 md:gap-6">
                <p className="text-xs md:text-sm leading-[1.6] font-semibold">
                  {oneTouchSwitchingText.accountNumberPrompt}
                </p>
                <div>
                  <FormInput
                    id="account-number"
                    placeholder={oneTouchSwitchingText.accountNumberPlaceholder}
                    {...register("accountNumber")}
                    disabled={isSubmitting}
                    aria-label="accountNumber"
                  />
                  {errors.accountNumber && (
                    <p className={errorTextStyling}>
                      {errors.accountNumber.message}
                    </p>
                  )}
                </div>
                <p className="text-xs md:text-sm leading-[1.6] font-normal">
                  {oneTouchSwitchingText.helpText}
                </p>
              </div>
            </>
          )}
          <h3 className="font-semibold text-xs md:text-sm text-core-black">
            {oneTouchSwitchingText.providerSelectionTitle}
          </h3>
          <div>
            <FormDropdown
              control={control}
              name="provider"
              dropdownPlaceholder={
                oneTouchSwitchingText.providerSelectorDefault
              }
              options={providerOptions}
              errorMessage={
                providerError && !currentProvider
                  ? oneTouchSwitchingText.providerErrorMessage
                  : !currentProvider &&
                      (customProviderError || errors.provider?.message)
                    ? customProviderError || errors.provider?.message
                    : undefined
              }
              showLabel={false}
              errorMessageStyling={errorTextStyling}
            />
          </div>

          <div className="flex flex-col">
            <Checkbox
              label={oneTouchSwitchingText.consentLabel}
              value="consent"
              checked={currentConsent}
              onChange={(checked) => setValue("consentGiven", checked)}
              disabled={isSubmitting}
              labelClassName="text-core-black"
            />
            {!currentConsent && errors.consentGiven && (
              <p className={errorTextStyling}>{errors.consentGiven.message}</p>
            )}
          </div>
          <TipCard
            backgroundColor="blue"
            subtitle={oneTouchSwitchingText.tipSubtitle}
            subtitleColor="tertiary-blue-dark"
            image={getAssetPath("/images/linked-hands.svg")}
            hideImageOnMobile
          >
            <InsertFormattedText
              text={oneTouchSwitchingText.tipText}
              searchText={oneTouchSwitchingText.tipTextHighlight}
              className="font-medium"
            />
          </TipCard>
        </div>
      </form>
    </>
  );
};

export default OneTouchSwitchingForm;
