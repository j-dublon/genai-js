import {
  Button,
  LoadingModal,
  useClickOutside,
} from "@react-component-library/ui";
import useJoinFlowStore from "@store/useJoinFlowStore";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { Footer } from "@/components/Footer";
import { StepNavigationWithBasket } from "@/components/StepNavigationWithBasket";
import { useClearFocus } from "@/hooks/useClearFocus";
import { useLoadingModal } from "@/hooks/useLoadingModal";
import { useScrollToElement } from "@/hooks/useScrollToElement";
import { createVulnerabilityAndAccessibility } from "@/services/helpers/createVulnerabilityAndAccessibility";
import { submitBasket } from "@/services/helpers/submitBasket";
import { updateBasket } from "@/services/helpers/updateBasket";

import { PaymentDocuments } from "../PaymentDocuments";
import { AccessibilityRequirements } from "./Accessibility/AccessibilityRequirements";
import { IncludedOffers } from "./IncludedOffers";
import PaymentAccountDetails from "./PaymentAccountDetails";
import { paymentConfirmationText, slides } from "./PaymentConfirmationProps";
import PaymentGoLiveDetails from "./PaymentGoLiveDetails";
import { paymentGoLiveText } from "./paymentGoLiveDetailsProps";
import PaymentTermsAndConditions from "./PaymentTermsAndConditions";

