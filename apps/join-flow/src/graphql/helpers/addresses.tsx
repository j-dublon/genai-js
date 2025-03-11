import type {
  JoinServicesGetAddressesQuery,
  JoinServicesGetAddressesQueryVariables,
} from "@/__generated__/graphql";
import type { GetAddressesResponse } from "@/__generated__/graphql";
import { makeGraphQLRequest } from "@/graphql/client";
import { GET_ADDRESSES } from "@/graphql/queries";

export const getAddressesByPostcode = async (
  postcode: string,
): Promise<GetAddressesResponse[] | null> => {
  try {
    const variables: JoinServicesGetAddressesQueryVariables = { postcode };
    const response = await makeGraphQLRequest<JoinServicesGetAddressesQuery>(
      GET_ADDRESSES,
      variables,
      undefined,
    );

    if (!response?.getAddresses) {
      return null;
    }

    const addresses: GetAddressesResponse[] = [];

    response.getAddresses.forEach((address) => {
      if (address !== null) {
        addresses.push(address);
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
