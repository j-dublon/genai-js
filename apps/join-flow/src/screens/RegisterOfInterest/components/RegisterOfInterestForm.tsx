import { zodResolver } from "@hookform/resolvers/zod";
import {
  AccessibleLoadingEgg,
  Button,
  InsertLinksOrButtons,
  TipCard,
} from "@react-component-library/ui";
import { usePostHog } from "posthog-js/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import FormInput from "@/components/FormInput";
import { formatRoiData } from "@/lib/formatRoiData";
import { getAssetPath } from "@/lib/get-asset-path";
import { registerInterest } from "@/services/helpers/registerInterest";
import useJoinFlowStore from "@/store/useJoinFlowStore";
import {
  ExpressionOfInterestFormData,
  expressionOfInterestSchema,
} from "@/validation/join-flow-schema";

export interface RegisterOfInterestFormProps {
  source: "not-shown" | "cannot-service-address" | "unavailable";
  buttonText: string;
  privacyNoticeText: string;
  privacyNoticeLinkText: string;
  privacyNoticeUrl: string;
  errorTipCardTitle: string;
  formErrorText: string;
  onSuccess: () => void;
}

export const RegisterOfInterestForm = ({
  source,
  buttonText,
  privacyNoticeText,
  privacyNoticeLinkText,
  privacyNoticeUrl,
  errorTipCardTitle,
  formErrorText,
  onSuccess,
}: RegisterOfInterestFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpressionOfInterestFormData>({
    resolver: zodResolver(expressionOfInterestSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
    },
  });
  const posthog = usePostHog();

  const { affiliateSession, serviceAddress, roiPostcode } = useJoinFlowStore();
  const roiAddressData = serviceAddress
    ? [serviceAddress]
    : roiPostcode
      ? [{ postcode: roiPostcode }]
      : null;

  const [formError, setFormError] = useState<string | null>(null);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ExpressionOfInterestFormData) => {
    setHasAttemptedSubmit(true);
    posthog.capture("join_flow_submitted_register_of_interest");

    if (!roiAddressData || roiAddressData.length === 0) {
      setFormError("Please return to the previous page and select an address.");
      return;
    } else {
      setFormError(null);
      const apiPayload = formatRoiData(
        data,
        roiAddressData,
        source,
        affiliateSession?.affiliateName,
      );

      try {
        setIsLoading(true);
        const result = await registerInterest(apiPayload);
        if (result.roi) {
          onSuccess();
        } else {
          setFormError(formErrorText);
        }
      } catch {
        setFormError(formErrorText);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-3 md:gap-6"
      onSubmit={handleSubmit(onSubmit)}
      id="register-your-interest"
      name="register-your-interest"
      noValidate
    >
      {(errors.fullName || errors.email || errors.phoneNumber || formError) && (
        <TipCard
          subtitle={errorTipCardTitle}
          image={getAssetPath("/images/stop-hand.svg")}
          backgroundColor="peach"
          subtitleColor="black"
        >
          <ul className="ml-4 list-disc list-inside">
            {!formError ? (
              (["fullName", "email", "phoneNumber"] as const).map((field) => {
                const error = errors[field];
                return (
                  error && (
                    <li
                      key={`${field}-error`}
                      className="text-core-black text-xs md:text-sm mt-1"
                    >
                      {error.message}
                    </li>
                  )
                );
              })
            ) : (
              <li className="text-core-black text-xs md:text-sm mt-1">
                {formError}
              </li>
            )}
          </ul>
        </TipCard>
      )}
      <FormInput
        {...register("fullName")}
        id="full-name"
        autoComplete="name"
        required
        aria-required="true"
        spellCheck={false}
        type="text"
        placeholder="Full name"
        error={errors.fullName}
        showErrorMessages={false}
        hasSubmitted={hasAttemptedSubmit}
        className="bg-core-white placeholder:text-ui-grey-500"
      />

      <FormInput
        {...register("email")}
        id="email"
        autoComplete="email"
        required
        aria-required="true"
        spellCheck={false}
        type="email"
        placeholder="Email"
        error={errors.email}
        showErrorMessages={false}
        hasSubmitted={hasAttemptedSubmit}
        className="bg-core-white placeholder:text-ui-grey-500"
      />

      <FormInput
        {...register("phoneNumber")}
        id="phone-number"
        autoComplete="tel"
        spellCheck={false}
        type="text"
        placeholder="Phone number (optional)"
        error={errors.phoneNumber}
        showErrorMessages={false}
        hasSubmitted={hasAttemptedSubmit}
        className="bg-core-white placeholder:text-ui-grey-500"
      />

      <p className="text-xs text-core-black">
        <InsertLinksOrButtons
          text={privacyNoticeText}
          items={[
            {
              searchText: privacyNoticeLinkText,
              href: privacyNoticeUrl,
              openInNewTab: true,
            },
          ]}
        />
      </p>

      {isLoading ? (
        <AccessibleLoadingEgg wrapperClassName="flex justify-center" />
      ) : (
        <Button
          type="submit"
          variant="solid"
          tint="yellow"
          size="large"
          fullWidth
        >
          {buttonText}
        </Button>
      )}
    </form>
  );
};
