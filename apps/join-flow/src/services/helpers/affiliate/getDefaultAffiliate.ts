import {
  FetchError,
  squidAPI,
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
        type: "generalError" | "networkError" | "unknownError";
        message?: string;
        details?: string[];
      };
    };

export const getDefaultAffiliateSession =
  async (): Promise<DefaultAffiliateSessionResult> => {
    try {
      const response = await squidAPI.getDefaultAffiliate();

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

      return {
        type: "error",
        error: {
          type: "generalError",
          message: "No affiliate data was returned",
        },
      };
    } catch (error) {
      console.error("Error in getDefaultAffiliateSession:", error);
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
