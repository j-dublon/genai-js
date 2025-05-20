import { AddressLookup } from "../../../payload-types";
import { fetchFromPayload } from "../apiClient";
import { AddressLookupInputs, AddressLookupSuccess } from "../payloadTypes";

export const getAddressesByPostcode = async (
  postcode: string,
): Promise<AddressLookupSuccess["response"]["addresses"]> => {
  try {
    const requestBody: AddressLookupInputs = {
      postcode,
    };

    const response = await fetchFromPayload<{
      doc: AddressLookup;
      message: string;
    }>(`/addressLookups`, "POST", {
      inputs: {
        requestProcessingType: "sync",
        ...requestBody,
      },
    });

    if (response.doc?.outputs?.apiSuccess?.addresses) {
      const addresses = response.doc.outputs.apiSuccess.addresses;

      return addresses.map((item) => ({
        selectionIdentifier: item.selectionIdentifier || "",
        line1: item.line1 || "",
        line2: item.line2 || "",
        line3: item.line3 || "",
        postcode: item.postcode || "",
        identifiers: item.identifiers || [],
      }));
    }
    return [];
  } catch (error) {
    console.error("Error in getAddressesByPostcode:", error);
    throw error;
  }
};
