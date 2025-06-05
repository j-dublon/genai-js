"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, DatePicker, TipCard } from "@react-component-library/ui";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Footer } from "@/components/Footer";
import { FormDropdown } from "@/components/FormDropdown";
import { ReviewYourBasket } from "@/components/ReviewYourBasket";
import Stepper from "@/components/Stepper";
import { getAssetPath } from "@/lib/get-asset-path";
import PaymentDetails from "@/screens/PaymentDetails";
import {
  GoLiveDateFormValues,
  goLiveDateSchema,
} from "@/validation/join-flow-schema";

import { goLiveDateText } from "./GoLiveDateProps";

export const GoLiveDate = () => {
  const {
    title,
    subtitle,
    paragraph,
    engineerLink,
    availableDatesLabel,
    timeSlotLabel,
    timeSlotPlaceHolder,
    continueButtonText,
  } = goLiveDateText;

  const router = useRouter();
  const { setGoLiveDetails, goLiveDetails, setCurrentStep, switchingDetails } =
    useJoinFlowStore();
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<GoLiveDateFormValues>({
    resolver: zodResolver(goLiveDateSchema),
    defaultValues: {
      selectedDate: goLiveDetails?.selectedDate || "",
      timeSlot: goLiveDetails?.engineerSlot?.timeSlot || "",
    },
    mode: "onSubmit",
  });

  const selectedDate = watch("selectedDate");

  // TODO: get real time slots from API
  const timeSlots = { "8am - 1pm": "8am - 1pm", "1pm - 6pm": "1pm - 6pm" };

  const onSubmit = (data: GoLiveDateFormValues) => {
    setGoLiveDetails({
      selectedDate: data.selectedDate,
      engineerSlot: {
        date: data.selectedDate,
        timeSlot: data.timeSlot,
      },
    });
    setCurrentStep(4);
    setShowPaymentDetails(true);
    router.push("/join-flow/payment-details");
  };

  const handlePaymentDetailsBack = () => {
    setShowPaymentDetails(false);
  };

  const handlePaymentDetailsComplete = () => {
    setCurrentStep(5);
    router.push("/join-flow/order-summary");
  };

  if (showPaymentDetails) {
    return (
      <PaymentDetails
        onGoBack={handlePaymentDetailsBack}
        onComplete={handlePaymentDetailsComplete}
      />
    );
  }

  //TODO: Get real date range from API
  const getDates = (): Date[] => {
    const dates = [];
    const today = new Date();

    for (let i = 3; i < 25; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      dates.push(date);
    }

    return dates;
  };

  return (
    <>
      <ReviewYourBasket />
      <div className="container md:max-w-[565px] mx-auto px-4 py-8">
        <Stepper />
        {/* TO DO: pretty this up with styling */}
        {switchingDetails?.otsSwitchStatus === "OTS_FAILED" && (
          <p className="text-ui-error">
            We couldn&apos;t find your current provider{" "}
          </p>
        )}

        {switchingDetails?.otsSwitchStatus === "SWITCH_SUCCESS" && (
          <p className="mb-4">Switch successful!</p>
        )}

        <div className="max-w-3xl mx-auto pt-[38px]">
          <h1 className="grid text-2xl font-bold pb-2 md:pb-16 justify-center">
            {title}
          </h1>
          <TipCard
            image={{
              src: getAssetPath("/images/love.svg"),
              alt: "Love heart speech bubble",
            }}
            className="mt-10 md:mt-0 mb-10 md:mb-6 bg-secondary-green justify-center md:w-full items-center"
          >
            Yay! We can get you live as early as{" "}
            <span className="font-medium">
              {getDates()[0].toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </TipCard>
          <p className="text-core-black text-sm leading-[26px] font-medium mb-3">
            {subtitle}
          </p>
          <p className="text-ui-grey-500 text-sm leading-[26px] mb-3">
            {paragraph}
          </p>
          <a
            href=""
            className="text-ui-link underline text-sm leading-[26px] font-medium pb-12"
          >
            {engineerLink}
          </a>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8 pt-12">
              <div className="mb-6">
                <h2 className="text-md font-semibold mb-4">
                  {availableDatesLabel}
                </h2>

                <Controller
                  name="selectedDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      availableDates={getDates()}
                      selectedDate={field.value}
                      onDateSelect={(date) => field.onChange(date)}
                    />
                  )}
                />
                {errors.selectedDate && (
                  <p className="text-ui-error text-sm mt-1">
                    {errors.selectedDate.message}
                  </p>
                )}
              </div>

              {selectedDate && (
                <div className="mb-6">
                  <FormDropdown
                    dropdownLabel={timeSlotLabel}
                    control={control}
                    name="timeSlot"
                    dropdownPlaceholder={timeSlotPlaceHolder}
                    options={timeSlots}
                    errorMessage={errors?.timeSlot?.message}
                  />
                </div>
              )}
            </div>

            <div className="flex mt-8">
              <Button
                disabled={!selectedDate}
                tint="yellow"
                variant="solid"
                type="submit"
                fullWidth={true}
              >
                {continueButtonText}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GoLiveDate;
