"use client";

import useJoinFlowStore from "@/store/useJoinFlowStore";

import { paymentConfirmationText } from "./PaymentConfirmationProps";

interface AccessibilityRequirementsProps {
  onChange: () => void;
}

export const AccessibilityRequirements = ({
  onChange,
}: AccessibilityRequirementsProps) => {
  const { accessibilityRequirements } = useJoinFlowStore();

  const {
    accessibilityRequirementsCheckboxText,
    accessibilityRequirementsDescription,
    accessibilityRequirementsTitle,
  } = paymentConfirmationText;

  return (
    <div className="bg-ui-grey-100 p-6 rounded-md">
      <div className="space-y-4">
        <p className="text-md font-bold mb-6">
          {accessibilityRequirementsTitle}
        </p>
        <p className="text-sm text-ui-grey-500">
          {accessibilityRequirementsDescription}
        </p>
        <div className="flex items-start">
          <input
            type="checkbox"
            id="accessibilityRequirements"
            className="mt-1 mr-3"
            checked={accessibilityRequirements !== null}
            onChange={() => onChange()}
          />
          <label htmlFor="accessibilityRequirements" className="text-sm">
            {accessibilityRequirementsCheckboxText}
          </label>
        </div>
      </div>
    </div>
  );
};
