import {
  type QuoteLookupSuccess,
  squidAPI,
} from "@cuckoointernet/util-squid-network-requests";

interface QuoteLookupResult {
  products?: QuoteLookupSuccess["response"]["products"];
  quotingCode?: string;
  documentID?: string;
  error?: {
    type: "joinSuspended" | "unknownError" | "invalidAddressError";
    message: string;
    details?: string[];
  };
}

export const createQuoteLookupPoll = async (
  affiliateSessionId: string,
  addressLookupId: string,
  addressLookupSelectionIdentifier: string,
): Promise<QuoteLookupResult> => {
  const initialResponse = await squidAPI.createQuoteLookupAsync({
    affiliateSession: affiliateSessionId,
    addressLookup: addressLookupId,
    addressLookupSelectionIdentifier: addressLookupSelectionIdentifier,
  });

  const documentID = initialResponse.documentID;
  let nextResponse = null;

  while (true) {
    nextResponse = await squidAPI.getQuoteLookup(documentID);
    if (nextResponse.state === "pending") {
      await new Promise((resolve) => setTimeout(resolve, 5000));
    } else {
      break;
    }
  }

  if (nextResponse.state === "error" && nextResponse.data?.errors) {
    const errors = nextResponse.data.errors;

    const joinSuspended = errors.find(
      (err) => err.blockType === "JoinSuspended",
    );

    if (joinSuspended) {
      return {
        products: [],
        documentID: nextResponse.data.documentID,
        error: {
          type: "joinSuspended",
          message: "Join flow is currently unavailable",
        },
      };
    }

    const unknownError = errors.find((err) => err.blockType === "UnknownError");

    if (unknownError) {
      return {
        products: [],
        documentID: nextResponse.data.documentID,
        error: {
          type: "unknownError",
          message: "An unexpected error occurred",
          details: errors.map(
            (err) => err.errorMessage || err.blockType || "Unknown error",
          ),
        },
      };
    }

    const invalidAddressError = errors.find(
      (err) =>
        err.blockType === "KT-CT-4410KrakenAddressLookupBadPostcode" ||
        err.blockType === "KT-CT-4616KrakenUnableToCreateQuote" ||
        err.blockType === "KT-CT-4627KrakenNoProductsAvailableForProperty" ||
        err.blockType === "KT-CT-4620KrakenUnableToLoadQuote" ||
        err.blockType === "KT-CT-4619KrakenUnableToLoadQuoteBadQuoteCode" ||
        err.blockType === "QuoteLookupCouldNotLoadAffiliateSession" ||
        err.blockType === "QuoteLookupCouldNotLoadAddressLookup" ||
        err.blockType === "QuoteLookupAddressLookupInvalidState" ||
        err.blockType === "QuoteLookupInvalidSelectionIdentifier" ||
        err.blockType === "QuoteLookupKrakenCreateTelcoError" ||
        err.blockType === "QuoteLookupResultPollingTimeout" ||
        err.blockType === "QuoteLookupKrakenPollingError" ||
        err.blockType === "QuoteLookupKrakenRetrievalError" ||
        err.blockType === "QuoteLookupKrakenFormatError" ||
        err.blockType === "QuoteLookupNoProductsAvailableAtAddress" ||
        err.blockType === "QuoteLookupNoProductsAvailableForDiscriminator" ||
        err.blockType ===
          "QuoteLookupAffiliateSessionConfigInvalidNoAffiliate" ||
        err.blockType === "QuoteLookupBadConfiguration",
    );

    if (invalidAddressError) {
      return {
        products: [],
        documentID: nextResponse.data.documentID,
        error: {
          type: "invalidAddressError",
          message: "This address cannot be serviced",
          details: errors.map(
            (err) => err.errorMessage || err.blockType || "Unknown error",
          ),
        },
      };
    }

    return {
      products: [],
      documentID: nextResponse.data.documentID,
      error: {
        type: "unknownError",
        message: "There was a problem with the quote lookup",
        details: errors.map(
          (err) => err.errorMessage || err.blockType || "Unknown error",
        ),
      },
    };
  }

  if (nextResponse.state === "success" && nextResponse.data?.response) {
    return {
      products: nextResponse.data.response.products || [],
      quotingCode: nextResponse.data.response.quotingCode || undefined,
      documentID: nextResponse.data.documentID,
    };
  }

  return {
    products: [],
    documentID: nextResponse.data?.documentID,
    error: {
      type: "unknownError",
      message: "There was a problem with the quote lookup",
    },
  };
};
