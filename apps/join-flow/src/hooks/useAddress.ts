import { useEffect, useState } from "react";

import type { GetAddressesResponse } from "@/__generated__/graphql";
import { getAddressesByPostcode } from "@/graphql/helpers/addresses";

interface UseAddressProps {
  initialPostcode?: string;
  autoFetch?: boolean;
}

interface UseAddressResult {
  selectedAddress: GetAddressesResponse | null;
  addresses: GetAddressesResponse[] | null;
  loading: boolean;
  error: string | null;
  fetchAddresses: (postcode: string) => Promise<void>;
  selectAddress: (address: GetAddressesResponse) => void;
}

export const useAddress = ({
  initialPostcode = "",
  autoFetch = true,
}: UseAddressProps = {}): UseAddressResult => {
  const [selectedAddress, setSelectedAddress] =
    useState<GetAddressesResponse | null>(null);
  const [addresses, setAddresses] = useState<GetAddressesResponse[] | null>(
    null,
  );
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

      setAddresses(fetchedAddresses);

      if (fetchedAddresses && fetchedAddresses.length > 0) {
        setSelectedAddress(fetchedAddresses[0]);
      } else {
        setError("No addresses found for this postcode");
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

  const selectAddress = (address: GetAddressesResponse) => {
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
