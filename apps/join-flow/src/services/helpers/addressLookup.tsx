import { squidAPI } from "@/services/payloadClient";
import { FetchError, ValidationError } from "@/services/payloadTypes";

import { AddressLookupSuccess } from "../payloadTypes";

interface AddressLookupResult {
  addresses: AddressLookupSuccess["response"]["addresses"];
  error?: {
    type:
      | "noAddressFound"
      | "invalidPostcode"
      | "generalError"
      | "validationError"
      | "networkError"
      | "unknownError";
    message: string;
    details?: string[];
  };
}

export const getAddressesByPostcode = async (
  postcode: string,
): Promise<AddressLookupResult> => {
  try {
    const response = await squidAPI.createAddressLookupSync({
      postcode,
    });
    if (response.state === "success" && response.data?.response?.addresses) {
      const addressId = response.data.documentID;
      const addresses = response.data.response.addresses;
      return {
        addresses: addresses.map((item) => ({
          id: addressId,
          selectionIdentifier: item.selectionIdentifier || "",
          line1: item.line1 || "",
          line2: item.line2 || "",
          line3: item.line3 || "",
          postcode: item.postcode || "",
          identifiers: item.identifiers || [],
        })),
      };
    }

    if (response.state === "error" && response.data?.errors) {
      const errors = response.data.errors;

      const noAddressError = errors.find(
        (err) => err.blockType === "AddressLookupNoAddressesAtPostcode",
      );

      if (noAddressError) {
        return {
          addresses: [],
          error: {
            type: "noAddressFound",
            message: "No addresses found at this postcode",
          },
        };
      }

      const invalidPostcodeError = errors.find(
        (err) => err.blockType === "KT-CT-4410KrakenAddressLookupBadPostcode",
      );

      if (invalidPostcodeError) {
        return {
          addresses: [],
          error: {
            type: "invalidPostcode",
            message: "The postcode provided is not valid",
          },
        };
      }

      return {
        addresses: [],
        error: {
          type: "generalError",
          message: "There was a problem with the postcode lookup",
          details: errors.map(
            (err) => err.errorMessage || err.blockType || "Unknown error",
          ),
        },
      };
    }

    return {
      addresses: [],
      error: {
        type: "generalError",
        message: "No address data was returned",
      },
    };
  } catch (error) {
    console.error("Error in getAddressesByPostcode:", error);

    if (error instanceof ValidationError) {
      return {
        addresses: [],
        error: {
          type: "validationError",
          message: "The postcode format is invalid",
          details: error.details.map((err) =>
            err.path ? `${err.path} is invalid: ${err.message}` : err.message,
          ),
        },
      };
    }

    if (error instanceof FetchError) {
      return {
        addresses: [],
        error: {
          type: "networkError",
          message: `Server error: ${error.message}`,
          details: [`Status: ${error.response?.status}`],
        },
      };
    }

    return {
      addresses: [],
      error: {
        type: "unknownError",
        message: "An unexpected error occurred",
        details: [error instanceof Error ? error.message : "Unknown error"],
      },
    };
  }
};
