import {
  type Basket,
  FetchError,
  squidAPI,
  ValidationError,
} from "@cuckoointernet/util-squid-network-requests";

type UpdateBasketErrorType =
  | "generalError"
  | "validationError"
  | "networkError"
  | "unknownError"
  | "basketError";

interface UpdateBasketResult {
  basket?: Basket;
  error?: {
    type: UpdateBasketErrorType;
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
        type: "basketError",
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
    if (error instanceof ValidationError) {
      let errorType: UpdateBasketErrorType = "validationError";
      if (error.details[0].message === "Not Found") {
        errorType = "basketError";
      }

      return {
        error: {
          type: errorType,
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
