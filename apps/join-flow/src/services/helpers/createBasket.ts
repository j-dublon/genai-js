import {
  type Basket,
  FetchError,
  type InitialBasket,
  squidAPI,
  ValidationError,
} from "@cuckoointernet/util-squid-network-requests";

type CreateBasketResult =
  | {
      type: "success";
      basket: Basket;
    }
  | {
      type: "error";
      error: {
        type: "validationError" | "networkError" | "unknownError";
        message: string;
        details?: string[];
      };
    };

export const createBasket = async (
  basketData: InitialBasket,
): Promise<CreateBasketResult> => {
  try {
    const basket = await squidAPI.createBasket(basketData);

    return {
      type: "success",
      basket,
    };
  } catch (error) {
    if (error instanceof ValidationError) {
      return {
        type: "error",
        error: {
          type: "validationError",
          message: error.message,
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
          message: error.message,
          details: [`Status: ${error.response?.status}`],
        },
      };
    }

    return {
      type: "error",
      error: {
        type: "unknownError",
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        details: [error instanceof Error ? error.message : "Unknown error"],
      },
    };
  }
};
