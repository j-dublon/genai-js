import {
  FetchError,
  type KrakenSwitchMatchServiceProvider,
  squidAPI,
} from "@cuckoointernet/util-squid-network-requests";

interface GetAllProvidersResult {
  providers?: KrakenSwitchMatchServiceProvider[];
  error?: {
    type: "networkError" | "unknownError";
    message: string;
    details: string[];
  };
}

export const getAllProviders = async (): Promise<GetAllProvidersResult> => {
  try {
    const response = await squidAPI.getSwitchMatchServiceProviders();

    return {
      providers: response,
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

    return {
      error: {
        type: "unknownError",
        message: "An unexpected error occurred",
        details: [error instanceof Error ? error.message : "Unknown error"],
      },
    };
  }
};
