"use client";

import { useMemo } from "react";

import useJoinFlowStore from "@/store/useJoinFlowStore";

type RoiAddressApiData = {
  postcode: string | null;
  address?: {
    addressKey?: string;
    addressKeyType?: string;
    formattedAddress: string;
    additionalAddressKeys?: {
      addressKey?: string | null;
      addressKeyType?: string | null;
      id?: string | null;
    }[];
  }[];
  isServiceable?: boolean | null;
};

export const useRoiAddress = (): RoiAddressApiData => {
  const { serviceAddress, roiPostcode } = useJoinFlowStore();

  return useMemo(() => {
    const postcode = serviceAddress?.postcode || roiPostcode;

    if (!serviceAddress) {
      return {
        postcode,
      };
    }

    const primaryIdentifier = serviceAddress.identifiers[0];

    const formattedAddress = [
      serviceAddress.line1 && `line1=${serviceAddress.line1}`,
      serviceAddress.line2 && `line2=${serviceAddress.line2}`,
      serviceAddress.line3 && `line3=${serviceAddress.line3}`,
      serviceAddress.postcode && `postcode=${serviceAddress.postcode}`,
      primaryIdentifier &&
        `${primaryIdentifier.scheme}=${primaryIdentifier.value}`,
    ]
      .filter(Boolean)
      .join(",");

    const additionalAddressKeys =
      serviceAddress.identifiers.slice(1).map((identifier) => ({
        addressKey: identifier.value,
        addressKeyType: identifier.scheme,
        id: identifier.id,
      })) || [];

    return {
      postcode,
      address: [
        primaryIdentifier
          ? {
              addressKey: primaryIdentifier.value,
              addressKeyType: primaryIdentifier.scheme,
              formattedAddress,
              additionalAddressKeys:
                additionalAddressKeys.length > 0
                  ? additionalAddressKeys
                  : undefined,
            }
          : {
              formattedAddress,
            },
      ],
      isServiceable: false, // in this case the address was found but no products available
    };
  }, [serviceAddress, roiPostcode]);
};
