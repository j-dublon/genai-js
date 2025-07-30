"use client";

import { Button, LoadingModal, TipCard } from "@react-component-library/ui";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

import { Footer } from "@/components/Footer";
import { StepNavigationWithBasket } from "@/components/StepNavigationWithBasket";
import { useLoadingModal } from "@/hooks/useLoadingModal";
import { getAssetPath } from "@/lib/get-asset-path";
import { otsCompleted } from "@/lib/otsCompleted";
import { getCICS } from "@/services/helpers/getCICS";
import { isBillingAddressesEqual } from "@/services/helpers/isBillingAddressEqual";
import { updateBasket } from "@/services/helpers/updateBasket";

import PaymentAddressDetails from "./components/PaymentAddressDetails";
import PaymentConfirmation from "./components/PaymentConfirmation";
import PaymentSummary from "./components/PaymentConfirmation/PaymentSummary";
import type { PaymentFormValues } from "./forms/formValues";
import { PaymentForm } from "./forms/PaymentForm";
import { paymentDetailsText, slides } from "./PaymentDetailsProps";

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
    isLoadingModalOpen,
    setIsLoadingModalOpen,
  } = useJoinFlowStore();
  const { loadingModalRef, slidesWithAssetPath } = useLoadingModal({
    isLoadingModalOpen,
    slides,
  });
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
    subtitle,
    tipCardText,
    tipCardSubtitle,
    addressDetailsTitle,
    validationErrorMessage,
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

        setIsLoadingModalOpen(true);
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
          setIsLoadingModalOpen(false);
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
        setIsLoadingModalOpen(false);
        return true;
      } catch (error) {
        console.error("Error processing payment details:", error);
        setShowPaymentDetailsError(true);
        setIsLoadingModalOpen(false);
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
      setIsLoadingModalOpen,
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

  const subheadingStyling =
    "text-sm leading-[1.6] md:text-md md:leading-[1.5] font-semibold";

  return (
    <>
      <StepNavigationWithBasket step={4} />
      <div className="container mx-auto md:pb-16 lg:pt-16 flex justify-center">
        <div className="bg-core-white rounded-md flex flex-col w-full max-w-[1194px] mx-5">
          <div className="flex flex-col gap-4 md:gap-5 items-center text-center py-10 md:py-14">
            <h1 className="md:text-3xl md:leading-[1.4] text-[26px] leading-[1.5] font-semibold">
              {title}
            </h1>
            <p className="max-w-[350px] md:max-w-[525px] text-xs md:text-md md:leading-[1.3] font-normal leading-[1.6]">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-16">
            <div className="flex flex-col gap-6 md:gap-12 md:w-1/2">
              <div className="flex flex-col gap-4 md:gap-6">
                <p className={subheadingStyling}>{paymentDetailsTitle}</p>
                <PaymentForm onSubmit={handleFormSubmit} />
                {showPaymentDetailsError && (
                  <p className="text-sm text-ui-error mb-6">
                    {validationErrorMessage}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-4 md:gap-6">
                <p className={subheadingStyling}>{addressDetailsTitle}</p>
                <PaymentAddressDetails />
              </div>
            </div>

            <div className="flex flex-col gap-4 md:gap-6 md:w-1/2">
              <p className={subheadingStyling}>{directDebitDetailsTitle}</p>
              <PaymentSummary />
              {tipCardText && tipCardSubtitle && (
                <TipCard
                  subtitle={tipCardSubtitle}
                  image={getAssetPath("/images/linked-hands.svg")}
                  backgroundColor="green"
                  subtitleColor="teal"
                  className="mt-2 md:mt-0"
                  hideImageOnMobile
                >
                  {tipCardText}
                </TipCard>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:w-[calc(50%-16px)] mt-10 md:mt-12">
            <div className="w-full md:w-[20%]">
              <Button
                onClick={handleBackClick}
                tint="white"
                variant="outline"
                type="button"
                fullWidth
              >
                {backButtonText}
              </Button>
            </div>
            <div className="w-full md:w-[80%]">
              <Button
                type="submit"
                tint="yellow"
                variant="solid"
                disabled={isSubmitting}
                form="payment-form"
                fullWidth
              >
                {isSubmitting ? submittingButtonText : submitButtonText}
              </Button>
            </div>
          </div>
          <hr className="mt-10 md:hidden border-ui-grey-300 bg-ui-grey-300 border w-full" />
        </div>
      </div>
      <Footer />
      <LoadingModal
        modalRef={loadingModalRef}
        slides={slidesWithAssetPath}
        loading={isLoadingModalOpen}
      />
    </>
  );
};

export default PaymentDetails;
