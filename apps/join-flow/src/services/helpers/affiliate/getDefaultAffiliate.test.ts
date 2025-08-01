import {
  FetchError,
  squidAPI,
} from "@cuckoointernet/util-squid-network-requests";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getDefaultAffiliateSession } from "./getDefaultAffiliate";

vi.mock("@cuckoointernet/util-squid-network-requests", async () => {
  const actual = await vi.importActual(
    "@cuckoointernet/util-squid-network-requests",
  );
  return {
    ...actual,
    squidAPI: {
      getDefaultAffiliate: vi.fn(),
    },
  };
});
const mockGetDefaultAffiliate = vi.mocked(squidAPI.getDefaultAffiliate);

describe("getDefaultAffiliateSession", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("success cases", () => {
    it("should return success with affiliate session data when API returns valid response", async () => {
      const mockResponse = {
        state: "success" as const,
        data: {
          documentID: "affiliate-123",
          response: {
            sessionID: "session-456",
            affiliateName: "Test Affiliate",
            displayItems: {
              termsAndConditionsLink: "https://example.com/terms",
              privacyPolicyLink: "https://example.com/privacy",
            },
          },
        },
      };

      mockGetDefaultAffiliate.mockResolvedValue(mockResponse);

      const result = await getDefaultAffiliateSession();

      expect(result).toEqual({
        type: "success",
        id: "affiliate-123",
        affiliateSession: {
          id: "affiliate-123",
          sessionId: "session-456",
          affiliateName: "Test Affiliate",
          displayItems: {
            termsAndConditionsLink: "https://example.com/terms",
            privacyPolicyLink: "https://example.com/privacy",
          },
        },
      });
    });
  });

  describe("error cases", () => {
    it("should return general error when API response state is not success", async () => {
      const mockResponse = {
        state: "error" as const,
        data: {
          documentID: "affiliate-123",
          errors: [
            {
              errorMessage: "Some error occurred",
              id: "error-1",
              blockName: "test",
              blockType: "UnknownError" as const,
            },
          ],
        },
      };

      mockGetDefaultAffiliate.mockResolvedValue(mockResponse);

      const result = await getDefaultAffiliateSession();

      expect(result).toEqual({
        type: "error",
        error: {
          type: "generalError",
          message: "There was a problem creating the affiliate session",
          details: ["Some error occurred"],
        },
      });
    });

    it("should return general error when API response data is missing", async () => {
      const mockResponse = {
        state: "success" as const,
        data: null,
      };

      // @ts-expect-error - we're not expecting null
      mockGetDefaultAffiliate.mockResolvedValue(mockResponse);

      const result = await getDefaultAffiliateSession();

      expect(result).toEqual({
        type: "error",
        error: {
          type: "generalError",
          message: "No affiliate data was returned",
        },
      });
    });

    it("should return general error when API response data.response is missing", async () => {
      const mockResponse = {
        state: "success" as const,
        data: {
          documentID: "affiliate-123",
          response: null,
        },
      };

      // @ts-expect-error - we're not expecting null
      mockGetDefaultAffiliate.mockResolvedValue(mockResponse);

      const result = await getDefaultAffiliateSession();

      expect(result).toEqual({
        type: "error",
        error: {
          type: "generalError",
          message: "No affiliate data was returned",
        },
      });
    });

    it("should return network error when FetchError is thrown", async () => {
      const mockFetchError = new FetchError(
        500,
        "Internal Server Error",
        "https://api.example.com/affiliateSessions/default",
        { method: "GET" },
        new Response("Server Error", { status: 500 }),
      );

      mockGetDefaultAffiliate.mockRejectedValue(mockFetchError);

      const result = await getDefaultAffiliateSession();

      expect(result).toEqual({
        type: "error",
        error: {
          type: "networkError",
          message: "Server error: HTTP Error: 500 Internal Server Error",
          details: ["Status: 500"],
        },
      });
    });

    it("should return unknown error when unexpected error is thrown", async () => {
      const mockError = new Error("Unexpected error occurred");

      mockGetDefaultAffiliate.mockRejectedValue(mockError);

      const result = await getDefaultAffiliateSession();

      expect(result).toEqual({
        type: "error",
        error: {
          type: "unknownError",
          message: "An unexpected error occurred",
          details: ["Unexpected error occurred"],
        },
      });
    });
  });
});
