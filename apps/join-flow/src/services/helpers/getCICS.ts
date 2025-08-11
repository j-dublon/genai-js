import {
  FetchError,
  squidAPI,
  ValidationError,
} from "@cuckoointernet/util-squid-network-requests";

import { StoreBasket } from "@/store/useJoinFlowStore";

type GetCicsErrorType =
  | "networkError"
  | "unknownError"
  | "validationError"
  | "basketError";

interface GetCicsResult {
  success?: boolean;
  data?: {
    contractSummary: string;
    contractInformation: string;
  };
  error?: {
    type: GetCicsErrorType;
    message: string;
    details: string[];
  };
}

export interface CicsResponse {
  success: boolean;
  data: {
    contractSummary: string;
    contractInformation: string;
  };
}

export const getCICS = async (basketId: string): Promise<GetCicsResult> => {
  try {
    const response: StoreBasket["cics"] = await squidAPI.getCICS(basketId);

    if (response && response.summaryHref && response.informationHref) {
      return {
        success: true,
        data: {
          contractSummary: response.summaryHref,
          contractInformation: response.informationHref,
        },
      };
    }

    return {
      error: {
        type: "unknownError",
        message: "Contract information not found",
        details: ["CICS data is missing or incomplete"],
      },
    };
  } catch (error) {
    if (error instanceof FetchError) {
      return {
        error: {
          type: "networkError",
          message: `Server error: ${error.message}`,
          details: [`Status: ${error.response?.status}`],
        },
      };
    }

    if (error instanceof ValidationError) {
      const errorLabel = error.details[0]?.label;

      let errorType: GetCicsErrorType = "validationError";
      switch (errorLabel) {
        case "invalidBasketId":
        case "basketNotFound":
          errorType = "basketError";
          break;
        default:
          errorType = "validationError";
          break;
      }
      return {
        error: {
          type: errorType,
          message: error.message,
          details: error.details.map((err) =>
            err.path ? `${err.path} is invalid: ${err.message}` : err.message,
          ),
        },
      };
    }

    return {
      error: {
        type: "unknownError",
        message: "An unexpected error occurred",
        details: [error instanceof Error ? error.message : "Unknown error"],
      },
    };
  }
};
