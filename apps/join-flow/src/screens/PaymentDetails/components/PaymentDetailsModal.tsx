"use client";

import { InfoModal } from "@react-component-library/ui";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { useEffect, useRef, useState } from "react";

import {
  FormValues,
  PaymentFormValues,
} from "@/screens/PaymentDetails/forms/formValues";
import { PaymentForm } from "@/screens/PaymentDetails/forms/PaymentForm";

interface PaymentDetailsModalProps {
  onSave?: () => Promise<void>;
}

export const PaymentDetailsModal = ({ onSave }: PaymentDetailsModalProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const { paymentDetails, setPaymentDetails } = useJoinFlowStore();
  const formSubmitRef = useRef<((data: FormValues) => Promise<void>) | null>(
    null,
  );
  const [showingModal, setShowingModal] = useState(false);
  const [initialValues, setInitialValues] = useState<{
    accountholderName: string;
    accountNumber: string;
    sortCode: string;
  } | null>(null);

  const [fieldsModified, setFieldsModified] = useState(false);

  useEffect(() => {
    if (showingModal && paymentDetails) {
      setInitialValues({
        accountholderName: paymentDetails.accountholderName || "",
        accountNumber: paymentDetails.accountNumber || "",
        sortCode: paymentDetails.sortCode || "",
      });

      setFieldsModified(false);
    }
  }, [showingModal, paymentDetails]);

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

  useEffect(() => {
    if (!showingModal) return;

    const formInputs = document.querySelectorAll('input[type="text"]');

    const handleInputChange = () => {
      if (!initialValues) return;

      const currentAccountHolderName =
        (document.getElementById("accountholderName") as HTMLInputElement)
          ?.value || "";
      const currentAccountNumber =
        (document.getElementById("accountNumber") as HTMLInputElement)?.value ||
        "";
      const currentSortCode =
        (document.getElementById("sortCode") as HTMLInputElement)?.value || "";

      const isModified =
        currentAccountHolderName !== initialValues.accountholderName ||
        currentAccountNumber !== initialValues.accountNumber ||
        currentSortCode !== initialValues.sortCode;

      setFieldsModified(isModified);

      if (isModified) {
        const checkbox = document.querySelector(
          'input[name="isAccountHolder"]',
        ) as HTMLInputElement;
        if (checkbox && checkbox.checked) {
          checkbox.checked = false;
        }
      } else {
        if (paymentDetails?.isAccountHolder) {
          const checkbox = document.querySelector(
            'input[name="isAccountHolder"]',
          ) as HTMLInputElement;
          if (checkbox) {
            checkbox.checked = true;
          }
        }
      }
    };

    formInputs.forEach((input) => {
      input.addEventListener("input", handleInputChange);
    });

    return () => {
      formInputs.forEach((input) => {
        input.removeEventListener("input", handleInputChange);
      });
    };
  }, [showingModal, initialValues, paymentDetails]);

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

  const handleSubmit = async (data: PaymentFormValues) => {
    if (!data.isAccountHolder) {
      const checkbox = document.querySelector(
        'input[name="isAccountHolder"]',
      ) as HTMLInputElement;
      if (checkbox) {
        showError(checkbox);
      }
      return;
    }

    const paymentData = {
      accountholderName: data.accountholderName,
      cardToken: "bank_account",
      accountNumber: data.accountNumber,
      sortCode: data.sortCode,
      sameAsServiceAddress: data.sameAsServiceAddress ?? true,
      isAccountHolder: data.isAccountHolder,
      billingAddress: paymentDetails?.billingAddress || null,
      termsAgreed: paymentDetails?.termsAgreed || false,
      directDebitAgreed: paymentDetails?.directDebitAgreed || false,
      creditSearchAgreed: paymentDetails?.creditSearchAgreed || false,
      allTermsAgreed: paymentDetails?.allTermsAgreed || false,
    };

    setPaymentDetails(paymentData);
    setShowingModal(false);
    modalRef.current?.close();

    if (onSave) await onSave();
  };

  const setFormSubmitHandler = (
    submitHandler: (data: FormValues) => Promise<void>,
  ) => {
    formSubmitRef.current = submitHandler;
  };

  const openModal = () => {
    setShowingModal(true);
    modalRef.current?.showModal();

    setTimeout(() => {
      if (paymentDetails?.isAccountHolder && !fieldsModified) {
        const checkbox = document.querySelector(
          'input[name="isAccountHolder"]',
        ) as HTMLInputElement;
        if (checkbox) {
          checkbox.checked = true;
        }
      }
    }, 0);
  };

  const handleSaveClick = () => {
    const form = document.getElementById("payment-form") as HTMLFormElement;

    if (form) {
      form.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true }),
      );
    }
  };

  const validateBeforeClose = (): boolean => {
    const checkbox = document.querySelector(
      'input[name="isAccountHolder"]',
    ) as HTMLInputElement;

    if (!checkbox || !checkbox.checked) {
      showError(checkbox);
      return false;
    }

    return true;
  };

  return (
    <>
      <InfoModal
        title="Change your direct debit details"
        modalRef={modalRef}
        buttonText="Save changes"
        onButtonClick={handleSaveClick}
        validateBeforeClose={validateBeforeClose}
      >
        <p className="mb-6 mt-6 text-ui-grey-500 font-bold">
          Enter your new details in the form below, then hit save.
        </p>
        <PaymentForm
          onSubmit={handleSubmit}
          setSubmitHandler={setFormSubmitHandler}
        />
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
