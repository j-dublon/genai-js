"use client";

import { Button } from "@react-component-library/ui";
import useJoinFlowStore, { StoreBasket } from "@store/useJoinFlowStore";
import React, { useCallback, useEffect, useState } from "react";

import { StepNavigationWithBasket } from "@/components/StepNavigationWithBasket";
import { createVulnerabilityAndAccessibility } from "@/services/helpers/createVulnerabilityAndAccessibility";
import { submitBasket } from "@/services/helpers/submitBasket";
import { updateBasket } from "@/services/helpers/updateBasket";
import { payloadAPI } from "@/services/payloadClient";

import { PaymentDocuments } from "../PaymentDocuments";
import { AccessibilityRequirements } from "./Accessibility/AccessibilityRequirements";
import PaymentAccountDetails from "./PaymentAccountDetails";
import { paymentConfirmationText } from "./PaymentConfirmationProps";
import PaymentGoLiveDetails from "./PaymentGoLiveDetails";
import PaymentSummary from "./PaymentSummary";
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
    selectedPackage,
    eeroSelection,
    accessibilityRequirements,
    accessibilityCommunicationPreferences,
  } = useJoinFlowStore();
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [termsState, setTermsState] = useState({
    termsAgreed: false,
    directDebitAgreed: false,
    creditSearchAgreed: false,
  });

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
    accountDetailsTitle,
    goLiveDetailsTitle,
    directDebitDetailsTitle,
    backButtonText,
    signUpText,
    termsAndConditionsTitle,
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
        console.error("Error updating opt ins on basket:", result.error);
        return;
      }

      if (result.basket) {
        setBasket(result.basket);
      }

      try {
        const submitResult = await submitBasket(basket.id);

        if (submitResult.type === "error") {
          console.error("Error submitting basket:", submitResult.error);
          return;
        }

        onComplete();
      } catch (error) {
        console.error("Unexpected error submitting basket:", error);
      }
    } catch (error) {
      console.error("Unexpected error updating opt ins on basket:", error);
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

  const [contractSummary, setContractSummary] = useState("/");
  const [contractInformation, setContractInformation] = useState("/");

  useEffect(() => {
    const getContractLinks = async () => {
      if (typeof basket?.id === "string") {
        try {
          const response: StoreBasket["cics"] = await payloadAPI.getCICS(
            basket.id,
          );

          if (response && response.summaryHref && response.informationHref) {
            setContractSummary(response.summaryHref);
            setContractInformation(response.informationHref);
          }
        } catch (error) {
          // If we can't fetch CI/CS we can't finish the sale, need to redirect to an 'Oops' page
          console.log("error: ", error);
        }
      }
    };
    getContractLinks();
  }, [basket?.id, selectedPackage, eeroSelection]);

  const documentItems = [
    {
      text: "Contract Summary",
      href: contractSummary,
      name: "contractSummary",
    },
    {
      text: "Contract Information",
      href: contractInformation,
      name: "contractInformation",
    },
    {
      text: "Terms & Conditions",
      href: affiliateSession?.termsAndConditionsLink || "/",
      name: "termsAndConditions",
    },
    {
      text: "Privacy Notice",
      href: affiliateSession?.privacyPolicyLink || "/",
      name: "privacyPolicy",
    },
  ];

  return (
    <>
      <StepNavigationWithBasket step={4} hideBasket hideLabels />
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-xl mx-auto">
          <div className="bg-core-white p-8 rounded-md">
            <h1 className="text-2xl font-bold mb-6">{title}</h1>

            <PaymentDocuments
              title="Your Cuckoo Documents"
              disclaimer="Please read and download the following before joining Cuckoo:"
              items={documentItems}
            />

            <p className="text-md font-bold mb-6">{directDebitDetailsTitle}</p>

            <div className="mb-6">
              <PaymentSummary />
            </div>
            <p className="text-md font-bold mb-6">{accountDetailsTitle}</p>
            <div className="mb-6">
              <PaymentAccountDetails />
            </div>

            <p className="text-md font-bold mb-6">{goLiveDetailsTitle}</p>
            <div className="mb-6">
              <PaymentGoLiveDetails />
            </div>

            <div className="mb-6">
              <AccessibilityRequirements />
            </div>

            <p
              className="text-md font-bold mb-6"
              data-testid="termsAndConditions"
            >
              {termsAndConditionsTitle}
            </p>
            <div className="mb-6">
              <PaymentTermsAndConditions
                onChange={handleTermsChange}
                initialState={termsState}
              />
            </div>

            <div className="mt-8">
              <div className="flex justify-between">
                <Button
                  onClick={handleBack}
                  tint="white"
                  variant="outline"
                  type="button"
                >
                  {backButtonText}
                </Button>

                <Button
                  onClick={handleConfirm}
                  tint="yellow"
                  variant="solid"
                  type="button"
                  disabled={!termsAgreed}
                >
                  {signUpText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentConfirmation;
