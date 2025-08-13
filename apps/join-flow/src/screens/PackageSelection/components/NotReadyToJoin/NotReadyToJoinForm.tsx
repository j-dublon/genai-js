import { zodResolver } from "@hookform/resolvers/zod";
import {
  AccessibleLoadingEgg,
  Button,
  DatePicker,
  InsertLinksOrButtons,
  TipCard,
} from "@react-component-library/ui";
import { usePostHog } from "posthog-js/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import FormInput from "@/components/FormInput";
import { formatRoiData } from "@/lib/formatRoiData";
import { getAssetPath } from "@/lib/get-asset-path";
import { registerInterest } from "@/services/helpers/registerInterest";
import useJoinFlowStore from "@/store/useJoinFlowStore";
import {
  NotReadyToJoinFormData,
  notReadyToJoinSchema,
} from "@/validation/join-flow-schema";

import { notReadyToJoinProps } from "./NotReadyToJoinProps";

export const NotReadyToJoinForm = () => {
  const {
    buttonText,
    confirmationMessage,
    privacyNoticeText,
    errorMessage,
    noAddressError,
    errorTipCardTitle,
    confirmationTipCardTitle,
  } = notReadyToJoinProps;

  const [formError, setFormError] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<
    null | "submitting" | "success" | "error"
  >(null);

  // TODO: add a loading state

  const posthog = usePostHog();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NotReadyToJoinFormData>({
    resolver: zodResolver(notReadyToJoinSchema),
    defaultValues: {
      fullName: "",
      email: "",
      selectedDate: "",
      phoneNumber: "",
    },
  });

  const { affiliateSession, serviceAddress, roiPostcode } = useJoinFlowStore();
  const roiAddressData = serviceAddress
    ? [serviceAddress]
    : roiPostcode
      ? [{ postcode: roiPostcode }]
      : null;

  const onSubmit = async (
    data: NotReadyToJoinFormData,
    event?: React.BaseSyntheticEvent,
  ) => {
    event?.stopPropagation();
    posthog.capture("join_flow_submitted_not_ready_to_join");
    setFormError(null);
    setSubmissionStatus("submitting");

    if (!roiAddressData || roiAddressData.length === 0) {
      // this shouldn't happen, but just in case
      setFormError(noAddressError);
      setSubmissionStatus("error");
      return;
    } else {
      setFormError(null);
      const formattedData = formatRoiData(
        data,
        roiAddressData,
        "not-ready-to-join",
        affiliateSession?.affiliateName,
      );
      try {
        const result = await registerInterest(formattedData);
        if (result.roi) {
          setSubmissionStatus("success");
        } else {
          setFormError(errorMessage);
          setSubmissionStatus("error");
        }
      } catch {
        setFormError(errorMessage);
        setSubmissionStatus("error");
      }
    }
  };

  const getDates = (): Date[] => {
    const dates = [];
    const today = new Date();

    // Generate dates from today to one year from now
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const formInputStyling = `bg-core-white placeholder:text-ui-grey-500 ${submissionStatus === "success" ? "cursor-not-allowed" : ""}`;

  return (
    <form
      id="notReadyToJoinForm"
      className="flex flex-col gap-6 md:w-1/2 shrink-0 grow-0"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-5">
        <FormInput
          {...register("fullName")}
          id="fullName"
          placeholder="Full name"
          error={errors.fullName}
          className={formInputStyling}
          disabled={submissionStatus === "success"}
        />
        <FormInput
          {...register("email")}
          id="email"
          placeholder="Email address"
          error={errors.email}
          className={formInputStyling}
          disabled={submissionStatus === "success"}
        />
        <FormInput
          {...register("phoneNumber")}
          id="phoneNumber"
          placeholder="Phone number (optional)"
          error={errors.phoneNumber}
          className={formInputStyling}
          disabled={submissionStatus === "success"}
        />
        <div className="flex flex-col w-full">
          <Controller
            name="selectedDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                availableDates={getDates()}
                selectedDate={field.value}
                onDateSelect={(date) => field.onChange(date)}
                placeholderText="Estimated end of contract date"
                buttonClassName="bg-core-white border-2 border-ui-grey-300"
                outerClassName="my-0"
                disabled={submissionStatus === "success"}
                overlay={true}
              />
            )}
          />
          {errors.selectedDate && (
            <p className="text-ui-error text-sm mt-1">
              {errors.selectedDate.message}
            </p>
          )}
        </div>
      </div>
      {submissionStatus === "success" ? (
        <TipCard
          subtitle={confirmationTipCardTitle}
          image={getAssetPath("/images/linked-hands.svg")}
          backgroundColor="green"
          subtitleColor="black"
        >
          <p className="text-core-black text-xs md:text-sm mt-1">
            {confirmationMessage}
          </p>
        </TipCard>
      ) : (
        <>
          {submissionStatus === "error" && formError && (
            <TipCard
              subtitle={errorTipCardTitle}
              image={getAssetPath("/images/stop-hand.svg")}
              backgroundColor="peach"
              subtitleColor="black"
            >
              <p className="text-core-black text-xs md:text-sm mt-1">
                {formError}
              </p>
            </TipCard>
          )}
          <p className="text-xs text-core-black leading-[1.6] opacity-80">
            <InsertLinksOrButtons
              text={privacyNoticeText}
              items={[
                {
                  searchText: "Privacy Notice",
                  href: "/legal/privacy",
                },
              ]}
            />
          </p>
          {submissionStatus === "submitting" ? (
            <AccessibleLoadingEgg
              wrapperClassName="flex justify-center"
              height={60}
            />
          ) : (
            <Button
              type="submit"
              tint="black"
              size="medium"
              variant="solid"
              className="w-full md:w-auto"
            >
              {buttonText}
            </Button>
          )}
        </>
      )}
    </form>
  );
};
