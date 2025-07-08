import { InfoModal, TipCard } from "@react-component-library/ui";
import { useCallback, useState } from "react";

import { getAssetPath } from "@/lib/get-asset-path";
import { BillingAddressLookupForm } from "@/screens/PaymentDetails/forms/BillingAddressLookupForm";

import { paymentAddressModalText } from "../PaymentAddressDetails/PaymentAddressDetailsProps";

interface PaymentAddressModalProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  setIsModalOpen?: (isOpen: boolean) => void;
}

export const PaymentAddressModal = ({
  modalRef,
  setIsModalOpen,
}: PaymentAddressModalProps) => {
  const [showPaymentDetailsError, setShowPaymentDetailsError] = useState(false);

  const handleAddressSelected = useCallback(() => {
    modalRef.current?.close();
    setIsModalOpen?.(false);
  }, [modalRef, setIsModalOpen]);

  const handleAddressError = useCallback(() => {
    setShowPaymentDetailsError(true);
  }, []);

  return (
    <InfoModal title={paymentAddressModalText.title} modalRef={modalRef}>
      <TipCard
        image={getAssetPath("/images/movingHome.svg")}
        className="mb-4 items-center justify-center bg-tertiary-orange/30 md:mb-6 md:w-full mt-6"
      >
        <span>
          <span className="text-xs font-semibold md:text-sm">
            {paymentAddressModalText.tipCardHighlight}
          </span>{" "}
          {paymentAddressModalText.tipCardText}
        </span>
      </TipCard>

      {showPaymentDetailsError && (
        <p className="text-sm text-ui-error mb-6">
          {paymentAddressModalText.paymentDetailsError}
        </p>
      )}

      <BillingAddressLookupForm
        onAddressSelected={handleAddressSelected}
        onError={handleAddressError}
      />
    </InfoModal>
  );
};
