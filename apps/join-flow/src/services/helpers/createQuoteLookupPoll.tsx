import { payloadAPI } from "@/services/payloadClient";
import { FetchError, ValidationError } from "@/services/payloadTypes";

import { QuoteLookupSuccess } from "../payloadTypes";

interface QuoteLookupResult {
  products?: QuoteLookupSuccess["response"]["products"];
  quotingCode?: string;
  documentID?: string;
  error?: {
    type:
      | "noProductsAvailable"
      | "invalidAddress"
      | "invalidAffiliateSession"
      | "validationError"
      | "networkError"
      | "unknownError"
      | "timeout";
    message: string;
    details?: string[];
  };
}

export const createQuoteLookupPoll = async (
  affiliateSessionId: string,
  addressLookupId: string,
  addressLookupSelectionIdentifier: string,
): Promise<QuoteLookupResult> => {
  try {
    const initialResponse = await payloadAPI.createQuoteLookupAsync({
      affiliateSession: affiliateSessionId,
      addressLookup: addressLookupId,
      addressLookupSelectionIdentifier: addressLookupSelectionIdentifier,
    });

    if (initialResponse.state === "success") {
      return {
        products: initialResponse.data.response.products || [],
        quotingCode: initialResponse.data.response.quotingCode || undefined,
        documentID: initialResponse.data.documentID,
      };
    }

    if (initialResponse.state === "error") {
      return handleErrors(
        initialResponse.data.errors,
        initialResponse.data.documentID,
      );
    }

    if (initialResponse.state === "pending") {
      const documentID = initialResponse.documentID;
      let nextResponse = null;

      while (true) {
        nextResponse = await payloadAPI.getQuoteLookup(documentID);
        if (nextResponse.state === "pending") {
          await new Promise((resolve) => setTimeout(resolve, 5000));
        } else {
          break;
        }
      }

      if (nextResponse.state === "error") {
        return handleErrors(
          nextResponse.data.errors,
          nextResponse.data.documentID,
        );
      }

      return {
        products: nextResponse.data.response.products || [],
        quotingCode: nextResponse.data.response.quotingCode || undefined,
        documentID: nextResponse.data.documentID,
      };
    }

    return {
      products: [],
      error: {
        type: "unknownError",
        message: "No quote data was returned",
      },
    };
  } catch (error) {
    return handleExceptions(error);
  }
};

const handleErrors = (
  errors: unknown[],
  documentID?: string,
): QuoteLookupResult => {
  const noProductsError = errors.find(
    (err: unknown) =>
      typeof err === "object" &&
      err !== null &&
      "blockType" in err &&
      (err.blockType === "QuoteLookupNoProductsAvailableAtAddress" ||
        err.blockType === "KT-CT-4627KrakenNoProductsAvailableForProperty"),
  );

  if (noProductsError) {
    return {
      products: [],
      documentID,
      error: {
        type: "noProductsAvailable",
        message: "No products are available at this address",
      },
    };
  }

  const invalidAddressError = errors.find(
    (err: unknown) =>
      typeof err === "object" &&
      err !== null &&
      "blockType" in err &&
      (err.blockType === "QuoteLookupInvalidSelectionIdentifier" ||
        err.blockType === "QuoteLookupAddressLookupInvalidState"),
  );

  if (invalidAddressError) {
    return {
      products: [],
      documentID,
      error: {
        type: "invalidAddress",
        message: "The address provided is not valid",
      },
    };
  }

  const affiliateError = errors.find(
    (err: unknown) =>
      typeof err === "object" &&
      err !== null &&
      "blockType" in err &&
      (err.blockType === "QuoteLookupCouldNotLoadAffiliateSession" ||
        err.blockType ===
          "QuoteLookupAffiliateSessionConfigInvalidNoAffiliate"),
  );

  if (affiliateError) {
    return {
      products: [],
      documentID,
      error: {
        type: "invalidAffiliateSession",
        message: "The affiliate session is not valid",
      },
    };
  }

  return {
    products: [],
    documentID,
    error: {
      type: "unknownError",
      message: "There was a problem with the quote lookup",
      details: errors.map((err: unknown) => {
        if (typeof err === "object" && err !== null) {
          if ("errorMessage" in err && typeof err.errorMessage === "string") {
            return err.errorMessage;
          }
          if ("blockType" in err && typeof err.blockType === "string") {
            return err.blockType;
          }
        }
        return "Unknown error";
      }),
    },
  };
};

const handleExceptions = (error: unknown): QuoteLookupResult => {
  if (error instanceof ValidationError) {
    return {
      products: [],
      error: {
        type: "validationError",
        message: "The input data is invalid",
        details: error.details.map((err) =>
          err.path ? `${err.path} is invalid: ${err.message}` : err.message,
        ),
      },
    };
  }

  if (error instanceof FetchError) {
    return {
      products: [],
      error: {
        type: "networkError",
        message: `Server error: ${error.message}`,
        details: [`Status: ${error.response?.status}`],
      },
    };
  }

  return {
    products: [],
    error: {
      type: "unknownError",
      message: "An unexpected error occurred",
      details: [error instanceof Error ? error.message : "Unknown error"],
    },
  };
};
