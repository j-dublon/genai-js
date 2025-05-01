"use client";

import { Button } from "@react-component-library/ui";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

import { Footer } from "@/components/Footer";
import { ReviewYourBasket } from "@/components/ReviewYourBasket";
import Stepper from "@/components/Stepper";

import PaymentAddressDetails from "./components/PaymentAddressDetails";
import PaymentConfirmation from "./components/PaymentConfirmation";
import PaymentSummary from "./components/PaymentConfirmation/PaymentSummary";
import { PaymentForm } from "./forms/PaymentForm";
import { paymentDetailsText } from "./PaymentDetailsProps";

export const PaymentDetails = ({
  onGoBack,
  onComplete,
}: {
  onGoBack?: () => void;
  onComplete?: () => void;
}) => {
  const router = useRouter();
  const { setCurrentStep } = useJoinFlowStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const {
    title,
    paymentDetailsTitle,
    directDebitDetailsTitle,
    backButtonText,
    submitButtonText,
    submittingButtonText,
  } = paymentDetailsText;

  const handleFormSubmit = useCallback(() => {
    setIsSubmitting(true);

    try {
      setIsSubmitting(false);
      setShowConfirmation(true);
    } catch (error) {
      console.error("Error processing payment details:", error);
      setIsSubmitting(false);
    }
  }, []);

  const handleBackClick = useCallback(
    (event?: React.SyntheticEvent) => {
      if (event) {
        event.preventDefault();
      }

      if (onGoBack && typeof onGoBack === "function") {
        onGoBack();
      } else {
        setCurrentStep(3);
        router.push("/join-flow/one-touch-switching");
      }
    },
    [onGoBack, setCurrentStep, router],
  );

  const handleConfirmationBack = useCallback(() => {
    setShowConfirmation(false);
  }, []);

  const handleComplete = useCallback(() => {
    if (onComplete && typeof onComplete === "function") {
      onComplete();
    } else {
      setCurrentStep(5);
      router.push("/join-flow/order-summary");
    }
  }, [onComplete, setCurrentStep, router]);

  if (showConfirmation) {
    return (
      <PaymentConfirmation
        onGoBack={handleConfirmationBack}
        onComplete={handleComplete}
      />
    );
  }

  return (
    <>
      <ReviewYourBasket />
      <div className="container mx-auto px-4 py-8">
        <Stepper />

        <div className="max-w-4xl mx-auto">
          <div className="bg-core-white p-8 rounded-md">
            <h1 className="text-2xl font-bold mb-6">{title}</h1>

            <div className="flex flex-row gap-8">
              <div>
                <p className="text-md font-bold mb-6">{paymentDetailsTitle}</p>
                <PaymentForm onSubmit={handleFormSubmit} />
                <p className="text-md font-bold mb-6">
                  {paymentDetailsText.addressDetailsTitle}
                </p>
                <PaymentAddressDetails />
                <div className="flex justify-between mt-8">
                  <Button
                    onClick={handleBackClick}
                    tint="white"
                    variant="outline"
                    type="button"
                  >
                    {backButtonText}
                  </Button>

                  <Button
                    type="submit"
                    tint="yellow"
                    variant="solid"
                    disabled={isSubmitting}
                    form="payment-form"
                  >
                    {isSubmitting ? submittingButtonText : submitButtonText}
                  </Button>
                </div>
              </div>

              <div>
                <p className="text-md font-bold mb-6">
                  {directDebitDetailsTitle}
                </p>

                <div className="mb-6">
                  <PaymentSummary />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentDetails;
