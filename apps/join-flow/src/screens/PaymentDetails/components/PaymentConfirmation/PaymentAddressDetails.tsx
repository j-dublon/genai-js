"use client";

import React from "react";

import useJoinFlowStore from "@/store/useJoinFlowStore";

import { paymentConfirmationText } from "./PaymentConfirmationProps";

export const PaymentAddressDetails = () => {
  const { addressDetailsLabel, billingAddressLabel } = paymentConfirmationText;
  const { serviceAddress } = useJoinFlowStore();

  return (
    <div className="bg-ui-grey-100 p-6 rounded-md">
      <h3 className="font-bold">{addressDetailsLabel}</h3>

      <div className="flex justify-between items-center">
        <div>
          {serviceAddress && (
            <p className="text-sm text-ui-grey-500">{serviceAddress.line1}</p>
          )}
        </div>
      </div>

      <div className="border-t border-ui-grey-300 pt-4 mt-2">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">{billingAddressLabel}</h3>
        </div>
      </div>

      <div>
        {serviceAddress && (
          <div className="text-sm text-ui-grey-500">
            {/* TO DO: This is unlikely going to be service address as well so we need to clarify where the billing address comes from */}
            {serviceAddress.line1}
          </div>
        )}
      </div>
      {/* TO DO: Change this logic after spike for redirection and confirmation from design */}
      <span className="font-normal text-ui-error">Change</span>
    </div>
  );
};

export default PaymentAddressDetails;
