import { AffiliateSession } from "../../../payload-types";
import { fetchFromPayload } from "../apiClient";

export interface AffiliateSessionResponse {
  doc: AffiliateSession;
  message: string;
}

export const getAffiliateSessionByCode = async (
  affiliateCode: string,
): Promise<AffiliateSessionResponse> => {
  try {
    const requestBody = {
      requestProcessingType: "sync" as const,
      subdomain: affiliateCode,
    };

    const response = await fetchFromPayload<AffiliateSessionResponse>(
      `/affiliateSessions`,
      "POST",
      {
        processingType: "sync",
        inputs: requestBody,
      },
    );
    return response;
  } catch (error) {
    console.error(
      "Error in getAffiliateSessionByCode:",
      error instanceof Error ? error.message : String(error),
    );
    throw error;
  }
};
