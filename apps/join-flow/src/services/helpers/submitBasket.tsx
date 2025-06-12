import type { StoreBasket } from "@store/useJoinFlowStore";

import { payloadAPI } from "@/services/payloadClient";
import { FetchError, ValidationError } from "@/services/payloadTypes";

interface SubmitBasketResult {
  basket?: StoreBasket;
  error?: {
    type: "generalError" | "validationError" | "networkError" | "unknownError";
    message: string;
    details?: string[];
  };
}

export const submitBasket = async (
  basketId: string,
): Promise<SubmitBasketResult> => {
  if (!basketId) {
    return {
      error: {
        type: "validationError",
        message: "Basket ID is required",
        details: ["ID parameter cannot be empty"],
      },
    };
  }

  try {
    const basket = (await payloadAPI.signUpToKraken(basketId)) as StoreBasket;

    return {
      basket,
    };
  } catch (error) {
    console.error("Error in submitBasket:", error);

    if (error instanceof ValidationError) {
      return {
        error: {
          type: "validationError",
          message: "The basket submission is invalid",
          details: error.details.map((err) =>
            err.path ? `${err.path} is invalid: ${err.message}` : err.message,
          ),
        },
      };
    }

    if (error instanceof FetchError) {
      return {
        error: {
          type: "networkError",
          message: `Server error: ${error.message}`,
          details: [`Status: ${error.response?.status}`],
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
