"use client";

import useJoinFlowStore from "@store/useJoinFlowStore";
import React from "react";

import { paymentConfirmationText } from "./PaymentConfirmationProps";

export const PaymentAddressDetails = () => {
  const { personalDetails } = useJoinFlowStore();

  const { addressDetailsLabel, billingAddressLabel } = paymentConfirmationText;

  return (
    <div className="bg-ui-grey-100 p-6 rounded-md">
      <h3 className="font-bold">{addressDetailsLabel}</h3>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-ui-grey-500">
            {personalDetails?.address?.line1}
          </p>
        </div>
      </div>

      <div className="border-t border-ui-grey-300 pt-4 mt-2">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">{billingAddressLabel}</h3>
        </div>
      </div>

      <div>
        <p className="text-sm text-ui-grey-500 ">
          {personalDetails?.address?.line1}
        </p>
      </div>
      {/* TO DO: Change this logic after spike for redirection and confirmation from design */}
      <span className="font-normal text-core-red">Change</span>
    </div>
  );
};

export default PaymentAddressDetails;
