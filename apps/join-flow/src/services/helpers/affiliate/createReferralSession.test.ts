import { beforeEach, describe, expect, it, vi } from "vitest";

import { squidAPI } from "@/services/payloadClient";

import { createReferralSession } from "./createReferralSession";

vi.mock("@/services/payloadClient", () => ({
  squidAPI: {
    createReferralSessionSync: vi.fn(),
    getDefaultReferralAffiliate: vi.fn(),
  },
}));

const mockCreateReferralSessionSync = vi.mocked(
  squidAPI.createReferralSessionSync,
);
const mockGetDefaultReferralAffiliate = vi.mocked(
  squidAPI.getDefaultReferralAffiliate,
);

describe("createReferralSession", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("success scenario", () => {
    it("should return success when both API calls succeed", async () => {
      const mockReferralResponse = {
        state: "success" as const,
        data: {
          documentID: "ref-123",
          response: { referrerFirstName: "John" },
        },
      };

      const mockAffiliateResponse = {
        state: "success" as const,
        data: {
          documentID: "aff-456",
          response: {
            displayItems: {
              termsAndConditionsLink: "https://example.com/terms",
              privacyPolicyLink: "https://example.com/privacy",
            },
            sessionID: "session-123",
            affiliateName: "Test Affiliate",
            useCreditcheckResult: true,
            doEmailValidation: true,
            cuckooAffiliate: null,
          },
        },
      };

      mockCreateReferralSessionSync.mockResolvedValue(mockReferralResponse);
      mockGetDefaultReferralAffiliate.mockResolvedValue(mockAffiliateResponse);

      const result = await createReferralSession("TEST123");

      expect(result).toEqual({
        type: "success",
        id: "aff-456",
        affiliateSession: {
          id: "aff-456",
          displayItems: {
            termsAndConditionsLink: "https://example.com/terms",
            privacyPolicyLink: "https://example.com/privacy",
          },
          sessionId: "session-123",
          affiliateName: "Test Affiliate",
        },
      });

      expect(mockCreateReferralSessionSync).toHaveBeenCalledWith({
        code: "TEST123",
      });
      expect(mockGetDefaultReferralAffiliate).toHaveBeenCalled();
    });
  });

  describe("error scenarios", () => {
    it("should return error when only referral session creation fails", async () => {
      const mockReferralResponse = {
        state: "error" as const,
        data: {
          documentID: "ref-123",
          errors: [
            {
              blockType: "ReferralCodeNotFound" as const,
              errorMessage: "Invalid referral code",
            },
          ],
        },
      };

      const mockAffiliateResponse = {
        state: "success" as const,
        data: {
          documentID: "aff-456",
          response: {
            displayItems: {
              termsAndConditionsLink: "https://example.com/terms",
              privacyPolicyLink: "https://example.com/privacy",
            },
            sessionID: "session-123",
            affiliateName: "Test Affiliate",
            useCreditcheckResult: true,
            doEmailValidation: true,
            cuckooAffiliate: null,
          },
        },
      };

      mockCreateReferralSessionSync.mockResolvedValue(mockReferralResponse);
      mockGetDefaultReferralAffiliate.mockResolvedValue(mockAffiliateResponse);

      const result = await createReferralSession("INVALID");

      expect(result).toEqual({
        type: "error",
        error: {
          type: "generalError",
          message: "Referral session creation failed",
          details: ["Invalid referral code"],
        },
      });
    });

    it("should return error when only default affiliate fetch fails", async () => {
      const mockReferralResponse = {
        state: "success" as const,
        data: {
          documentID: "ref-123",
          response: { referrerFirstName: "John" },
        },
      };

      const mockAffiliateResponse = {
        state: "error" as const,
        data: {
          documentID: "aff-456",
          errors: [
            {
              blockType: "AffiliateSessionUnableToStartSession" as const,
              errorMessage: "Affiliate session unable to start",
            },
          ],
        },
      };

      mockCreateReferralSessionSync.mockResolvedValue(mockReferralResponse);
      mockGetDefaultReferralAffiliate.mockResolvedValue(mockAffiliateResponse);

      const result = await createReferralSession("TEST123");

      expect(result).toEqual({
        type: "error",
        error: {
          type: "generalError",
          message: "No affiliate data was returned",
          details: ["Affiliate session unable to start"],
        },
      });
    });

    it("should return error when both referral session creation and default affiliate fetch fail", async () => {
      const mockReferralResponse = {
        state: "error" as const,
        data: {
          documentID: "ref-123",
          errors: [
            {
              blockType: "ReferralCodeNotFound" as const,
              errorMessage: "Invalid referral code",
            },
          ],
        },
      };

      const mockAffiliateResponse = {
        state: "error" as const,
        data: {
          documentID: "aff-456",
          errors: [
            {
              blockType: "AffiliateSessionUnableToStartSession" as const,
              errorMessage: "Affiliate session unable to start",
            },
          ],
        },
      };

      mockCreateReferralSessionSync.mockResolvedValue(mockReferralResponse);
      mockGetDefaultReferralAffiliate.mockResolvedValue(mockAffiliateResponse);

      const result = await createReferralSession("INVALID");

      expect(result).toEqual({
        type: "error",
        error: {
          type: "generalError",
          message: "Referral session creation and default affiliate failed",
          details: [
            "Invalid referral code",
            "Affiliate session unable to start",
          ],
        },
      });
    });
  });

  describe("exception handling", () => {
    it("should return error when createReferralSessionSync throws an exception", async () => {
      mockCreateReferralSessionSync.mockRejectedValue(
        new Error("Network error"),
      );
      mockGetDefaultReferralAffiliate.mockResolvedValue({
        state: "success" as const,
        data: {
          documentID: "aff-456",
          response: {
            displayItems: {
              termsAndConditionsLink: "https://example.com/terms",
              privacyPolicyLink: "https://example.com/privacy",
            },
            sessionID: "session-123",
            affiliateName: "Test Affiliate",
            useCreditcheckResult: true,
            doEmailValidation: true,
            cuckooAffiliate: null,
          },
        },
      });

      const result = await createReferralSession("TEST123");

      expect(result).toEqual({
        type: "error",
        error: {
          type: "unknownError",
          message: "An unexpected error occurred",
        },
      });
    });

    it("should return error when getDefaultReferralAffiliate throws an exception", async () => {
      mockCreateReferralSessionSync.mockResolvedValue({
        state: "success" as const,
        data: {
          documentID: "ref-123",
          response: { referrerFirstName: "John" },
        },
      });
      mockGetDefaultReferralAffiliate.mockRejectedValue(
        new Error("API timeout"),
      );

      const result = await createReferralSession("TEST123");

      expect(result).toEqual({
        type: "error",
        error: {
          type: "unknownError",
          message: "An unexpected error occurred",
        },
      });
    });
  });
});
