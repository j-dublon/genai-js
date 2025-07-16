import { squidAPI } from "@/services/payloadClient";
import {
  FetchError,
  RegisterOfInterestSubmissionsInputs,
  RegisterOfInterestSubmissionsSuccess,
  ValidationError,
} from "@/services/payloadTypes";

interface RegisterInterestResult {
  roi?: RegisterOfInterestSubmissionsSuccess["documentID"];
  error?: {
    type: "generalError" | "validationError" | "networkError" | "unknownError";
    message: string;
    details?: string[];
  };
}

export const registerInterest = async (
  data: RegisterOfInterestSubmissionsInputs,
): Promise<RegisterInterestResult> => {
  const {
    email,
    fullName,
    address,
    affiliateCode,
    originJourney,
    endOfContractDate,
    isServiceable,
  } = data;
  try {
    const registerOfInterest =
      await squidAPI.createRegisterOfInterestSubmissionSync({
        email,
        fullName,
        address,
        affiliateCode,
        originJourney,
        endOfContractDate,
        isServiceable,
      });
    if (registerOfInterest.state === "success") {
      return {
        roi: registerOfInterest.data.documentID,
      };
    } else {
      return {
        error: {
          type: "generalError",
          message: "Register of interest submission failed",
        },
      };
    }
  } catch (error) {
    console.error("Error in registerInterest:", error);

    if (error instanceof ValidationError) {
      return {
        error: {
          type: "validationError",
          message: "The register of interest data is invalid",
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
