import type {
  JoinServicesGetAddressesQuery,
  JoinServicesGetAddressesQueryVariables,
} from "@/__generated__/graphql";
import { makeGraphQLRequest } from "@/graphql/client";
import { GET_ADDRESSES } from "@/graphql/queries";
import { Address } from "@/store/useJoinFlowStore";

export const getAddressesByPostcode = async (
  postcode: string,
): Promise<Address[]> => {
  try {
    const variables: JoinServicesGetAddressesQueryVariables = { postcode };
    const response = await makeGraphQLRequest<JoinServicesGetAddressesQuery>(
      GET_ADDRESSES,
      variables,
      undefined,
    );

    if (!response?.getAddresses) {
      return [];
    }

    const addresses: Address[] = [];

    response.getAddresses.forEach((address) => {
      if (address !== null) {
        addresses.push({
          line1: address.line1 || "",
          line2: address.line2 || "",
          line3: address.line3 || "",
          postcode: address.postcode || "",
          identifiers: [],
        });
      }
    });

    return addresses;
  } catch (error) {
    console.error("Failed to fetch addresses:", error);
    throw new Error(
      `Error fetching addresses for postcode ${postcode}: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};