export const PaymentConfirmation = ({
  onGoBack,
  onComplete,
}: {
  onGoBack: () => void;
  onComplete: () => void;
}) => {
  const {
    paymentDetails,
    setPaymentDetails,
    basket,
    setBasket,
    affiliateSession,
    accessibilityRequirements,
    accessibilityCommunicationPreferences,
    setIsLoadingModalOpen,
    isLoadingModalOpen,
  } = useJoinFlowStore();
  const { loadingModalRef, slidesWithAssetPath } = useLoadingModal({
    isLoadingModalOpen,
    slides,
  });
  const scrollToTop = useScrollToElement("#paymentConfirmationContainer");

  const [termsAgreed, setTermsAgreed] = useState(false);
  const [termsState, setTermsState] = useState({
    termsAgreed: false,
    directDebitAgreed: false,
    creditSearchAgreed: false,
  });

  const [isGoLiveModalOpen, setIsGoLiveModalOpen] = useState(false);
  const goLiveModalRef = useRef<HTMLDialogElement>(null);

  const closeGoLiveModal = useCallback(() => {
    goLiveModalRef.current?.close();
    setIsGoLiveModalOpen(false);
  }, []);

  useClickOutside(goLiveModalRef, isGoLiveModalOpen, closeGoLiveModal);
  useClearFocus(goLiveModalRef, "close");

  useEffect(() => {
    scrollToTop();
  }, [scrollToTop]);

  useEffect(() => {
    if (paymentDetails) {
      setTermsState({
        termsAgreed: paymentDetails.termsAgreed || false,
        directDebitAgreed: paymentDetails.directDebitAgreed || false,
        creditSearchAgreed: paymentDetails.creditSearchAgreed || false,
      });
      setTermsAgreed(paymentDetails.allTermsAgreed || false);
    }
  }, [paymentDetails]);

  const {
    title,
    subtitle,
    disclaimer,
    accountDetailsTitle,
    backButtonText,
    signUpText,
    yourAgreementTitle,
  } = paymentConfirmationText;

  const handleBack = useCallback(
    (event?: React.SyntheticEvent) => {
      if (event) {
        event.preventDefault();
      }
      onGoBack();
    },
    [onGoBack],
  );

  const handleConfirm = useCallback(async () => {
    let vulnerabilityAndAccessibility;

    setIsLoadingModalOpen(true);
    if (accessibilityRequirements) {
      try {
        const result = await createVulnerabilityAndAccessibility(
          accessibilityRequirements,
          accessibilityCommunicationPreferences,
        );
        vulnerabilityAndAccessibility = result.vulnerabilityAndAccessibility;
      } catch (error) {
        console.error("Error creating vulnerability and accessibility:", error);
      }
    }

    if (paymentDetails) {
      setPaymentDetails({
        ...paymentDetails,
        termsAgreed: termsState.termsAgreed,
        directDebitAgreed: termsState.directDebitAgreed,
        creditSearchAgreed: termsState.creditSearchAgreed,
        allTermsAgreed: termsAgreed,
      });
    }

    if (!basket?.id) {
      console.error("Basket ID is required to update basket");
      setIsLoadingModalOpen(false);
      return;
    }

    try {
      const result = await updateBasket(basket.id, {
        optIns: {
          creditSearchAgreed: true,
          directDebitAgreed: true,
          termsAgreed: true,
        },
        vulnerabilityAndAccessibility,
      });

      if (result.error) {
        console.error(
          "Error updating opt ins on basket:",
          result.error.message || "Unknown error",
        );
        setIsLoadingModalOpen(false);
        return;
      }

      if (result.basket) {
        setBasket(result.basket);
      }

      try {
        const submitResult = await submitBasket(basket.id);

        if (submitResult.type === "error") {
          console.error(
            "Error submitting basket:",
            submitResult.error?.message ?? "Unknown error",
          );
          setIsLoadingModalOpen(false);
          return;
        }

        onComplete();
      } catch (error) {
        console.error("Unexpected error submitting basket:", error);
        setIsLoadingModalOpen(false);
      }
    } catch (error) {
      console.error("Unexpected error updating opt ins on basket:", error);
      setIsLoadingModalOpen(false);
    }
  }, [
    paymentDetails,
    basket,
    onComplete,
    setPaymentDetails,
    accessibilityRequirements,
    accessibilityCommunicationPreferences,
    termsState.termsAgreed,
    termsState.directDebitAgreed,
    termsState.creditSearchAgreed,
    termsAgreed,
    setBasket,
    setIsLoadingModalOpen,
  ]);

  const handleTermsChange = useCallback(
    (
      allChecked: boolean,
      termState: {
        termsAgreed: boolean;
        directDebitAgreed: boolean;
        creditSearchAgreed: boolean;
      },
    ) => {
      setTermsAgreed(allChecked);
      setTermsState(termState);
    },
    [],
  );

  const documentItems = [
    {
      text: "Contract Summary",
      href: basket?.cics?.summaryHref || "/",
      name: "contractSummary",
    },
    {
      text: "Contract Information",
      href: basket?.cics?.informationHref || "/",
      name: "contractInformation",
    },
    {
      text: "Terms & Conditions",
      href: affiliateSession?.displayItems?.termsAndConditionsLink || "/",
      name: "termsAndConditions",
    },
    {
      text: "Privacy Notice",
      href: affiliateSession?.displayItems?.privacyPolicyLink || "/",
      name: "privacyPolicy",
    },
  ];

  return (
    <div id="paymentConfirmationContainer">
      <StepNavigationWithBasket step={4} hideBasket hideLabels />
      <div className="container mx-auto px-4 pt-8 md:mb-16">
        <div className="max-w-xl mx-auto">
          <div className="bg-core-white pt-8 px-2 rounded-md">
            <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>
            <p className="text-md mb-10 text-center">{subtitle}</p>

            <PaymentDocuments
              title="Your Cuckoo Documents"
              disclaimer={disclaimer}
              items={documentItems}
            />

            <p className="text-sm md:text-md font-bold mb-4 md:mb-6 mt-10 md:mt-12">
              {accountDetailsTitle}
            </p>
            <PaymentAccountDetails />

            <p className="text-sm md:text-md font-bold mb-4 md:mb-6 mt-10 md:mt-12">
              {paymentGoLiveText.title}
            </p>
            <PaymentGoLiveDetails />

            <div className="mt-10 md:mt-12">
              <AccessibilityRequirements />
            </div>

            <IncludedOffers />

            <p
              className="text-sm md:text-md font-bold mt-10 md:mt-12 mb-4 md:mb-6"
              data-testid="termsAndConditions"
            >
              {yourAgreementTitle}
            </p>
            <PaymentTermsAndConditions
              onChange={handleTermsChange}
              initialState={termsState}
            />

            <div className="mt-10 md:mt-12">
              <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-6">
                <Button
                  onClick={handleBack}
                  tint="white"
                  variant="outline"
                  type="button"
                  fullWidth
                >
                  {backButtonText}
                </Button>

                <Button
                  onClick={handleConfirm}
                  tint="yellow"
                  variant="solid"
                  type="button"
                  fullWidth
                  disabled={!termsAgreed}
                >
                  {signUpText}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-10 md:hidden border-ui-grey-300 bg-ui-grey-300 border w-full" />
      </div>
      <Footer />
      <LoadingModal
        modalRef={loadingModalRef}
        slides={slidesWithAssetPath}
        loading={isLoadingModalOpen}
      />
    </div>
  );
};

export default PaymentConfirmation;
