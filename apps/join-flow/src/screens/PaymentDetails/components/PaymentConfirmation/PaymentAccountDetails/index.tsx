"use client";

import useJoinFlowStore from "@store/useJoinFlowStore";
import React from "react";

import {
  openPaymentDetailsModal,
  PaymentDetailsModal,
} from "@/screens/PaymentDetails/components/PaymentConfirmation/PaymentAccountDetails/PaymentDetailsModal";

import { paymentConfirmationText } from "../PaymentConfirmationProps";
import { paymentAccountDetailsText } from "./PaymentAccountDetailsProps";

export const PaymentAccountDetails = () => {
  const { paymentDetails } = useJoinFlowStore();

  const { accountHolderLabel, accountNumberLabel, sortCodeLabel } =
    paymentConfirmationText;

  const handleChangeMyDetails = () => {
    openPaymentDetailsModal();
  };

  return (
    <>
      <div className="bg-ui-grey-100 p-6 rounded-md">
        <h3 className="mb-2">
          <span className="font-semibold">{accountHolderLabel}</span>{" "}
          <span className="font-normal">
            {paymentDetails?.accountholderName}
          </span>
        </h3>

        <h3 className="mb-2">
          <span className="font-bold">{accountNumberLabel}</span>{" "}
          <span className="font-normal">{paymentDetails?.accountNumber}</span>
        </h3>

        <h3>
          <span className="font-bold">{sortCodeLabel}</span>{" "}
          <span className="font-normal">{paymentDetails?.sortCode}</span>
        </h3>

        <button
          type="button"
          className="font-normal underline font-semibold text-ui-link cursor-pointer bg-transparent border-none p-0 mt-2"
          onClick={handleChangeMyDetails}
        >
          {paymentAccountDetailsText.changeMyDetails}
        </button>
      </div>

      <PaymentDetailsModal />
    </>
  );
};

export default PaymentAccountDetails;
