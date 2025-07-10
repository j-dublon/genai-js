import { zodResolver } from "@hookform/resolvers/zod";
import { Button, InsertLink, TipCard } from "@react-component-library/ui";
import { useState } from "react";
import { useForm } from "react-hook-form";

import FormInput from "@/components/FormInput";
import { useRoiAddress } from "@/hooks/useRoiAddress";
import { getAssetPath } from "@/lib/get-asset-path";
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
}

export const RegisterOfInterestForm = ({
  source,
  buttonText,
  privacyNoticeText,
  privacyNoticeLinkText,
  privacyNoticeUrl,
  errorTipCardTitle,
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

  const roiAddressData = useRoiAddress();
  const { affiliateSession } = useJoinFlowStore();

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const onSubmit = async (data: ExpressionOfInterestFormData) => {
    setHasSubmitted(true);

    // TODO: Prepare to send to API - awaiting route and helper function
    const apiPayload = {
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber || null,
      ...roiAddressData,
      originJourney: source,
      affiliateCode: affiliateSession?.affiliateName || null,
    };

    console.log("API payload:", apiPayload);

    // TODO: Make an API call here
    // eg. submitRegisterOfInterest(apiPayload);
  };

  return (
    <form
      className="flex flex-col gap-3 md:gap-6"
      onSubmit={handleSubmit(onSubmit)}
      id="register-your-interest"
      name="register-your-interest"
      noValidate
    >
      {(errors.fullName || errors.email || errors.phoneNumber) && (
        <TipCard
          subtitle={errorTipCardTitle}
          image={getAssetPath("/images/stop-hand.svg")}
          backgroundColor="peach"
          subtitleColor="black"
        >
          <ul className="ml-4 list-disc list-inside">
            {(["fullName", "email", "phoneNumber"] as const).map((field) => {
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
            })}
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
        hasSubmitted={hasSubmitted}
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
        hasSubmitted={hasSubmitted}
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
        hasSubmitted={hasSubmitted}
        className="bg-core-white placeholder:text-ui-grey-500"
      />

      <p className="text-xs text-core-black">
        <InsertLink
          text={privacyNoticeText}
          searchText={privacyNoticeLinkText}
          href={privacyNoticeUrl}
          openInNewTab={true}
        />
      </p>

      <Button
        type="submit"
        variant="solid"
        tint="yellow"
        size="large"
        fullWidth
      >
        {buttonText}
      </Button>
    </form>
  );
};
