"use client";

import { Button } from "@react-component-library/ui";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

import Stepper from "@/components/molecules/Stepper";
import PaymentConfirmation from "@/components/pages/PaymentDetails/PaymentConfirmation";
import PaymentSummary from "@/components/pages/PaymentDetails/PaymentSummary";
import { usePaymentForm } from "@/hooks/usePaymentForm";
import { PaymentFormValues } from "@/hooks/usePaymentForm";

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

  const [isAccountHolderNameValid, setIsAccountHolderNameValid] =
    useState(false);
  const [isAccountNumberValid, setIsAccountNumberValid] = useState(false);
  const [isSortCodeValid, setIsSortCodeValid] = useState(false);

  const { register, handleSubmit, errors, savePaymentDetails } =
    usePaymentForm();

  const {
    title,
    paymentDetailsTitle,
    directDebitDetailsTitle,
    monthlyPaymentTitle,
    totalMonthlyPaymentTitle,
    futurePriceIncreaseText,
    accountHolderNamePlaceholder,
    accountHolderNameError,
    accountNumberPlaceholder,
    accountNumberError,
    sortCodePlaceholder,
    sortCodeError,
    backButtonText,
    submitButtonText,
    submittingButtonText,
  } = paymentDetailsText;

  const handleAccountHolderNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsAccountHolderNameValid(e.target.value.trim().length > 0);
  };

  const handleAccountNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsAccountNumberValid(/^\d{8}$/.test(e.target.value));
  };

  const handleSortCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSortCodeValid(/^\d{2}-\d{2}-\d{2}$/.test(e.target.value));
  };

  const handleFormSubmit = useCallback(
    (data: PaymentFormValues) => {
      setIsSubmitting(true);

      try {
        savePaymentDetails(data);
        setIsSubmitting(false);
        setShowConfirmation(true);
      } catch (error) {
        console.error("Error processing payment details:", error);
        setIsSubmitting(false);
      }
    },
    [savePaymentDetails],
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
    <div className="container mx-auto px-4 py-8">
      <Stepper />

      <div className="max-w-4xl mx-auto">
        <div className="bg-core-white p-8 rounded-md">
          <h1 className="text-2xl font-bold mb-6">{title}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-md font-bold mb-6">{paymentDetailsTitle}</p>
              <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
                <div className="mb-6">
                  <div className="relative">
                    <input
                      {...register("accountHolderName", { required: true })}
                      id="accountHolderName"
                      placeholder={accountHolderNamePlaceholder}
                      className="w-full px-4 py-2 border border-ui-grey-300 rounded-md focus:outline-none"
                      onChange={handleAccountHolderNameChange}
                    />
                    {isAccountHolderNameValid && (
                      <svg
                        className="w-5 h-5 text-green-500 absolute right-3 top-1/2 transform -translate-y-1/2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  {errors.accountHolderName && (
                    <p className="text-red-500 text-sm mt-1">
                      {accountHolderNameError}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <div className="relative">
                    <input
                      {...register("accountNumber", {
                        required: true,
                        pattern: /^\d{8}$/,
                      })}
                      id="accountNumber"
                      placeholder={accountNumberPlaceholder}
                      className="w-full px-4 py-2 border border-ui-grey-300 rounded-md focus:outline-none"
                      onChange={handleAccountNumberChange}
                    />
                    {isAccountNumberValid && (
                      <svg
                        className="w-5 h-5 text-green-500 absolute right-3 top-1/2 transform -translate-y-1/2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  {errors.accountNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {accountNumberError}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <div className="relative">
                    <input
                      {...register("sortCode", {
                        required: true,
                        pattern: /^\d{2}-\d{2}-\d{2}$/,
                      })}
                      id="sortCode"
                      placeholder={sortCodePlaceholder}
                      className="w-full px-4 py-2 border border-ui-grey-300 rounded-md focus:outline-none"
                      onChange={handleSortCodeChange}
                    />
                    {isSortCodeValid && (
                      <svg
                        className="w-5 h-5 text-green-500 absolute right-3 top-1/2 transform -translate-y-1/2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  {errors.sortCode && (
                    <p className="text-red-500 text-sm mt-1">{sortCodeError}</p>
                  )}
                </div>

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
                  >
                    {isSubmitting ? submittingButtonText : submitButtonText}
                  </Button>
                </div>
              </form>
            </div>

            <div>
              <p className="text-md font-bold mb-6">
                {directDebitDetailsTitle}
              </p>

              <div className="mb-6">
                <PaymentSummary
                  monthlyPaymentTitle={monthlyPaymentTitle}
                  totalMonthlyPaymentTitle={totalMonthlyPaymentTitle}
                  futurePriceIncreaseText={futurePriceIncreaseText}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
