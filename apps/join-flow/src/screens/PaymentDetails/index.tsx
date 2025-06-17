"use client";

import { Button } from "@react-component-library/ui";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

import { Footer } from "@/components/Footer";
import { StepNavigationWithBasket } from "@/components/StepNavigationWithBasket";
import { updateBasket } from "@/services/helpers/updateBasket";

import PaymentAddressDetails from "./components/PaymentAddressDetails";
import PaymentConfirmation from "./components/PaymentConfirmation";
import PaymentSummary from "./components/PaymentConfirmation/PaymentSummary";
import type { PaymentFormValues } from "./forms/formValues";
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
  const { setCurrentStep, basket, serviceAddress } = useJoinFlowStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPaymentDetailsError, setShowPaymentDetailsError] = useState(false);

  const {
    title,
    paymentDetailsTitle,
    directDebitDetailsTitle,
    backButtonText,
    submitButtonText,
    submittingButtonText,
  } = paymentDetailsText;

  const handleFormSubmit = useCallback(
    async (data: PaymentFormValues) => {
      setIsSubmitting(true);

      try {
        if (!basket?.id) {
          console.error("Basket ID is required to update basket");
          return;
        }

        if (!serviceAddress) {
          console.error("Service address is required to update basket");
          return;
        }

        let billingAddress = null;

        if (data.sameAsServiceAddress) {
          billingAddress = {
            line1: serviceAddress.line1,
            line2: serviceAddress.line2,
            line3: serviceAddress.line3,
            postcode: serviceAddress.postcode,
          };
        } else {
          // TODO: Handle different address (change billing address modal)
          billingAddress = {
            line1: serviceAddress.line1,
            line2: serviceAddress.line2,
            line3: serviceAddress.line3,
            postcode: serviceAddress.postcode,
          };
        }

        const result = await updateBasket(basket.id, {
          billingAddress,
          payment: {
            bankAccountHolder: data.accountholderName,
            bankAccountNumber: data.accountNumber,
            bankSortCode: data.sortCode.replace(/-/g, ""),
          },
        });

        if (result.error) {
          console.error("Error updating basket:", result.error);
          setShowPaymentDetailsError(true);
          return;
        }

        setShowPaymentDetailsError(false);
        setShowConfirmation(true);
      } catch (error) {
        console.error("Error processing payment details:", error);
        setShowPaymentDetailsError(true);
      } finally {
        setIsSubmitting(false);
      }
    },
    [basket?.id, serviceAddress],
  );

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
      <StepNavigationWithBasket step={4} />
      <div className="container mx-auto px-4 pb-8 pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-core-white p-8 rounded-md">
            <h1 className="text-2xl font-bold mb-6">{title}</h1>

            <div className="flex flex-row gap-8">
              <div className="w-96">
                <p className="text-md font-bold mb-6">{paymentDetailsTitle}</p>
                <PaymentForm onSubmit={handleFormSubmit} />
                {showPaymentDetailsError && (
                  <p className="text-sm text-ui-error mb-6">
                    Unable to validate bank details, please check your details
                    and try again.
                  </p>
                )}
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

              <div className="flex-1">
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
