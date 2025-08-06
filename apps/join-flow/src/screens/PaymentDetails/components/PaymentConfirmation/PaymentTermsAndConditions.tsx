"use client";

import {
  Checkbox,
  InsertLink,
  InsertMultipleLinks,
} from "@react-component-library/ui";
import { useEffect, useState } from "react";

import useJoinFlowStore from "@/store/useJoinFlowStore";

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
  const { basket, affiliateSession } = useJoinFlowStore();

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
    creditSearchHref,
    yourAgreementText,
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
      <div className="mb-6">
        <InsertMultipleLinks
          text={yourAgreementText}
          links={[
            {
              searchText: "Contract Information",
              href: basket?.cics?.informationHref ?? "/",
            },
            {
              searchText: "Contract Summary",
              href: basket?.cics?.summaryHref ?? "/",
            },
            {
              searchText: "Our Terms & Conditions",
              href:
                affiliateSession?.displayItems?.termsAndConditionsLink ?? "/",
            },
            {
              searchText: "Privacy Notice",
              href: affiliateSession?.displayItems?.privacyPolicyLink ?? "/",
            },
          ]}
        />
      </div>

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
          label={
            <InsertLink
              text={creditSearchCheckboxText}
              searchText="credit search"
              href={creditSearchHref}
            />
          }
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
