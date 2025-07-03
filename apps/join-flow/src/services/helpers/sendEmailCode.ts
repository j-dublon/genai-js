import { squidAPI } from "../payloadClient";
import { FetchError, ValidationError } from "../payloadTypes";

interface SendEmailCodeResult {
  success?: boolean;
  error?: {
    type: "networkError" | "unknownError" | "validationError";
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
      return {
        error: {
          type: "validationError",
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
