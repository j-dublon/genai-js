"use client";

import useJoinFlowStore from "@store/useJoinFlowStore";

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
        <h3 className="mb-3">
          <span className="text-xs md:text-sm font-medium">
            {accountHolderLabel}
          </span>{" "}
          <span className="text-xs md:text-sm font-normal">
            {paymentDetails?.accountholderName}
          </span>
        </h3>

        <h3 className="mb-3">
          <span className="text-xs md:text-sm font-medium">
            {accountNumberLabel}
          </span>{" "}
          <span className="text-xs md:text-sm font-normal">
            {paymentDetails?.accountNumber}
          </span>
        </h3>

        <h3>
          <span className="text-xs md:text-sm font-medium">
            {sortCodeLabel}
          </span>{" "}
          <span className="text-xs md:text-sm font-normal">
            {paymentDetails?.sortCode}
          </span>
        </h3>

        <button
          type="button"
          className="underline text-xs md:text-sm font-medium text-ui-link cursor-pointer bg-transparent border-none p-0 mt-2"
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
