import { squidAPI } from "@/services/payloadClient";
import { FetchError, ValidationError } from "@/services/payloadTypes";
import type { AffiliateSession } from "@/store/useJoinFlowStore";

type CreateAffiliateSessionResult =
  | {
      type: "success";
      id?: string;
      affiliateSession: AffiliateSession;
    }
  | {
      type: "error";
      error: {
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
    };

export const createAffiliateSession = async (
  affiliateCode: string,
): Promise<CreateAffiliateSessionResult> => {
  try {
    const response = await squidAPI.createAffiliateSessionSync({
      subdomain: affiliateCode,
    });

    if (response.state === "success" && response.data?.response) {
      return {
        type: "success",
        id: response.data.documentID,
        affiliateSession: {
          id: response.data.documentID,
          sessionId: response.data.response.sessionID || "",
          affiliateName: response.data.response.affiliateName || "",
          displayItems: response.data.response.displayItems,
        },
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
          type: "error",
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
          type: "error",
          error: {
            type: "noAffiliateFound",
            message: "This affiliate link is no longer active",
          },
        };
      }

      return {
        type: "error",
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
      type: "error",
      error: {
        type: "generalError",
        message: "No affiliate data was returned",
      },
    };
  } catch (error) {
    console.error("Error in getAffiliateSessionByCode:", error);

    if (error instanceof ValidationError) {
      return {
        type: "error",
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
        type: "error",
        error: {
          type: "networkError",
          message: `Server error: ${error.message}`,
          details: [`Status: ${error.response?.status}`],
        },
      };
    }

    return {
      type: "error",
      error: {
        type: "unknownError",
        message: "An unexpected error occurred",
        details: [error instanceof Error ? error.message : "Unknown error"],
      },
    };
  }
};
