import { Button } from "@react-component-library/ui";
import useJoinFlowStore, {
  ExtendedStoreAddress,
  PaymentDetails,
  StoreAddress,
} from "@store/useJoinFlowStore";
import { useState } from "react";

import { AddressLookupForm } from "@/components/AddressLookupForm";
import {
  ManualAddressForm,
  ManualAddressFormInputs,
} from "@/components/ManualAddressForm";
import { updateBasket } from "@/services/helpers/updateBasket";

import { paymentDetailsText } from "../PaymentDetailsProps";

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
  const [showManualForm, setShowManualForm] = useState(false);

  const handleAddressSelected = async (
    selectedAddress: ExtendedStoreAddress | StoreAddress,
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

      const billingAddressData = {
        line1: selectedAddress.line1,
        line2: selectedAddress.line2,
        line3: selectedAddress.line3,
        postcode: selectedAddress.postcode,
        identifiers: selectedAddress.identifiers || [],
      };

      setBasket({
        ...basket,
        billingAddress: {
          line1: selectedAddress.line1,
          line2: selectedAddress.line2,
          line3: selectedAddress.line3,
          postcode: selectedAddress.postcode,
        },
      });

      setBillingAddress(billingAddressData);
      setPaymentDetails({
        ...(paymentDetails || {}),
        billingAddress: {
          line1: selectedAddress.line1,
          line2: selectedAddress.line2,
          line3: selectedAddress.line3,
          postcode: selectedAddress.postcode,
        },
      } as PaymentDetails);
      onAddressSelected?.(billingAddressData);
    } finally {
      setIsUpdatingBasket(false);
    }
  };

  const handleManualAddressSubmit = async (data: ManualAddressFormInputs) => {
    const addressData: StoreAddress = {
      line1: data.line1,
      line2: data.line2 || "",
      line3: data.line3 || "",
      postcode: data.postcode,
      identifiers: data.identifiers || [],
    };

    await handleAddressSelected(addressData);
    setShowManualForm(false);
  };

  if (showManualForm) {
    return (
      <>
        <ManualAddressForm
          onSubmit={handleManualAddressSubmit}
          formId="billingAddressForm"
          isSubmitting={isUpdatingBasket}
        />
        <div className="flex gap-4 justify-end mt-6">
          <Button
            type="submit"
            form="billingAddressForm"
            size="large"
            variant="solid"
            tint="yellow"
            disabled={isUpdatingBasket}
          >
            {paymentDetailsText.saveBillingAddress}
          </Button>
        </div>
      </>
    );
  }

  return (
    <AddressLookupForm
      onAddressSelected={handleAddressSelected}
      onError={onError}
      loading={isUpdatingBasket}
      buttonText={{
        search: "Search for your address",
        continue: "Search for your address",
      }}
      addressNotFoundAction={() => setShowManualForm(true)}
    />
  );
};
