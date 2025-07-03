import { squidAPI } from "../payloadClient";
import {
  FetchError,
  RunCreditCheckResponse,
  ValidationError,
} from "../payloadTypes";

interface RunCreditCheckResult {
  status?: RunCreditCheckResponse["status"];
  message?: RunCreditCheckResponse["message"];
  error?: {
    type: "networkError" | "unknownError" | "validationError";
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
      message: response.message,
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
