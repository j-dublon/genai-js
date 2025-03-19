"use client";

import React, { useEffect, useState } from "react";

interface PaymentTermsAndConditionsProps {
  onChange: (allChecked: boolean) => void;
  termsAndConditionsTitle: string;
  termsCheckboxText: string;
  directDebitCheckboxText: string;
  creditSearchCheckboxText: string;
}

export const PaymentTermsAndConditions = ({
  onChange,
  termsAndConditionsTitle,
  termsCheckboxText,
  directDebitCheckboxText,
  creditSearchCheckboxText,
}: PaymentTermsAndConditionsProps) => {
  const [termsChecked, setTermsChecked] = useState(false);
  const [directDebitChecked, setDirectDebitChecked] = useState(false);
  const [creditSearchChecked, setCreditSearchChecked] = useState(false);

  useEffect(() => {
    onChange(termsChecked && directDebitChecked && creditSearchChecked);
  }, [termsChecked, directDebitChecked, creditSearchChecked, onChange]);

  return (
    <div className="bg-ui-grey-100 p-6 rounded-md border border-ui-grey-300">
      <h3 className="font-bold mb-4">{termsAndConditionsTitle}</h3>

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
