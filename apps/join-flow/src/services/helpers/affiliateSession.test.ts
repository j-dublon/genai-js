import { beforeEach, describe, expect, it, vi } from "vitest";

import { squidAPI } from "@/services/payloadClient";
import { FetchError, ValidationError } from "@/services/payloadTypes";

import { getAffiliateSessionByCode } from "./affiliateSession";

describe("getAffiliateSessionByCode", () => {
  vi.mock("@/services/payloadClient", () => ({
    squidAPI: {
      createAffiliateSessionSync: vi.fn(),
    },
  }));

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should call squidAPI.createAffiliateSessionSync and return successful result", async () => {
    const affiliateCode = "testAffiliate";
    const mockApiSuccess = {
      sessionID: "session123",
      affiliateName: "Test Affiliate",
      useCreditcheckResult: true,
      doEmailValidation: true,
      cuckooAffiliate: "some-affiliate",
    };

    const mockResponse = {
      state: "success",
      data: {
        response: mockApiSuccess,
      },
    };

    (squidAPI.createAffiliateSessionSync as jest.Mock).mockResolvedValue(
      mockResponse,
    );

    const result = await getAffiliateSessionByCode(affiliateCode);

    expect(squidAPI.createAffiliateSessionSync).toHaveBeenCalledWith({
      subdomain: "testAffiliate",
    });

    expect(result).toEqual({
      affiliateSession: mockApiSuccess,
    });
  });

  it("should handle error when bad subdomain is provided", async () => {
    const affiliateCode = "invalidAffiliate";
    const mockResponse = {
      state: "error",
      data: {
        errors: [
          {
            blockType: "KT-CT-7713KrakenUnableToLoadAffiliateLinkBadSubdomain",
            errorMessage: "Bad subdomain",
          },
        ],
      },
    };

    (squidAPI.createAffiliateSessionSync as jest.Mock).mockResolvedValue(
      mockResponse,
    );

    const result = await getAffiliateSessionByCode(affiliateCode);

    expect(squidAPI.createAffiliateSessionSync).toHaveBeenCalledWith({
      subdomain: "invalidAffiliate",
    });

    expect(result).toEqual({
      affiliateSession: {},
      error: {
        type: "invalidSubdomain",
        message: "The affiliate code provided is not valid",
      },
    });
  });

  it("should handle error when session is inactive", async () => {
    const affiliateCode = "inactiveAffiliate";
    const mockResponse = {
      state: "error",
      data: {
        errors: [
          {
            blockType: "AffiliateSessionInactive",
            errorMessage: "Inactive session",
          },
        ],
      },
    };

    (squidAPI.createAffiliateSessionSync as jest.Mock).mockResolvedValue(
      mockResponse,
    );

    const result = await getAffiliateSessionByCode(affiliateCode);

    expect(squidAPI.createAffiliateSessionSync).toHaveBeenCalledWith({
      subdomain: "inactiveAffiliate",
    });

    expect(result).toEqual({
      affiliateSession: {},
      error: {
        type: "noAffiliateFound",
        message: "This affiliate link is no longer active",
      },
    });
  });

  it("should handle generic API error", async () => {
    const affiliateCode = "errorAffiliate";
    const mockResponse = {
      state: "error",
      data: {
        errors: [
          {
            blockType: "UnknownError",
            errorMessage: "Something went wrong",
          },
        ],
      },
    };

    (squidAPI.createAffiliateSessionSync as jest.Mock).mockResolvedValue(
      mockResponse,
    );

    const result = await getAffiliateSessionByCode(affiliateCode);

    expect(result).toEqual({
      affiliateSession: {},
      error: {
        type: "generalError",
        message: "There was a problem with the affiliate lookup",
        details: ["Something went wrong"],
      },
    });
  });

  it("should handle validation errors", async () => {
    const affiliateCode = "invalidFormat";
    const validationError = new ValidationError([
      { message: "Invalid input", path: "subdomain" },
    ]);

    (squidAPI.createAffiliateSessionSync as jest.Mock).mockRejectedValue(
      validationError,
    );

    const result = await getAffiliateSessionByCode(affiliateCode);

    expect(result).toEqual({
      affiliateSession: {},
      error: {
        type: "validationError",
        message: "The affiliate code format is invalid",
        details: ["subdomain is invalid: Invalid input"],
      },
    });
  });

  it("should handle fetch errors", async () => {
    const affiliateCode = "networkError";
    const fetchError = new FetchError(
      500,
      "Internal Server Error",
      "/affiliateSessions",
      {},
      {} as Response,
    );

    (squidAPI.createAffiliateSessionSync as jest.Mock).mockRejectedValue(
      fetchError,
    );

    const result = await getAffiliateSessionByCode(affiliateCode);

    expect(result).toEqual({
      affiliateSession: {},
      error: {
        type: "networkError",
        message: `Server error: HTTP Error: 500 Internal Server Error`,
        details: ["Status: undefined"],
      },
    });
  });

  it("should handle unexpected errors", async () => {
    const affiliateCode = "unexpectedError";
    const unexpectedError = new Error("Unexpected error");

    (squidAPI.createAffiliateSessionSync as jest.Mock).mockRejectedValue(
      unexpectedError,
    );

    const result = await getAffiliateSessionByCode(affiliateCode);

    expect(result).toEqual({
      affiliateSession: {},
      error: {
        type: "unknownError",
        message: "An unexpected error occurred",
        details: ["Unexpected error"],
      },
    });
  });

  it("should handle undefined response", async () => {
    const affiliateCode = "emptyResponse";
    const mockResponse = {
      state: "success",
      data: {
        response: undefined,
      },
    };

    (squidAPI.createAffiliateSessionSync as jest.Mock).mockResolvedValue(
      mockResponse,
    );

    const result = await getAffiliateSessionByCode(affiliateCode);

    expect(result).toEqual({
      affiliateSession: {},
      error: {
        type: "generalError",
        message: "No affiliate data was returned",
      },
    });
  });
});
