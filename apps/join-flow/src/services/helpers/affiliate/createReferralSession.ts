import { squidAPI } from "@/services/payloadClient";
import type { AffiliateSession } from "@/store/useJoinFlowStore";

type CreateReferralSessionResult =
  | {
      type: "success";
      id?: string;
      affiliateSession: AffiliateSession;
    }
  | {
      type: "error";
      error: {
        type: "generalError" | "networkError" | "unknownError";
        message?: string;
        details?: string[];
      };
    };

export const createReferralSession = async (
  code: string,
): Promise<CreateReferralSessionResult> => {
  try {
    const [referralResponse, defaultAffiliateResponse] = await Promise.all([
      squidAPI.createReferralSessionSync({
        code,
      }),
      squidAPI.getDefaultReferralAffiliate(),
    ]);

    if (
      referralResponse.state === "success" &&
      defaultAffiliateResponse.state === "success"
    ) {
      return {
        type: "success",
        id: defaultAffiliateResponse.data.documentID,
        affiliateSession: {
          id: defaultAffiliateResponse.data.documentID,
          sessionId: defaultAffiliateResponse.data.response.sessionID || "",
          affiliateName:
            defaultAffiliateResponse.data.response.affiliateName || "",
          displayItems: defaultAffiliateResponse.data.response.displayItems,
        },
      };
    }

    if (
      referralResponse.state === "error" &&
      defaultAffiliateResponse.state === "error"
    ) {
      return {
        type: "error",
        error: {
          type: "generalError",
          message: "Referral session creation and default affiliate failed",
          details: [
            ...referralResponse.data.errors.map(
              (error) => error.errorMessage || "Unknown error",
            ),
            ...defaultAffiliateResponse.data.errors.map(
              (error) => error.errorMessage || "Unknown error",
            ),
          ],
        },
      };
    }

    if (referralResponse.state === "error") {
      return {
        type: "error",
        error: {
          type: "generalError",
          message: "Referral session creation failed",
          details: referralResponse.data.errors.map(
            (error) => error.errorMessage || "Unknown error",
          ),
        },
      };
    }

    if (defaultAffiliateResponse.state === "error") {
      return {
        type: "error",
        error: {
          type: "generalError",
          message: "No affiliate data was returned",
          details: defaultAffiliateResponse.data.errors.map(
            (error) => error.errorMessage || "Unknown error",
          ),
        },
      };
    }

    return {
      type: "error",
      error: {
        type: "unknownError",
        message: "An unexpected error occurred",
      },
    };
  } catch (error) {
    console.error("Error in createReferralSession:", error);

    return {
      type: "error",
      error: {
        type: "unknownError",
        message: "An unexpected error occurred",
      },
    };
  }
};
