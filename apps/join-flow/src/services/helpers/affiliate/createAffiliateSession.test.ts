import {
  FetchError,
  squidAPI,
  ValidationError,
} from "@cuckoointernet/util-squid-network-requests";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createAffiliateSession } from "./createAffiliateSession";

vi.mock("@cuckoointernet/util-squid-network-requests", async () => {
  const actual = await vi.importActual(
    "@cuckoointernet/util-squid-network-requests",
  );
  return {
    ...actual,
    squidAPI: {
      createAffiliateSessionSync: vi.fn(),
    },
  };
});
const mockCreateAffiliateSessionSync = vi.mocked(
  squidAPI.createAffiliateSessionSync,
);

describe("createAffiliateSession", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should call squidAPI.createAffiliateSessionSync and return successful result", async () => {
    const affiliateCode = "testAffiliate";
    const mockResponse = {
      state: "success" as const,
      data: {
        documentID: "aff-123",
        response: {
          sessionID: "session123",
          affiliateName: "Test Affiliate",
          displayItems: {
            termsAndConditionsLink: "https://example.com/terms",
            privacyPolicyLink: "https://example.com/privacy",
          },
        },
      },
    };

    mockCreateAffiliateSessionSync.mockResolvedValue(mockResponse);

    const result = await createAffiliateSession(affiliateCode);

    expect(mockCreateAffiliateSessionSync).toHaveBeenCalledWith({
      subdomain: "testAffiliate",
    });

    expect(result).toEqual({
      type: "success",
      id: "aff-123",
      affiliateSession: {
        id: "aff-123",
        sessionId: "session123",
        affiliateName: "Test Affiliate",
        displayItems: {
          termsAndConditionsLink: "https://example.com/terms",
          privacyPolicyLink: "https://example.com/privacy",
        },
      },
    });
  });

  it("should handle error when bad subdomain is provided", async () => {
    const affiliateCode = "invalidAffiliate";
    const mockResponse = {
      state: "error" as const,
      data: {
        documentID: "aff-123",
        errors: [
          {
            blockType:
              "KT-CT-7713KrakenUnableToLoadAffiliateLinkBadSubdomain" as const,
            errorMessage: "Bad subdomain",
          },
        ],
      },
    };

    mockCreateAffiliateSessionSync.mockResolvedValue(mockResponse);

    const result = await createAffiliateSession(affiliateCode);

    expect(squidAPI.createAffiliateSessionSync).toHaveBeenCalledWith({
      subdomain: "invalidAffiliate",
    });

    expect(result).toEqual({
      type: "error",
      error: {
        type: "invalidSubdomain",
        message: "The affiliate code provided is not valid",
      },
    });
  });

  it("should handle error when session is inactive", async () => {
    const affiliateCode = "inactiveAffiliate";
    const mockResponse = {
      state: "error" as const,
      data: {
        documentID: "aff-123",
        errors: [
          {
            blockType: "AffiliateSessionInactive" as const,
            errorMessage: "Inactive session",
          },
        ],
      },
    };

    mockCreateAffiliateSessionSync.mockResolvedValue(mockResponse);

    const result = await createAffiliateSession(affiliateCode);

    expect(squidAPI.createAffiliateSessionSync).toHaveBeenCalledWith({
      subdomain: "inactiveAffiliate",
    });

    expect(result).toEqual({
      type: "error",
      error: {
        type: "inactiveAffiliate",
        message: "This affiliate link is no longer active",
      },
    });
  });

  it("should handle generic API error", async () => {
    const affiliateCode = "errorAffiliate";
    const mockResponse = {
      state: "error" as const,
      data: {
        documentID: "aff-123",
        errors: [
          {
            blockType: "UnknownError" as const,
            errorMessage: "Something went wrong",
          },
        ],
      },
    };

    mockCreateAffiliateSessionSync.mockResolvedValue(mockResponse);

    const result = await createAffiliateSession(affiliateCode);

    expect(result).toEqual({
      type: "error",
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

    mockCreateAffiliateSessionSync.mockRejectedValue(validationError);

    const result = await createAffiliateSession(affiliateCode);

    expect(result).toEqual({
      type: "error",
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

    mockCreateAffiliateSessionSync.mockRejectedValue(fetchError);

    const result = await createAffiliateSession(affiliateCode);

    expect(result).toEqual({
      type: "error",
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

    mockCreateAffiliateSessionSync.mockRejectedValue(unexpectedError);

    const result = await createAffiliateSession(affiliateCode);

    expect(result).toEqual({
      type: "error",
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
      state: "success" as const,
      data: {
        documentID: "bla",
        response: undefined,
      },
    };

    // @ts-expect-error - we're not expecting undefined
    mockCreateAffiliateSessionSync.mockResolvedValue(mockResponse);

    const result = await createAffiliateSession(affiliateCode);

    expect(result).toEqual({
      type: "error",
      error: {
        type: "generalError",
        message: "No affiliate data was returned",
      },
    });
  });
});
