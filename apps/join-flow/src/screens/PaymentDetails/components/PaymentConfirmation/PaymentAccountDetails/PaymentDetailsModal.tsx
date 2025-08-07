"use client";

import {
  AccessibleLoadingEgg,
  Button,
  InfoModal,
} from "@react-component-library/ui";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { useEffect, useRef, useState } from "react";

import { PaymentFormValues } from "@/screens/PaymentDetails/forms/formValues";
import { PaymentForm } from "@/screens/PaymentDetails/forms/PaymentForm";
import { updateBasket } from "@/services/helpers/updateBasket";

import {
  paymentAccountDetailsText,
  paymentDetailsModalText,
} from "./PaymentAccountDetailsProps";

export const PaymentDetailsModal = () => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const { paymentDetails, basket } = useJoinFlowStore();
  const [showingModal, setShowingModal] = useState(false);
  const [showPaymentDetailsError, setShowPaymentDetailsError] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  useEffect(() => {
    const dialog = modalRef.current;
    if (!dialog || !showingModal) return;

    const originalClose = dialog.close;

    dialog.close = function () {
      originalClose.apply(dialog);
      setShowingModal(false);
    };

    return () => {
      if (dialog) {
        dialog.close = originalClose;
      }
    };
  }, [showingModal]);

  const showError = (checkbox: HTMLInputElement) => {
    let errorElement = document.getElementById("account-holder-error");

    if (!errorElement) {
      errorElement = document.createElement("p");
      errorElement.id = "account-holder-error";
      errorElement.className = "text-ui-error text-sm mt-2 ml-8";
      const container = checkbox.closest("#account-holder-container");
      if (container) {
        container.appendChild(errorElement);
      }
    }

    errorElement.textContent =
      "You must confirm that you are the account holder";
    checkbox.classList.add("border-ui-error");
  };

  const handleSubmit = async (data: PaymentFormValues): Promise<boolean> => {
    if (!data.isAccountHolder) {
      const checkbox = document.querySelector(
        'input[name="isAccountHolder"]',
      ) as HTMLInputElement;
      if (checkbox) {
        showError(checkbox);
      }
      return false;
    }

    setIsFormSubmitting(true);
    try {
      if (!basket?.id) {
        console.error("Basket ID is required to update basket");
        return false;
      }

      // Check if any details have changed to avoid unnecessary API calls
      const havePaymentDetailsChanged =
        data.accountholderName !== paymentDetails?.accountholderName ||
        data.accountNumber !== paymentDetails?.accountNumber ||
        data.sortCode !== paymentDetails?.sortCode;

      if (!havePaymentDetailsChanged) {
        setShowingModal(false);
        modalRef.current?.close();
        return false;
      }

      const result = await updateBasket(basket.id, {
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

      setShowPaymentDetailsError(false);
      setShowingModal(false);
      modalRef.current?.close();

      return true;
    } catch (error) {
      console.error("Error processing payment details:", error);
      setShowPaymentDetailsError(true);

      return false;
    } finally {
      setIsFormSubmitting(false);
    }
  };

  const openModal = () => {
    setShowingModal(true);
    modalRef.current?.showModal();
  };

  return (
    <>
      <InfoModal title={paymentDetailsModalText.title} modalRef={modalRef}>
        <p className="mb-6 mt-6 text-ui-grey-500 font-semibold">
          {paymentDetailsModalText.formInstructions}
        </p>
        <PaymentForm onSubmit={handleSubmit} />
        {showPaymentDetailsError && (
          <p className="text-sm text-ui-error mb-6">
            {paymentAccountDetailsText.validationErrorMessage}
          </p>
        )}
        <div className="flex justify-end">
          <Button
            type="submit"
            form="payment-form"
            size="small"
            variant="solid"
            tint="yellow"
            aria-label="Save changes and close modal"
            disabled={isFormSubmitting}
          >
            {isFormSubmitting ? (
              <div className="flex items-center gap-2">
                <AccessibleLoadingEgg />
                {paymentDetailsModalText.loading}
              </div>
            ) : (
              paymentDetailsModalText.saveChanges
            )}
          </Button>
        </div>
      </InfoModal>

      <span
        style={{ display: "none" }}
        id="openModalTrigger"
        onClick={openModal}
      ></span>
    </>
  );
};

export const openPaymentDetailsModal = () => {
  document.getElementById("openModalTrigger")?.click();
};

export default PaymentDetailsModal;
