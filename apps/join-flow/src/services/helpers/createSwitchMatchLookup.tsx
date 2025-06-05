import { payloadAPI } from "@/services/payloadClient";
import {
  FetchError,
  SwitchMatchLookupInputs,
  SwitchMatchLookupSuccess,
  ValidationError,
} from "@/services/payloadTypes";

interface CreateSwitchMatchLookupResult {
  switchMatchLookup?: SwitchMatchLookupSuccess["documentID"];
  error?: {
    type: "generalError" | "validationError" | "networkError" | "unknownError";
    message: string;
    details?: string[];
  };
}

export const createSwitchMatchLookup = async (
  basket: SwitchMatchLookupInputs["basket"],
  losingRcpid: SwitchMatchLookupInputs["losingRcpid"],
  losingProviderAccountID?: SwitchMatchLookupInputs["losingProviderAccountID"],
): Promise<CreateSwitchMatchLookupResult> => {
  try {
    const switchMatchLookup = await payloadAPI.createSwitchMatchLookupSync({
      basket,
      losingRcpid,
      losingProviderAccountID,
    });
    if (switchMatchLookup.state === "success") {
      return {
        switchMatchLookup: switchMatchLookup.data.documentID,
      };
    } else {
      return {
        error: {
          type: "generalError",
          message: "Switch match lookup failed",
        },
      };
    }
  } catch (error) {
    console.error("Error in createSwitchMatchLookup:", error);

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
