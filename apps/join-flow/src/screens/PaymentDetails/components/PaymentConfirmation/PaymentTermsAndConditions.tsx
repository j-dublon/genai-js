"use client";

import { Checkbox } from "@react-component-library/ui";
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
        <Checkbox
          label={termsCheckboxText.replace(/'/g, "'")}
          value="terms"
          checked={termsChecked}
          onChange={setTermsChecked}
          labelClassName="text-sm text-core-black"
        />

        <Checkbox
          label={directDebitCheckboxText.replace(/'/g, "'")}
          value="directDebit"
          checked={directDebitChecked}
          onChange={setDirectDebitChecked}
          labelClassName="text-sm text-core-black"
        />

        <Checkbox
          label={creditSearchCheckboxText}
          value="creditSearch"
          checked={creditSearchChecked}
          onChange={setCreditSearchChecked}
          labelClassName="text-sm text-core-black"
        />
      </div>
    </div>
  );
};

export default PaymentTermsAndConditions;
