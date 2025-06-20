"use client";

import {
  Button,
  InfoModal,
  useClickOutside,
} from "@react-component-library/ui";
import useJoinFlowStore from "@store/useJoinFlowStore";
import React, { useCallback, useEffect, useRef, useState } from "react";

import Stepper from "@/components/Stepper";
import { useClearFocus } from "@/hooks/useClearFocus";
import { submitBasket } from "@/services/helpers/submitBasket";
import { updateBasket } from "@/services/helpers/updateBasket";

import { AccessibilityModalContents } from "./AccessibilityModalContents";
import { AccessibilityRequirements } from "./AccessibilityRequirements";
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
  const { paymentDetails, setPaymentDetails, basket, setBasket } =
    useJoinFlowStore();
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [termsState, setTermsState] = useState({
    termsAgreed: false,
    directDebitAgreed: false,
    creditSearchAgreed: false,
  });

  const modalRef = useRef<HTMLDialogElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useClearFocus(modalRef, "close");

  const closeFunction = () => {
    if (modalRef.current) {
      modalRef.current.close();
      setIsModalOpen(false);
    }
  };

  useClickOutside(modalRef, isModalOpen, closeFunction);

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
    accessibilityRequirementsModalTitle,
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

  return (
    <div className="container mx-auto px-4 py-8">
      <Stepper />

      <div className="max-w-4xl mx-auto">
        <div className="bg-core-white p-8 rounded-md">
          <h1 className="text-2xl font-bold mb-6">{title}</h1>

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
            <AccessibilityRequirements
              onChange={() => {
                modalRef.current?.showModal();
                setIsModalOpen(true);
              }}
            />
          </div>

          <p className="text-md font-bold mb-6">{termsAndConditionsTitle}</p>
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
      <InfoModal
        title={accessibilityRequirementsModalTitle}
        titleStyling="md:text-md max-w-[500px]"
        modalRef={modalRef}
      >
        <AccessibilityModalContents closeModal={closeFunction} />
      </InfoModal>
    </div>
  );
};

export default PaymentConfirmation;
