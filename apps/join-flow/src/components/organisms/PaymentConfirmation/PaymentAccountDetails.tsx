"use client";

import useJoinFlowStore from "@store/useJoinFlowStore";
import React from "react";

import { paymentConfirmationText } from "./PaymentConfirmationProps";

export const PaymentAccountDetails = ({}) => {
  const { paymentDetails } = useJoinFlowStore();

  const { accountHolderLabel, accountNumberLabel, sortCodeLabel } =
    paymentConfirmationText;

  return (
    <div className="bg-ui-grey-100 p-6 rounded-md">
      <h3 className="mb-2">
        <span className="font-bold">{accountHolderLabel}</span>{" "}
        <span className="font-normal">{paymentDetails?.cardholderName}</span>
      </h3>

      <h3 className="mb-2">
        <span className="font-bold">{accountNumberLabel}</span>{" "}
        <span className="font-normal">{paymentDetails?.accountNumber}</span>
      </h3>

      <h3>
        <span className="font-bold">{sortCodeLabel}</span>{" "}
        <span className="font-normal">{paymentDetails?.sortCode}</span>
      </h3>
      {/* TO DO: Change this logic after spike for redirection and confirmation from design */}
      <p className="mt-4 text-core-red">Change my details</p>
    </div>
  );
};

export default PaymentAccountDetails;
