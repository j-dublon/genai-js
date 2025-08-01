import {
  FetchError,
  squidAPI,
  ValidationError,
} from "@cuckoointernet/util-squid-network-requests";

import type { AffiliateSession } from "@/store/useJoinFlowStore";

type DefaultAffiliateSessionResult =
  | {
      type: "success";
      id?: string;
      affiliateSession: AffiliateSession;
    }
  | {
      type: "error";
      error: {
        type:
          | "joinSuspended"
          | "noAffiliateFound"
          | "invalidSubdomain"
          | "expiredAffiliate"
          | "inactiveAffiliate"
          | "generalError"
          | "networkError"
          | "validationError"
          | "unknownError";
        message: string;
        details?: string[];
      };
    };

export const getDefaultAffiliateSession = async (
  awinID?: string,
): Promise<DefaultAffiliateSessionResult> => {
  try {
    const response = await squidAPI.getDefaultAffiliate(awinID);

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

      // Kraken API Errors (KT-CT codes)
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

      const expiredAffiliateError = errors.find(
        (err) =>
          err.blockType === "KT-CT-7718KrakenUnableToLoadAffiliateLinkExpired",
      );

      if (expiredAffiliateError) {
        return {
          type: "error",
          error: {
            type: "expiredAffiliate",
            message: "This affiliate link has expired",
          },
        };
      }

      const invalidApiExceptionError = errors.find(
        (err) =>
          err.blockType === "KT-CT-7803KrakenUnableToLoadApiExceptionIdInvalid",
      );

      if (invalidApiExceptionError) {
        return {
          type: "error",
          error: {
            type: "invalidSubdomain",
            message: "The affiliate code provided is not valid",
          },
        };
      }

      // Affiliate Session Internal Errors
      const inactiveError = errors.find(
        (err) =>
          err.blockType === "AffiliateSessionInactive" ||
          err.blockType === "AffiliateSessionExpired",
      );

      if (inactiveError) {
        return {
          type: "error",
          error: {
            type: "inactiveAffiliate",
            message: "This affiliate link is no longer active",
          },
        };
      }

      const joinSuspended = errors.find(
        (err) => err.blockType === "JoinSuspended",
      );

      if (joinSuspended) {
        return {
          type: "error",
          error: {
            type: "joinSuspended",
            message: "Join flow is currently unavailable",
          },
        };
      }

      const unableToLoadLinkDataError = errors.find(
        (err) => err.blockType === "AffiliateSessionUnableToLoadLinkData",
      );

      if (unableToLoadLinkDataError) {
        return {
          type: "error",
          error: {
            type: "noAffiliateFound",
            message: "This affiliate link could not be found",
          },
        };
      }

      const unableToStartSessionError = errors.find(
        (err) => err.blockType === "AffiliateSessionUnableToStartSession",
      );

      if (unableToStartSessionError) {
        return {
          type: "error",
          error: {
            type: "generalError",
            message: "There was a problem starting the affiliate session",
          },
        };
      }

      const unableToLoadCuckooDataError = errors.find(
        (err) => err.blockType === "AffiliateSessionUnableToLoadCuckooData",
      );

      if (unableToLoadCuckooDataError) {
        return {
          type: "error",
          error: {
            type: "noAffiliateFound",
            message: "This affiliate link could not be found",
          },
        };
      }

      return {
        type: "error",
        error: {
          type: "generalError",
          message: "There was a problem creating the affiliate session",
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
    if (error instanceof ValidationError) {
      return {
        type: "error",
        error: {
          type: "validationError",
          message: "The affiliate parameters are invalid",
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
