import { squidAPI } from "@services/payloadClient";

import { StoreBasket } from "@/store/useJoinFlowStore";

export interface CicsResponse {
  success: boolean;
  data: {
    contractSummary: string;
    contractInformation: string;
  };
}

export const getCICS = async (basketId: string): Promise<CicsResponse> => {
  try {
    const response: StoreBasket["cics"] = await squidAPI.getCICS(basketId);
    if (response && response.summaryHref && response.informationHref) {
      return {
        success: true,
        data: {
          contractSummary: response.summaryHref,
          contractInformation: response.informationHref,
        },
      };
    }
  } catch (error) {
    // If we can't fetch CI/CS we can't finish the sale, need to redirect to an 'Oops' page
    console.error("Failed to fetch CICS for basket:", basketId, error);
  }

  return {
    success: false,
    data: {
      contractSummary: "/",
      contractInformation: "/",
    },
  };
};
