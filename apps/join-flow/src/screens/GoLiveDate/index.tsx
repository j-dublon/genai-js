"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, DatePicker } from "@react-component-library/ui";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Footer } from "@/components/Footer";
import Stepper from "@/components/Stepper";
import PaymentDetails from "@/screens/PaymentDetails";
import {
  GoLiveDateFormValues,
  goLiveDateSchema,
} from "@/validation/join-flow-schema";

import { goLiveDateText } from "./GoLiveDateProps";

export const GoLiveDate = ({ onBack }: { onBack?: () => void }) => {
  const {
    title,
    subtitle,
    availableDatesLabel,
    timeSlotLabel,
    backButtonText,
    continueButtonText,
  } = goLiveDateText;

  const router = useRouter();
  const { setGoLiveDetails, goLiveDetails, setCurrentStep } =
    useJoinFlowStore();
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [isTimeSlotDropdownOpen, setIsTimeSlotDropdownOpen] = useState(false);

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
  });

  const selectedDate = watch("selectedDate");

  const timeSlots = ["8am - 1pm", "1pm - 6pm"];

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

  const handleBack = () => {
    if (onBack && typeof onBack === "function") {
      onBack();
    } else {
      router.push("/join-flow/one-touch-switching");
    }
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

  //TODO: Get real date range from graphQL
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
      <div className="container mx-auto px-4 py-8">
        <Stepper />

        <div className="max-w-3xl mx-auto">
          <div className="bg-core-white p-8 rounded-md">
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <p className="text-ui-grey-500 mb-6">{subtitle}</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-8">
                <div className="mb-6">
                  <h2 className="text-lg font-medium mb-4">
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
                    <h2 className="text-lg font-medium mb-4">
                      {timeSlotLabel}
                    </h2>
                    <Controller
                      name="timeSlot"
                      control={control}
                      render={({ field }) => (
                        <div className="relative">
                          <button
                            type="button"
                            className="w-full p-3 border border-ui-grey-300 rounded-md text-left bg-core-white"
                            onClick={() =>
                              setIsTimeSlotDropdownOpen(!isTimeSlotDropdownOpen)
                            }
                          >
                            <span className={field.value ? "font-medium" : ""}>
                              {field.value || timeSlotLabel}
                            </span>
                          </button>

                          {isTimeSlotDropdownOpen && (
                            <div className="absolute z-10 mt-1 w-full bg-core-white border border-ui-grey-300 rounded-md shadow-lg">
                              <div className="p-2">
                                {timeSlots.map((slot) => (
                                  <button
                                    key={slot}
                                    type="button"
                                    className={`p-2 w-full text-left rounded-md hover:bg-ui-grey-100 ${
                                      field.value === slot
                                        ? "bg-secondary-yellow text-core-black font-medium"
                                        : ""
                                    }`}
                                    onClick={() => {
                                      field.onChange(slot);
                                      setIsTimeSlotDropdownOpen(false);
                                    }}
                                  >
                                    {slot}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    />
                    {errors.timeSlot && (
                      <p className="text-ui-error text-sm mt-1">
                        {errors.timeSlot.message}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  onClick={handleBack}
                  tint="white"
                  variant="outline"
                  type="button"
                >
                  {backButtonText}
                </Button>

                <Button
                  disabled={!selectedDate}
                  tint="yellow"
                  variant="solid"
                  type="submit"
                >
                  {continueButtonText}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GoLiveDate;
