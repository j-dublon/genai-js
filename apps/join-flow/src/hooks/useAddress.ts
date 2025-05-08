"use client";

import { useEffect, useState } from "react";

import { getAddressesByPostcode } from "@/graphql/helpers/addresses";
import type { Address } from "@/store/useJoinFlowStore";

interface UseAddressProps {
  initialPostcode?: string;
  autoFetch?: boolean;
}

interface UseAddressResult {
  selectedAddress: Address | null;
  addresses: Address[] | null;
  loading: boolean;
  error: string | null;
  fetchAddresses: (postcode: string) => Promise<void>;
  selectAddress: (address: Address) => void;
}

export const useAddress = ({
  initialPostcode = "",
  autoFetch = true,
}: UseAddressProps = {}): UseAddressResult => {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [addresses, setAddresses] = useState<Address[] | null>(null);
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

      if (Array.isArray(fetchedAddresses)) {
        setAddresses(fetchedAddresses);

        if (fetchedAddresses.length > 0) {
          setSelectedAddress(fetchedAddresses[0]);
        } else {
          setError("No addresses found for this postcode");
        }
      } else {
        const addressArray = fetchedAddresses ? [fetchedAddresses] : [];
        setAddresses(addressArray);

        if (fetchedAddresses) {
          setSelectedAddress(fetchedAddresses);
        } else {
          setError("No addresses found for this postcode");
        }
      }
    } catch (err) {
      console.error("Failed to fetch addresses:", err);
      setError(
        "We couldn't load your address. Please try again or continue anyway.",
      );
      setAddresses(null);
      setSelectedAddress(null);
    } finally {
      setLoading(false);
    }
  };

  const selectAddress = (address: Address) => {
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
  };
};
