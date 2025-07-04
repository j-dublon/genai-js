import { Button } from "@react-component-library/ui";
import { ExtendedStoreAddress, StoreAddress } from "@store/useJoinFlowStore";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { FormDropdown } from "@/components/FormDropdown";
import { useAddress } from "@/hooks/useAddress";
import { ChooseYourAddressText } from "@/screens/ChooseYourAddress/ChooseYourAddressProps";

interface AddressFormData extends Record<string, unknown> {
  postcode: string;
  selectedAddress: ExtendedStoreAddress | null;
}

interface AddressLookupFormProps {
  onAddressSelected: (address: ExtendedStoreAddress) => Promise<void>;
  onError?: (error: string) => void;
  initialPostcode?: string;
  buttonText?: {
    search: string;
    continue: string;
  };
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  addressNotFoundAction?: () => void;
}

const Loading = () => (
  <div className="flex items-center justify-center mt-4">
    <div className="mr-4 h-4 w-4 rounded-full border-2 border-ui-link border-t-transparent animate-spin"></div>
    <p>Loading...</p>
  </div>
);

export const AddressLookupForm = ({
  onAddressSelected,
  onError,
  initialPostcode = "",
  buttonText = {
    search: ChooseYourAddressText.searchForMyAddressButtonText,
    continue: ChooseYourAddressText.continueButtonText,
  },
  loading: externalLoading = false,
  disabled: externalDisabled = false,
  fullWidth = false,
  addressNotFoundAction,
}: AddressLookupFormProps) => {
  const [postcode, setPostcode] = useState(initialPostcode);
  const [lastSearchedPostcode, setLastSearchedPostcode] =
    useState(initialPostcode);

  const { error, loading, addresses, selectAddress, setError } = useAddress({
    initialPostcode: postcode,
  });

  const formattedAddresses = postcode
    ? addresses?.reduce<Record<string, StoreAddress>>((acc, address) => {
        const formattedKey = `${address.line1}, ${address.line2}, ${address.line3}`;
        acc[formattedKey] = address;
        return acc;
      }, {})
    : undefined;

  const form = useForm<AddressFormData>({
    defaultValues: {
      postcode: initialPostcode,
      selectedAddress: null,
    },
  });

  const isPostcodeSearched =
    form.watch("postcode") === lastSearchedPostcode && !!formattedAddresses;

  const handleSubmit = async (data: AddressFormData) => {
    if (data.postcode !== lastSearchedPostcode) {
      setLastSearchedPostcode(data.postcode);
      setPostcode(data.postcode);
      form.setValue("selectedAddress", null);
      return;
    }

    if (formattedAddresses) {
      const selectedAddress = data.selectedAddress;
      if (selectedAddress) {
        selectAddress(selectedAddress);
        try {
          await onAddressSelected(selectedAddress);
        } catch (error) {
          const errorMessage =
            "Failed to process address selection. Please try again.";
          console.error("Error in address selection:", error);
          setError(errorMessage);
          onError?.(errorMessage);
        }
      }
    }
  };

  const handleClearPostcode = () => {
    setPostcode("");
    setLastSearchedPostcode("");
    setError(null);
    form.reset();
  };

  const isLoading = loading || externalLoading;
  const isDisabled =
    externalDisabled ||
    isLoading ||
    (isPostcodeSearched && !form.watch("selectedAddress")) ||
    !form.watch("postcode");

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
      <div className="relative">
        <Controller
          name="postcode"
          control={form.control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="bg-core-white w-full p-4 border-1 border-ui-grey-400 rounded-xs h-auto placeholder:text-core-black placeholder:text-xs md:placeholder:text-sm"
              placeholder={ChooseYourAddressText.postcodePlaceholder}
              autoComplete="postal-code"
            />
          )}
        />
        {form.watch("postcode") && (
          <button
            type="button"
            onClick={handleClearPostcode}
            className="absolute right-[16px] top-1/2 -translate-y-1/2 text-ui-grey-400 hover:text-ui-grey-600 rounded-full px-2 py-1"
            aria-label="Clear postcode"
          >
            ✕
          </button>
        )}
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        isPostcodeSearched &&
        formattedAddresses &&
        Object.keys(formattedAddresses).length > 0 && (
          <FormDropdown
            control={form.control}
            name="selectedAddress"
            dropdownPlaceholder={
              ChooseYourAddressText.addressDropdownPlaceholder
            }
            options={formattedAddresses}
            initiallyOpen={true}
            bottomButtonText={ChooseYourAddressText.addressNotFoundText}
            bottomButtonOnClick={addressNotFoundAction}
            showTick={false}
          />
        )
      )}

      {error && <p className="text-ui-error text-sm mt-1">{error}</p>}

      <div className={fullWidth ? "" : "flex justify-end"}>
        <Button
          size="large"
          variant="solid"
          tint="yellow"
          type="submit"
          fullWidth={fullWidth}
          className={`${fullWidth ? "" : "w-auto"} ${isPostcodeSearched ? "mt-10 md:mt-16" : "mt-4 md:mt-8"}`}
          disabled={isDisabled}
        >
          {isPostcodeSearched ? buttonText.continue : buttonText.search}
        </Button>
      </div>
    </form>
  );
};
