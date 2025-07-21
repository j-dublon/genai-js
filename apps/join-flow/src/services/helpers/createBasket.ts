import {
  type Basket,
  FetchError,
  type InitialBasket,
  squidAPI,
  ValidationError,
} from "@cuckoointernet/util-squid-network-requests";

interface CreateBasketResult {
  basket?: Basket;
  error?: {
    type: "generalError" | "validationError" | "networkError" | "unknownError";
    message: string;
    details?: string[];
  };
}

export const createBasket = async (
  basketData: InitialBasket,
): Promise<CreateBasketResult> => {
  try {
    const basket = await squidAPI.createBasket(basketData);

    return {
      basket,
    };
  } catch (error) {
    console.error("Error in createBasket:", error);

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
