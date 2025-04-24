"use client";

import Link from "next/link";

import { useAddress } from "@/hooks/useAddress";

export const Address = () => {
  const {
    selectedAddress,
    loading: addressLoading,
    error: addressError,
  } = useAddress({
    initialPostcode: "SW1A 2AA",
    autoFetch: true,
  });

  let addressDetails;

  switch (true) {
    case addressLoading:
      addressDetails = (
        <div
          className="flex items-center justify-center space-x-3"
          role="status"
        >
          <div className="h-4 w-4 rounded-full border-2 border-ui-link border-t-transparent animate-spin"></div>
          <p>Loading your address...</p>
        </div>
      );
      break;
    case !!addressError:
      addressDetails = (
        <div
          className="p-4 border border-ui-error rounded-md mb-4"
          role="alert"
        >
          <p className="text-ui-error">{addressError}</p>
        </div>
      );
      break;
    case !!selectedAddress:
      const formattedAddress = [
        selectedAddress.line1,
        selectedAddress.line2,
        selectedAddress.line3,
        selectedAddress.postcode,
      ]
        .filter(Boolean)
        .join(", ");
      addressDetails = (
        <p className="text-core-black text-sm font-medium leading-[1.4] md:text-md md:font-semibold md:leading-[1.5]">
          {formattedAddress}
        </p>
      );
      break;
    default:
      addressDetails = (
        <div className="p-4 border rounded-md mb-4">
          <p className="text-core-black">No address information available</p>
        </div>
      );
  }

  // TODO: Add link to change address
  const changeAddressLink = (
    <Link
      href="/"
      className="underline text-ui-link text-sm font-medium leading-[1.4] md:text-sm md:leading-[1.6]"
    >
      Change my address
    </Link>
  );

  return (
    <>
      {addressDetails}
      {!addressLoading && changeAddressLink}
    </>
  );
};
