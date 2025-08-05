import {
  FetchError,
  squidAPI,
  ValidationError,
} from "@cuckoointernet/util-squid-network-requests";

type ValidateEmailCodeErrorType =
  | "networkError"
  | "unknownError"
  | "validationError"
  | "basketError"
  | "invalidCode";

interface ValidateEmailCodeResult {
  success?: boolean;
  error?: {
    type: ValidateEmailCodeErrorType;
    message: string;
    details: string[];
  };
}

export const validateEmailCode = async (
  basketId: string,
  code: string,
): Promise<ValidateEmailCodeResult> => {
  try {
    const response = await squidAPI.emailValidationCheckCode(basketId, code);

    return {
      success: response.success,
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

      let errorType: ValidateEmailCodeErrorType = "validationError";
      switch (errorLabel) {
        case "invalidBasketId":
          errorType = "basketError";
          break;
        case "invalidCode":
          errorType = "invalidCode";
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
