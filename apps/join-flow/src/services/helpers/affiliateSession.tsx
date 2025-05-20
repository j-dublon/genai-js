import { AffiliateSession } from "../../../payload-types";
import { fetchFromPayload } from "../apiClient";
import {
  AffiliateSessionInputs,
  AffiliateSessionSuccess,
} from "../payloadTypes";

export const getAffiliateSessionByCode = async (
  affiliateCode: string,
): Promise<AffiliateSessionSuccess["response"]> => {
  try {
    const requestBody: AffiliateSessionInputs = {
      subdomain: affiliateCode,
    };

    const response = await fetchFromPayload<{
      doc: AffiliateSession;
      message: string;
    }>(`/affiliateSessions`, "POST", {
      inputs: {
        requestProcessingType: "sync",
        ...requestBody,
      },
    });

    if (response?.doc?.outputs?.apiSuccess) {
      return response.doc.outputs.apiSuccess;
    }
    return {};
  } catch (error) {
    console.error(
      "Error in getAffiliateSessionByCode:",
      error instanceof Error ? error.message : String(error),
    );
    throw error;
  }
};
