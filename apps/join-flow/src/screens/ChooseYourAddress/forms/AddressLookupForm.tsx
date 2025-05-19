import { Button } from "@react-component-library/ui";
import { Address } from "@store/useJoinFlowStore";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { FormDropdown } from "@/components/FormDropdown";
import { useAddress } from "@/hooks/useAddress";

import { ChooseYourAddressText } from "../ChooseYourAddressProps";

interface ChooseAddressFormData extends Record<string, unknown> {
  postcode: string;
  selectedAddress: Address | null;
}

const Loading = () => (
  <div className="flex items-center justify-center mt-4">
    <div className="mr-4 h-4 w-4 rounded-full border-2 border-ui-link border-t-transparent animate-spin"></div>
    <p>Loading...</p>
  </div>
);

export const AddressLookupForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams().get("postcode");
  const { setServiceAddress } = useJoinFlowStore();
  const [postcode, setPostcode] = useState("");
  const [lastSearchedPostcode, setLastSearchedPostcode] = useState("");

  const {
    error,
    loading,
    addresses,
    selectedAddress,
    selectAddress,
    setError,
  } = useAddress({
    initialPostcode: postcode,
  });

  const formattedAddresses = postcode
    ? addresses?.reduce<Record<string, Address>>((acc, address) => {
        const formattedKey = `${address.line1}, ${address.line2}, ${address.line3}`;
        acc[formattedKey] = address;
        return acc;
      }, {})
    : undefined;

  const form = useForm<ChooseAddressFormData>({
    defaultValues: {
      postcode: "",
      selectedAddress: null,
    },
  });

  const isPostcodeSearched =
    form.watch("postcode") === lastSearchedPostcode && !!formattedAddresses;

  useEffect(() => {
    if (searchParams) {
      setPostcode(searchParams);
      setLastSearchedPostcode(searchParams);
      form.setValue("postcode", searchParams);
    }
  }, [searchParams, form]);

  useEffect(() => {
    if (selectedAddress) {
      setServiceAddress(selectedAddress);
    }
  }, [selectedAddress, setServiceAddress]);

  const handleSubmit = (data: ChooseAddressFormData) => {
    // If the postcode has changed, treat as postcode search
    if (data.postcode !== lastSearchedPostcode) {
      setLastSearchedPostcode(data.postcode);
      setPostcode(data.postcode);
      form.setValue("selectedAddress", null);
      return;
    }
    // If addresses are loaded and postcode matches last searched, continue
    if (formattedAddresses) {
      const selectedAddress = data.selectedAddress;
      if (selectedAddress) {
        selectAddress(selectedAddress);
      }
      // TODO: quote lookup to happen here once address selected
      router.push("/join-flow/package-selection");
    }
  };

  const handleClearPostcode = () => {
    setPostcode("");
    setLastSearchedPostcode("");
    setError(null);
    form.reset();
  };

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
      {loading ? (
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
            bottomButtonOnClick={() => {
              // TODO: point this to the address not found page
              router.push("/join-flow");
            }}
            showTick={false}
          />
        )
      )}
      {error && <p className="text-ui-error text-sm mt-1">{error}</p>}
      <Button
        size="large"
        variant="solid"
        tint="yellow"
        type="submit"
        fullWidth
        className={`${isPostcodeSearched ? "mt-10 md:mt-16" : "mt-4 md:mt-8"}`}
        disabled={
          loading ||
          (isPostcodeSearched && !form.watch("selectedAddress")) ||
          !form.watch("postcode")
        }
      >
        {isPostcodeSearched
          ? ChooseYourAddressText.continueButtonText
          : ChooseYourAddressText.searchForMyAddressButtonText}
      </Button>
    </form>
  );
};
