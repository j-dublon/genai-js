"use client";

import { AddressLookupSuccess } from "@cuckoointernet/util-squid-network-requests";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { getAddressesByPostcode } from "@/services/helpers/addressLookup";
import type { ExtendedStoreAddress } from "@/store/useJoinFlowStore";
import useJoinFlowStore from "@/store/useJoinFlowStore";

interface UseAddressProps {
  initialPostcode?: string;
  autoFetch?: boolean;
}

interface UseAddressResult {
  selectedAddress: ExtendedStoreAddress | null;
  addresses: ExtendedStoreAddress[] | null;
  loading: boolean;
  error: string | null;
  fetchAddresses: (postcode: string) => Promise<void>;
  selectAddress: (address: ExtendedStoreAddress) => void;
  setError: (error: string | null) => void;
}

type AddressFromApi = NonNullable<
  AddressLookupSuccess["response"]["addresses"]
>[number];

const convertToStoreAddress = (
  address: AddressFromApi,
): ExtendedStoreAddress => {
  return {
    id: address.id || "",
    line1: address.line1,
    line2: address.line2 || "",
    line3: address.line3 || "",
    postcode: address.postcode,
    identifiers: address.identifiers.map((identifier) => ({
      value: identifier.value,
      scheme: identifier.scheme,
      id: identifier.id || "",
    })),
    selectionIdentifier: address.selectionIdentifier,
  };
};

export const useAddress = ({
  initialPostcode = "",
  autoFetch = true,
}: UseAddressProps = {}): UseAddressResult => {
  const router = useRouter();
  const { setErrorInfo } = useJoinFlowStore();
  const [selectedAddress, setSelectedAddress] =
    useState<ExtendedStoreAddress | null>(null);
  const [addresses, setAddresses] = useState<ExtendedStoreAddress[] | null>(
    null,
  );
  const [loading, setLoading] = useState(autoFetch && initialPostcode !== "");
  const [error, setError] = useState<string | null>(null);

  const fetchAddresses = useCallback(
    async (postcode: string) => {
      if (!postcode) {
        setError("Please provide a postcode");
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const result = await getAddressesByPostcode(postcode);

        if (result.error) {
          const errorType = result.error.type;

          switch (errorType) {
            case "joinSuspended":
              router.push("/join-flow/register-interest/unavailable");
              return;

            case "networkError":
            case "unknownError":
            case "generalError":
            case "sessionExpiredError":
            case "validationError":
              setErrorInfo({
                type: errorType,
              });
              router.push("/join-flow/error");
              return;

            case "noAddressFound":
              router.push(
                "/join-flow/register-interest/cannot-service-address",
              );
              return;

            default:
              setError(result.error.message);
              setAddresses(null);
              return;
          }
        }

        // this generally shouldn't happen, but if it does, we need to redirect to the cannot service address page
        if (!result.addresses || result.addresses.length === 0) {
          router.push("/join-flow/register-interest/cannot-service-address");
          return;
        }

        const convertedAddresses = result.addresses.map(convertToStoreAddress);
        setAddresses(convertedAddresses);
      } catch {
        setAddresses(null);
        setSelectedAddress(null);
        setErrorInfo({
          type: "unknownError",
        });
        router.push("/join-flow/error");
        return;
      } finally {
        setLoading(false);
      }
    },
    [router, setErrorInfo],
  );

  const selectAddress = (address: ExtendedStoreAddress) => {
    setSelectedAddress(address);
  };

  useEffect(() => {
    if (initialPostcode && autoFetch) {
      fetchAddresses(initialPostcode);
    }
  }, [initialPostcode, fetchAddresses, autoFetch]);

  return {
    selectedAddress,
    addresses,
    loading,
    error,
    fetchAddresses,
    selectAddress,
    setError,
  };
};
