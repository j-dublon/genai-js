"use client";

import { useClickOutside } from "@react-component-library/ui";
import React, { useRef, useState } from "react";

import { useClearFocus } from "@/hooks/useClearFocus";
import { formatServiceAddress } from "@/lib/formatServiceAddress";
import { PaymentAddressModal } from "@/screens/PaymentDetails/components/PaymentAddressModal/index";
import useJoinFlowStore from "@/store/useJoinFlowStore";

import { paymentConfirmationText } from "./PaymentConfirmation/PaymentConfirmationProps";

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
    <div className="bg-ui-grey-100 p-6 rounded-md">
      <h3 className="font-bold">{addressDetailsLabel}</h3>

      <div className="flex justify-between items-center mt-4">
        <div>
          {serviceAddress && (
            <div className="text-sm">
              {formatServiceAddress(serviceAddress)}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-ui-grey-300 pt-4 mt-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">{billingAddressLabel}</h3>
        </div>
      </div>

      <div>
        {displayBillingAddress && (
          <div className="text-sm text-ui-grey-500 mt-2">
            {formatServiceAddress(displayBillingAddress)}
          </div>
        )}
        {!displayBillingAddress && (
          <div className="text-sm text-ui-grey-400 italic">
            No billing address set
          </div>
        )}
      </div>

      <button
        type="button"
        className="font-normal underline font-semibold text-ui-link cursor-pointer bg-transparent border-none p-0 mt-2"
        onClick={handleChangeMyDetails}
      >
        Change my billing address
      </button>

      <PaymentAddressModal
        modalRef={modalRef}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default PaymentAddressDetails;
