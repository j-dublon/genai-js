"use client";

import { useEffect, useState } from "react";

import type { Address as AddressLookupAddress } from "@/services/helpers/addressLookup";
import { getAddressesByPostcode } from "@/services/helpers/addressLookup";
import type { Address as StoreAddress } from "@/store/useJoinFlowStore";

interface UseAddressProps {
  initialPostcode?: string;
  autoFetch?: boolean;
}

interface UseAddressResult {
  selectedAddress: StoreAddress | null;
  addresses: StoreAddress[] | null;
  loading: boolean;
  error: string | null;
  fetchAddresses: (postcode: string) => Promise<void>;
  selectAddress: (address: StoreAddress) => void;
  setError: (error: string | null) => void;
}

const convertToStoreAddress = (address: AddressLookupAddress): StoreAddress => {
  return {
    line1: address.line1,
    line2: address.line2 || "",
    line3: address.line3 || "",
    postcode: address.postcode,
    identifiers: address.identifiers.map((identifier) => ({
      value: identifier.value,
      scheme: identifier.scheme,
      id: identifier.id || "",
    })),
  };
};

export const useAddress = ({
  initialPostcode = "",
  autoFetch = true,
}: UseAddressProps = {}): UseAddressResult => {
  const [selectedAddress, setSelectedAddress] = useState<StoreAddress | null>(
    null,
  );
  const [addresses, setAddresses] = useState<StoreAddress[] | null>(null);
  const [loading, setLoading] = useState(autoFetch && initialPostcode !== "");
  const [error, setError] = useState<string | null>(null);

  const fetchAddresses = async (postcode: string) => {
    if (!postcode) {
      setError("Please provide a postcode");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const fetchedAddresses = await getAddressesByPostcode(postcode);
      console.log(fetchedAddresses, "fetched addresses");

      if (Array.isArray(fetchedAddresses)) {
        const convertedAddresses = fetchedAddresses.map(convertToStoreAddress);
        setAddresses(convertedAddresses);

        if (!convertedAddresses.length) {
          setError("No addresses found for this postcode");
        }
      } else {
        const convertedAddress = convertToStoreAddress(
          fetchedAddresses as AddressLookupAddress,
        );
        const addressArray = [convertedAddress];
        setAddresses(addressArray);
        setSelectedAddress(convertedAddress);
      }
    } catch (err) {
      console.error("Failed to fetch addresses:", err);
      setError("We couldn't load your address. Please try again.");
      setAddresses(null);
      setSelectedAddress(null);
    } finally {
      setLoading(false);
    }
  };

  const selectAddress = (address: StoreAddress) => {
    setSelectedAddress(address);
  };

  useEffect(() => {
    if (initialPostcode && autoFetch) {
      fetchAddresses(initialPostcode);
    }
  }, [initialPostcode, autoFetch]);

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
