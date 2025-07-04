import { ExtendedStoreAddress } from "@store/useJoinFlowStore";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { AddressLookupForm } from "@/components/AddressLookupForm/index";
import { createQuoteLookupPoll } from "@/services/helpers/createQuoteLookupPoll";

import { ChooseYourAddressText } from "../ChooseYourAddressProps";

export const ServiceAddressLookupForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams().get("postcode");
  const { setServiceAddress, affiliateSession, setQuoteResponse } =
    useJoinFlowStore();
  const [isQuoteLookupLoading, setIsQuoteLookupLoading] = useState(false);

  const handleAddressSelected = async (
    selectedAddress: ExtendedStoreAddress,
  ) => {
    setServiceAddress(selectedAddress);

    if (!affiliateSession) {
      console.error("No affiliate session available");
      throw new Error(
        "Session information is missing. Please refresh the page or try again later.",
      );
    }

    setIsQuoteLookupLoading(true);
    try {
      const quoteResult = await createQuoteLookupPoll(
        affiliateSession.id,
        selectedAddress.id,
        selectedAddress.selectionIdentifier,
      );

      if (quoteResult.error) {
        throw new Error(
          quoteResult.error.message ||
            "Failed to get available packages for this address. Please try again.",
        );
      }

      if (
        quoteResult.products &&
        quoteResult.quotingCode &&
        quoteResult.documentID
      ) {
        setQuoteResponse({
          documentID: quoteResult.documentID,
          response: {
            products: quoteResult.products,
            quotingCode: quoteResult.quotingCode,
          },
        });
        router.push("/join-flow/package-selection");
      } else {
        throw new Error("No products available for this address.");
      }
    } finally {
      setIsQuoteLookupLoading(false);
    }
  };

  return (
    <AddressLookupForm
      onAddressSelected={handleAddressSelected}
      initialPostcode={searchParams || ""}
      loading={isQuoteLookupLoading}
      fullWidth={true}
      buttonText={{
        search: ChooseYourAddressText.searchForMyAddressButtonText,
        continue: ChooseYourAddressText.continueButtonText,
      }}
      addressNotFoundAction={() => {
        router.push("/join-flow");
      }}
    />
  );
};
