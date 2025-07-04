import {
  ExtendedStoreAddress,
  PaymentDetails,
  StoreAddress,
} from "@store/useJoinFlowStore";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { useState } from "react";

import { AddressLookupForm } from "@/components/AddressLookupForm";
import { updateBasket } from "@/services/helpers/updateBasket";

interface BillingAddressLookupFormProps {
  onAddressSelected?: (address: StoreAddress) => void;
  onError?: (error: string) => void;
}

export const BillingAddressLookupForm = ({
  onAddressSelected,
  onError,
}: BillingAddressLookupFormProps) => {
  const {
    setBillingAddress,
    basket,
    setBasket,
    setPaymentDetails,
    paymentDetails,
  } = useJoinFlowStore();
  const [isUpdatingBasket, setIsUpdatingBasket] = useState(false);

  const handleAddressSelected = async (
    selectedAddress: ExtendedStoreAddress,
  ) => {
    if (!basket?.id) {
      const errorMessage =
        "Session information is missing. Please refresh the page or try again later.";
      console.error("Basket ID is required to update basket");
      throw new Error(errorMessage);
    }

    setIsUpdatingBasket(true);
    try {
      const result = await updateBasket(basket.id, {
        billingAddress: {
          line1: selectedAddress.line1,
          line2: selectedAddress.line2,
          line3: selectedAddress.line3,
          postcode: selectedAddress.postcode,
        },
      });

      if (result.error) {
        const errorMessage =
          result.error.message ||
          "Failed to update billing address. Please try again.";
        console.error("Error updating basket:", result.error);
        throw new Error(errorMessage);
      }
      setBasket({
        ...basket,
        billingAddress: {
          line1: selectedAddress.line1,
          line2: selectedAddress.line2,
          line3: selectedAddress.line3,
          postcode: selectedAddress.postcode,
        },
      });

      setBillingAddress(selectedAddress);
      setPaymentDetails({
        ...(paymentDetails || {}),
        billingAddress: {
          line1: selectedAddress.line1,
          line2: selectedAddress.line2,
          line3: selectedAddress.line3,
          postcode: selectedAddress.postcode,
        },
      } as PaymentDetails);
      onAddressSelected?.(selectedAddress);
    } finally {
      setIsUpdatingBasket(false);
    }
  };

  return (
    <AddressLookupForm
      onAddressSelected={handleAddressSelected}
      onError={onError}
      loading={isUpdatingBasket}
      buttonText={{
        search: "Search for your address",
        continue: "Search for your address",
      }}
    />
  );
};
