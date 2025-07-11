"use client";

import { Button } from "@react-component-library/ui";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

import { Footer } from "@/components/Footer";
import { StepNavigationWithBasket } from "@/components/StepNavigationWithBasket";
import { otsCompleted } from "@/lib/otsCompleted";
import { getCICS } from "@/services/helpers/getCICS";
import { isBillingAddressesEqual } from "@/services/helpers/isBillingAddressEqual";
import { updateBasket } from "@/services/helpers/updateBasket";

import PaymentAddressDetails from "./components/PaymentAddressDetails";
import PaymentConfirmation from "./components/PaymentConfirmation";
import PaymentSummary from "./components/PaymentConfirmation/PaymentSummary";
import type { PaymentFormValues } from "./forms/formValues";
import { PaymentForm } from "./forms/PaymentForm";
import { paymentDetailsText } from "./PaymentDetailsProps";

export const PaymentDetails = () => {
  const store = useJoinFlowStore();
  const router = useRouter();
  const {
    setCurrentStep,
    basket,
    serviceAddress,
    billingAddress,
    paymentDetails,
    setPaymentDetails,
    setBasket,
  } = useJoinFlowStore();
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
    async (data: PaymentFormValues): Promise<boolean> => {
      setIsSubmitting(true);

      try {
        if (!basket?.id) {
          console.error("Basket ID is required to update basket");
          return false;
        }

        if (!serviceAddress) {
          console.error("Service address is required to update basket");
          return false;
        }

        let resolvedBillingAddress = undefined;

        if (data.sameAsServiceAddress) {
          resolvedBillingAddress = {
            line1: serviceAddress.line1,
            line2: serviceAddress.line2,
            line3: serviceAddress.line3,
            postcode: serviceAddress.postcode,
          };
        } else {
          resolvedBillingAddress = billingAddress
            ? {
                line1: billingAddress.line1,
                line2: billingAddress.line2,
                line3: billingAddress.line3,
                postcode: billingAddress.postcode,
              }
            : undefined;
        }

        const havePaymentDetailsChanged =
          data.accountholderName !== paymentDetails?.accountholderName ||
          data.accountNumber !== paymentDetails?.accountNumber ||
          data.sortCode !== paymentDetails?.sortCode ||
          !isBillingAddressesEqual(
            resolvedBillingAddress,
            paymentDetails?.billingAddress,
          );

        if (!havePaymentDetailsChanged) {
          setShowConfirmation(true);
          return false;
        }

        const result = await updateBasket(basket.id, {
          billingAddress: resolvedBillingAddress,
          optIns: {
            isAccountHolder: true,
          },
          payment: {
            bankAccountHolder: data.accountholderName,
            bankAccountNumber: data.accountNumber,
            bankSortCode: data.sortCode.replace(/-/g, ""),
          },
        });

        if (result.error) {
          console.error("Error updating basket:", result.error);
          setShowPaymentDetailsError(true);
          return false;
        }

        let contractInformation = "";
        let contractSummary = "";

        if (typeof basket?.id === "string") {
          const response = await getCICS(basket.id);
          if (response.success === true) {
            contractInformation = response.data.contractInformation;
            contractSummary = response.data.contractSummary;
          } else {
            router.push("/join-flow/payment-details/contract-retrieval-failed");
          }
        }

        setPaymentDetails({
          accountholderName: data.accountholderName,
          accountNumber: data.accountNumber,
          sortCode: data.sortCode,
          billingAddress: resolvedBillingAddress,
          sameAsServiceAddress: data.sameAsServiceAddress,
          isAccountHolder: data.isAccountHolder,
          termsAgreed: paymentDetails?.termsAgreed || false,
          directDebitAgreed: paymentDetails?.directDebitAgreed || false,
          creditSearchAgreed: paymentDetails?.creditSearchAgreed || false,
          allTermsAgreed: paymentDetails?.allTermsAgreed || false,
        });

        setBasket({
          ...basket,
          billingAddress: resolvedBillingAddress,
          payment: {
            bankAccountHolder: data.accountholderName,
            bankAccountNumber: data.accountNumber,
            bankSortCode: data.sortCode.replace(/-/g, ""),
          },
          cics: {
            summaryHref: contractSummary,
            informationHref: contractInformation,
          },
        });
        setShowPaymentDetailsError(false);
        setShowConfirmation(true);

        return true;
      } catch (error) {
        console.error("Error processing payment details:", error);
        setShowPaymentDetailsError(true);
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      basket,
      setBasket,
      paymentDetails,
      billingAddress,
      serviceAddress,
      setPaymentDetails,
      router,
    ],
  );

  const handleBackClick = useCallback(
    (event?: React.SyntheticEvent) => {
      if (event) {
        event.preventDefault();
      }

      // i.e. if the user has already switched, the switch failed or the switch option was skipped, no need to go back to OTS page
      if (!otsCompleted(store.switchingDetails)) {
        setCurrentStep(3);
        router.push("/join-flow/go-live-date");
      } else {
        setCurrentStep(3);
        router.push("/join-flow/one-touch-switching");
      }
    },
    [setCurrentStep, store, router],
  );

  const handleConfirmationBack = useCallback(() => {
    setShowConfirmation(false);
  }, []);

  const handleComplete = useCallback(() => {
    setCurrentStep(5);
    router.push("/join-flow/order-summary");
  }, [setCurrentStep, router]);

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
                    {paymentDetailsText.validationErrorMessage}
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
