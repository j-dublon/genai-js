import {
  FetchError,
  squidAPI,
  ValidationError,
} from "@cuckoointernet/util-squid-network-requests";

type SendEmailCodeErrorType =
  | "networkError"
  | "unknownError"
  | "validationError"
  | "basketError"
  | "emailCodeTooRecent"
  | "emailCodeSpam";

interface SendEmailCodeResult {
  success?: boolean;
  error?: {
    type: SendEmailCodeErrorType;
    message: string;
    details: string[];
  };
}

export const sendEmailCode = async (
  basketId: string,
): Promise<SendEmailCodeResult> => {
  try {
    const response = await squidAPI.emailValidationSendCode(basketId);

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

      let errorType: SendEmailCodeErrorType = "validationError";
      switch (errorLabel) {
        case "invalidBasketId":
        case "basketEmailIncomplete":
          errorType = "basketError";
          break;
        case "emailCodeTooRecent":
          errorType = "emailCodeTooRecent";
          break;
        case "emailCodeSpam":
          errorType = "emailCodeSpam";
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
