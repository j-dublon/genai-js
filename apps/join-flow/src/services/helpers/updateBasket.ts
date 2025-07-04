import { squidAPI } from "@/services/payloadClient";
import { FetchError, ValidationError } from "@/services/payloadTypes";

import { Basket } from "../../../payload-types";

interface UpdateBasketResult {
  basket?: Basket;
  error?: {
    type: "generalError" | "validationError" | "networkError" | "unknownError";
    message: string;
    details?: string[];
  };
}

export const updateBasket = async (
  id: string,
  basketData: Partial<Basket>,
): Promise<UpdateBasketResult> => {
  if (!id) {
    return {
      error: {
        type: "validationError",
        message: "Basket ID is required",
        details: ["ID parameter cannot be empty"],
      },
    };
  }

  try {
    const basket = (await squidAPI.updateBasket(id, basketData)) as Basket;

    return {
      basket,
    };
  } catch (error) {
    console.error("Error in updateBasket:", error);

    if (error instanceof ValidationError) {
      return {
        error: {
          type: "validationError",
          message: "The basket data is invalid",
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
