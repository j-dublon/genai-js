import {
  FetchError,
  type RunCreditCheckResponse,
  squidAPI,
  ValidationError,
} from "@cuckoointernet/util-squid-network-requests";

type CreditCheckErrorType =
  | "networkError"
  | "unknownError"
  | "validationError"
  | "basketError"
  | "creditCheckLimitReached"
  | "creditCheckLoadHashedError";

interface RunCreditCheckResult {
  status?: RunCreditCheckResponse["status"];
  error?: {
    type: CreditCheckErrorType;
    message: string;
    details: string[];
  };
}

export const runCreditCheck = async (
  basketId: string,
): Promise<RunCreditCheckResult> => {
  try {
    const response = await squidAPI.runCreditCheck(basketId);

    return {
      status: response.status,
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
      const errorLabel = error.details[0].label;

      let errorType: CreditCheckErrorType = "validationError";
      switch (errorLabel) {
        case "invalidBasketId":
        case "basketAddressHistoryIncomplete":
        case "basketProductMissing":
        case "basketNotNewSale":
        case "basketEmailNotValid":
        case "basketNameNotValid":
          errorType = "basketError";
          break;
        case "creditCheckLimitReached":
          errorType = "creditCheckLimitReached";
          break;
        case "creditCheckLoadHashedError":
          errorType = "creditCheckLoadHashedError";
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
