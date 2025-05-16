import { fetchFromPayload } from "../apiClient";

export type AddressIdentifier = {
  value: string;
  scheme: string;
  id?: string | null;
};

type ApiAddress = {
  selectionIdentifier: string;
  line1: string;
  line2?: string | null;
  line3?: string | null;
  postcode: string;
  identifiers: AddressIdentifier[];
  id?: string | null;
};

export type Address = {
  line1: string;
  line2: string;
  line3: string;
  postcode: string;
  identifiers: AddressIdentifier[];
};

interface AddressLookupDoc {
  outputs?: {
    apiSuccess?: {
      addresses?: ApiAddress[] | null;
    };
  };
}

interface AddressLookupRequest {
  requestProcessingType: "async" | "sync";
  postcode: string;
}

export const getAddressesByPostcode = async (
  postcode: string,
): Promise<Address[]> => {
  try {
    const requestBody: AddressLookupRequest = {
      requestProcessingType: "sync",
      postcode,
    };

    console.log(requestBody, "req body", postcode, "postcode");

    const response = await fetchFromPayload<{
      doc: AddressLookupDoc;
      message: string;
    }>(`/addressLookups`, "POST", { inputs: requestBody });

    console.log(response, "response");

    if (response.doc?.outputs?.apiSuccess?.addresses) {
      const addresses = response.doc.outputs.apiSuccess.addresses;

      return addresses.map((item) => ({
        line1: item.line1 || "",
        line2: item.line2 || "",
        line3: item.line3 || "",
        postcode: item.postcode || "",
        identifiers: item.identifiers || [],
      }));
    }

    console.log("No addresses found in response:", response);
    return [];
  } catch (error) {
    console.error("Error in getAddressesByPostcode:", error);
    throw error;
  }
};
