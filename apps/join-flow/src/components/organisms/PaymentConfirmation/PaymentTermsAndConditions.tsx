"use client";

import React, { useEffect, useState } from "react";

import { paymentConfirmationText } from "./PaymentConfirmationProps";

interface PaymentTermsAndConditionsProps {
  onChange: (
    allChecked: boolean,
    termState: {
      termsAgreed: boolean;
      directDebitAgreed: boolean;
      creditSearchAgreed: boolean;
    },
  ) => void;
  initialState?: {
    termsAgreed: boolean;
    directDebitAgreed: boolean;
    creditSearchAgreed: boolean;
  };
}

export const PaymentTermsAndConditions = ({
  onChange,
  initialState,
}: PaymentTermsAndConditionsProps) => {
  const [termsChecked, setTermsChecked] = useState(
    initialState?.termsAgreed || false,
  );
  const [directDebitChecked, setDirectDebitChecked] = useState(
    initialState?.directDebitAgreed || false,
  );
  const [creditSearchChecked, setCreditSearchChecked] = useState(
    initialState?.creditSearchAgreed || false,
  );

  const {
    termsCheckboxText,
    directDebitCheckboxText,
    creditSearchCheckboxText,
  } = paymentConfirmationText;

  useEffect(() => {
    const allChecked =
      termsChecked && directDebitChecked && creditSearchChecked;
    onChange(allChecked, {
      termsAgreed: termsChecked,
      directDebitAgreed: directDebitChecked,
      creditSearchAgreed: creditSearchChecked,
    });
  }, [termsChecked, directDebitChecked, creditSearchChecked, onChange]);

  return (
    <div className="bg-ui-grey-100 p-6 rounded-md">
      <div className="space-y-4">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 mr-3"
            checked={termsChecked}
            onChange={(e) => setTermsChecked(e.target.checked)}
          />
          <label htmlFor="terms" className="text-sm">
            {termsCheckboxText.replace(/'/g, "'")}
          </label>
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="directDebit"
            className="mt-1 mr-3"
            checked={directDebitChecked}
            onChange={(e) => setDirectDebitChecked(e.target.checked)}
          />
          <label htmlFor="directDebit" className="text-sm">
            {directDebitCheckboxText.replace(/'/g, "'")}
          </label>
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="creditSearch"
            className="mt-1 mr-3"
            checked={creditSearchChecked}
            onChange={(e) => setCreditSearchChecked(e.target.checked)}
          />
          <label htmlFor="creditSearch" className="text-sm">
            {creditSearchCheckboxText}
          </label>
        </div>
      </div>
    </div>
  );
};

export default PaymentTermsAndConditions;
