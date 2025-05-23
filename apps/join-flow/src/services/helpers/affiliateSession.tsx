import { payloadAPI } from "@/services/payloadClient";
import { FetchError, ValidationError } from "@/services/payloadTypes";

import { AffiliateSessionSuccessData } from "../payloadTypes";

interface AffiliateSessionResult {
  affiliateSession: AffiliateSessionSuccessData;
  id?: string;
  error?: {
    type:
      | "noAffiliateFound"
      | "invalidSubdomain"
      | "generalError"
      | "validationError"
      | "networkError"
      | "unknownError";
    message: string;
    details?: string[];
  };
}
export const getAffiliateSessionByCode = async (
  affiliateCode: string,
): Promise<AffiliateSessionResult> => {
  try {
    const response = await payloadAPI.createAffiliateSessionSync({
      subdomain: affiliateCode,
    });

    if (response.state === "success" && response.data?.response) {
      return {
        id: response.data.documentID,
        affiliateSession: response.data.response,
      };
    }

    if (response.state === "error" && response.data?.errors) {
      const errors = response.data.errors;

      const badSubdomainError = errors.find(
        (err) =>
          err.blockType ===
          "KT-CT-7713KrakenUnableToLoadAffiliateLinkBadSubdomain",
      );

      if (badSubdomainError) {
        return {
          affiliateSession: {},
          error: {
            type: "invalidSubdomain",
            message: "The affiliate code provided is not valid",
          },
        };
      }

      const inactiveError = errors.find(
        (err) =>
          err.blockType === "AffiliateSessionInactive" ||
          err.blockType === "AffiliateSessionExpired",
      );

      if (inactiveError) {
        return {
          affiliateSession: {},
          error: {
            type: "noAffiliateFound",
            message: "This affiliate link is no longer active",
          },
        };
      }

      return {
        affiliateSession: {},
        error: {
          type: "generalError",
          message: "There was a problem with the affiliate lookup",
          details: errors.map(
            (err) => err.errorMessage || err.blockType || "Unknown error",
          ),
        },
      };
    }

    return {
      affiliateSession: {},
      error: {
        type: "generalError",
        message: "No affiliate data was returned",
      },
    };
  } catch (error) {
    console.error("Error in getAffiliateSessionByCode:", error);

    if (error instanceof ValidationError) {
      return {
        affiliateSession: {},
        error: {
          type: "validationError",
          message: "The affiliate code format is invalid",
          details: error.details.map((err) =>
            err.path ? `${err.path} is invalid: ${err.message}` : err.message,
          ),
        },
      };
    }

    if (error instanceof FetchError) {
      return {
        affiliateSession: {},
        error: {
          type: "networkError",
          message: `Server error: ${error.message}`,
          details: [`Status: ${error.response?.status}`],
        },
      };
    }

    return {
      affiliateSession: {},
      error: {
        type: "unknownError",
        message: "An unexpected error occurred",
        details: [error instanceof Error ? error.message : "Unknown error"],
      },
    };
  }
};
