"use client";

import { RegisterOfInterestSubmission } from "@cuckoointernet/util-squid-network-requests";
import { useMemo } from "react";

import useJoinFlowStore from "@/store/useJoinFlowStore";

export const useRoiAddress = ():
  | RegisterOfInterestSubmission["inputs"]["address"]
  | null => {
  const { serviceAddress, roiPostcode } = useJoinFlowStore();

  return useMemo(() => {
    const postcode = serviceAddress?.postcode || roiPostcode || null;

    if (!postcode) return null;

    if (!serviceAddress) {
      return [{ postcode }];
    }

    const primaryIdentifier = serviceAddress.identifiers[0];

    const formattedAddress = [
      serviceAddress.line1 && `line1=${serviceAddress.line1}`,
      serviceAddress.line2 && `line2=${serviceAddress.line2}`,
      serviceAddress.line3 && `line3=${serviceAddress.line3}`,
      serviceAddress.postcode && `postcode=${serviceAddress.postcode}`,
      primaryIdentifier &&
        `addressKeyType=${primaryIdentifier.scheme}&addressKey=${primaryIdentifier.value}`,
    ]
      .filter(Boolean)
      .join("&")
      .replace(/\s/g, "+");

    const additionalAddressKeys =
      serviceAddress.identifiers.slice(1).map((identifier) => ({
        addressKey: identifier.value,
        addressKeyType: identifier.scheme,
        id: identifier.id,
      })) || [];

    return [
      {
        postcode,
        addressKey: primaryIdentifier?.value,
        addressKeyType: primaryIdentifier?.scheme,
        formattedAddress,
        additionalAddressKeys:
          additionalAddressKeys.length > 0 ? additionalAddressKeys : undefined,
      },
    ];
  }, [serviceAddress, roiPostcode]);
};
