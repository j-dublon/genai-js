"use client";

import { useClickOutside } from "@react-component-library/ui";
import { useRef, useState } from "react";

import { useClearFocus } from "@/hooks/useClearFocus";
import { formatServiceAddress } from "@/lib/formatServiceAddress";
import { PaymentAddressModal } from "@/screens/PaymentDetails/components/PaymentAddressModal/index";
import useJoinFlowStore from "@/store/useJoinFlowStore";

import { paymentConfirmationText } from "../PaymentConfirmation/PaymentConfirmationProps";
import { paymentAddressDetailsText } from "./PaymentAddressDetailsProps";

export const PaymentAddressDetails = () => {
  const { addressDetailsLabel, billingAddressLabel } = paymentConfirmationText;
  const { serviceAddress, billingAddress } = useJoinFlowStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef<HTMLDialogElement>(null);

  const closePaymentAddressDetailsModal = () => {
    modalRef.current?.close();
    setIsModalOpen(false);
  };

  useClickOutside(modalRef, isModalOpen, closePaymentAddressDetailsModal);
  useClearFocus(modalRef, "close");

  const displayBillingAddress = billingAddress || serviceAddress;

  const handleChangeMyDetails = () => {
    modalRef.current?.showModal();
    setIsModalOpen(true);
  };

  return (
    <div className="bg-ui-grey-100 p-6 rounded-lg md:rounded-md">
      <h3 className="text-xs md:text-sm font-medium">{addressDetailsLabel}</h3>

      {serviceAddress && (
        <div className="text-xs md:text-sm mt-3 md:mt-4">
          {formatServiceAddress(serviceAddress)}
        </div>
      )}

      <div className="border-t border-ui-grey-400 pt-4 mt-4">
        <h3 className="text-xs md:text-sm font-medium">
          {billingAddressLabel}
        </h3>
      </div>

      <div
        className={`text-xs md:text-sm mt-3 md:mt-4 ${!displayBillingAddress ? "text-ui-grey-400 italic" : ""}`}
      >
        {displayBillingAddress
          ? formatServiceAddress(displayBillingAddress)
          : paymentAddressDetailsText.noBillingAddressSet}
      </div>

      <button
        type="button"
        className="text-xs md:text-sm font-medium underline text-ui-link cursor-pointer bg-transparent border-none p-0 mt-4"
        onClick={handleChangeMyDetails}
      >
        {paymentAddressDetailsText.changeBillingAddress}
      </button>

      <PaymentAddressModal
        modalRef={modalRef}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default PaymentAddressDetails;
