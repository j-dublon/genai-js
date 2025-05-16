import { describe, expect, it, vi } from "vitest";

import { fetchFromPayload } from "@/services/apiClient";

import { AffiliateSession } from "../../../payload-types";
import {
  AffiliateSessionResponse,
  getAffiliateSessionByCode,
} from "./affiliateSession";

describe("getAffiliateSessionByCode", () => {
  vi.mock("@/services/apiClient", () => ({
    fetchFromPayload: vi.fn(),
  }));

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should call fetchFromPayload with correct parameters", async () => {
    const affiliateCode = "testAffiliate";
    const mockResponse: AffiliateSessionResponse = {
      doc: {
        id: "123",
        createdAt: "2025-05-16T12:00:00.000Z",
        updatedAt: "2025-05-16T12:00:00.000Z",
        inputs: {
          requestProcessingType: "sync",
          subdomain: "testAffiliate",
        },
        outputs: {
          state: "success",
          apiSuccess: {
            sessionID: "session123",
            affiliateName: "Test Affiliate",
            useCreditcheckResult: true,
            doEmailValidation: true,
          },
          apiErrors: [],
          apiTraceIDs: [],
        },
      } as AffiliateSession,
      message: "Affiliate Session successfully created.",
    };

    (fetchFromPayload as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getAffiliateSessionByCode(affiliateCode);

    expect(fetchFromPayload).toHaveBeenCalledWith(
      "/affiliateSessions",
      "POST",
      {
        processingType: "sync",
        inputs: {
          requestProcessingType: "sync",
          subdomain: "testAffiliate",
        },
      },
    );
    expect(result).toEqual(mockResponse);
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
        processingType: "sync",
        inputs: {
          requestProcessingType: "sync",
          subdomain: "testAffiliate",
        },
      },
    );
  });

  it("should handle empty affiliate code", async () => {
    const affiliateCode = "";
    const mockResponse: AffiliateSessionResponse = {
      doc: {
        id: "123",
        createdAt: "2025-05-16T12:00:00.000Z",
        updatedAt: "2025-05-16T12:00:00.000Z",
        inputs: {
          requestProcessingType: "sync",
          subdomain: "",
        },
        outputs: {
          state: "error",
          apiErrors: [
            {
              internalError: null,
              errorMessage: "Invalid affiliate code",
              id: null,
              blockName: null,
              blockType: "AffiliateSessionUnableToLoadLinkData",
            },
          ],
          apiTraceIDs: [],
        },
      } as AffiliateSession,
      message: "Error processing affiliate session",
    };

    (fetchFromPayload as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getAffiliateSessionByCode(affiliateCode);

    expect(fetchFromPayload).toHaveBeenCalledWith(
      "/affiliateSessions",
      "POST",
      {
        processingType: "sync",
        inputs: {
          requestProcessingType: "sync",
          subdomain: "",
        },
      },
    );
    expect(result).toEqual(mockResponse);
  });
});
