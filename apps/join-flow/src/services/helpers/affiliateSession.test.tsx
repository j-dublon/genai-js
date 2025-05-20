import { beforeEach, describe, expect, it, vi } from "vitest";

import { fetchFromPayload } from "@/services/apiClient";

import { getAffiliateSessionByCode } from "./affiliateSession";

describe("getAffiliateSessionByCode", () => {
  vi.mock("@/services/apiClient", () => ({
    fetchFromPayload: vi.fn(),
  }));

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should call fetchFromPayload with correct parameters and return apiSuccess", async () => {
    const affiliateCode = "testAffiliate";
    const mockResponse = {
      doc: {
        outputs: {
          apiSuccess: {
            sessionID: "session123",
            affiliateName: "Test Affiliate",
            useCreditcheckResult: true,
            doEmailValidation: true,
            cuckooAffiliate: "some-affiliate",
          },
        },
      },
      message: "Success",
    };

    (fetchFromPayload as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getAffiliateSessionByCode(affiliateCode);

    expect(fetchFromPayload).toHaveBeenCalledWith(
      "/affiliateSessions",
      "POST",
      {
        inputs: {
          requestProcessingType: "sync",
          subdomain: "testAffiliate",
        },
      },
    );

    expect(result).toEqual(mockResponse.doc.outputs.apiSuccess);
  });

  it("should throw error when fetchFromPayload fails", async () => {
    const affiliateCode = "testAffiliate";
    const mockError = new Error("API error");

    (fetchFromPayload as jest.Mock).mockRejectedValue(mockError);

    await expect(getAffiliateSessionByCode(affiliateCode)).rejects.toThrow(
      mockError,
    );

    expect(fetchFromPayload).toHaveBeenCalledWith(
      "/affiliateSessions",
      "POST",
      {
        inputs: {
          requestProcessingType: "sync",
          subdomain: "testAffiliate",
        },
      },
    );
  });

  it("should return empty object when no apiSuccess is present", async () => {
    const affiliateCode = "";
    const mockErrorResponse = {
      doc: {
        outputs: {
          apiErrors: [{ message: "Error" }],
        },
      },
      message: "Error",
    };

    (fetchFromPayload as jest.Mock).mockResolvedValue(mockErrorResponse);

    const result = await getAffiliateSessionByCode(affiliateCode);

    expect(fetchFromPayload).toHaveBeenCalledWith(
      "/affiliateSessions",
      "POST",
      {
        inputs: {
          requestProcessingType: "sync",
          subdomain: "",
        },
      },
    );

    expect(result).toEqual({});
  });

  it("should handle null response", async () => {
    const affiliateCode = "test";
    (fetchFromPayload as jest.Mock).mockResolvedValue(undefined);

    const result = await getAffiliateSessionByCode(affiliateCode);

    expect(fetchFromPayload).toHaveBeenCalledWith(
      "/affiliateSessions",
      "POST",
      {
        inputs: {
          requestProcessingType: "sync",
          subdomain: "test",
        },
      },
    );

    expect(result).toEqual({});
  });
});
