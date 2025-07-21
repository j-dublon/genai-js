import {
  FetchError,
  squidAPI,
  ValidationError,
} from "@cuckoointernet/util-squid-network-requests";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { registerInterest } from "./registerInterest";

vi.mock("@cuckoointernet/util-squid-network-requests", async () => {
  const actual = await vi.importActual(
    "@cuckoointernet/util-squid-network-requests",
  );
  return {
    ...actual,
    squidAPI: {
      createRegisterOfInterestSubmissionSync: vi.fn(),
    },
  };
});

const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

describe("registerInterest", () => {
  const mockEmail = "test@test.com";
  const mockFullName = "Test User";
  const mockAddress = [{ postcode: "SW1A 1AA" }];
  const mockAffiliateCode = "Cuckoo";
  const mockOriginJourney = "test-origin";
  const mockEndOfContractDate = "2025-01-01";

  const mockSuccessResponse = {
    state: "success" as const,
    data: {
      documentID: "roi-123",
      response: {
        status: "success",
      },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    consoleSpy.mockClear();
  });

  describe("successful requests", () => {
    it("should return register of interest ID on successful API call with all parameters", async () => {
      vi.mocked(
        squidAPI.createRegisterOfInterestSubmissionSync,
      ).mockResolvedValue(mockSuccessResponse);

      const result = await registerInterest({
        email: mockEmail,
        fullName: mockFullName,
        address: mockAddress,
        affiliateCode: mockAffiliateCode,
        originJourney: mockOriginJourney,
        endOfContractDate: mockEndOfContractDate,
      });

      expect(result).toEqual({
        roi: mockSuccessResponse.data.documentID,
      });
      expect(result.error).toBeUndefined();
      expect(
        squidAPI.createRegisterOfInterestSubmissionSync,
      ).toHaveBeenCalledWith({
        email: mockEmail,
        fullName: mockFullName,
        address: mockAddress,
        affiliateCode: mockAffiliateCode,
        endOfContractDate: mockEndOfContractDate,
        originJourney: mockOriginJourney,
      });
      expect(
        squidAPI.createRegisterOfInterestSubmissionSync,
      ).toHaveBeenCalledTimes(1);
    });

    it("should return register of interest ID on successful API call without optional parameters", async () => {
      vi.mocked(
        squidAPI.createRegisterOfInterestSubmissionSync,
      ).mockResolvedValue(mockSuccessResponse);

      const result = await registerInterest({
        email: mockEmail,
        fullName: mockFullName,
        address: mockAddress,
      });

      expect(result).toEqual({
        roi: mockSuccessResponse.data.documentID,
      });
      expect(
        squidAPI.createRegisterOfInterestSubmissionSync,
      ).toHaveBeenCalledWith({
        email: mockEmail,
        fullName: mockFullName,
        address: mockAddress,
      });
    });
  });

  describe("API errors", () => {
    it("should handle general error when API state is not success", async () => {
      const mockErrorResponse = {
        state: "error" as const,
        data: {
          documentID: "roi-error-123",
          errors: [
            {
              blockType: "UnknownError" as const,
              errorMessage: "Something went wrong",
              id: "error-1",
              blockName: "ErrorBlock",
              internalError: "Internal error details",
            },
          ],
        },
      };

      vi.mocked(
        squidAPI.createRegisterOfInterestSubmissionSync,
      ).mockResolvedValue(mockErrorResponse);

      const result = await registerInterest({
        email: mockEmail,
        fullName: mockFullName,
        address: mockAddress,
      });

      expect(result).toEqual({
        error: {
          type: "generalError",
          message: "Register of interest submission failed",
        },
      });
      expect(result.roi).toBeUndefined();
    });
  });

  describe("validation errors", () => {
    it("should handle validation errors", async () => {
      const validationError = new ValidationError([
        { message: "Invalid email format", path: "email" },
        { message: "Missing required field", path: "fullName" },
      ]);

      vi.mocked(
        squidAPI.createRegisterOfInterestSubmissionSync,
      ).mockRejectedValue(validationError);

      const result = await registerInterest({
        email: mockEmail,
        fullName: mockFullName,
        address: mockAddress,
      });

      expect(result).toEqual({
        error: {
          type: "validationError",
          message: "The register of interest data is invalid",
          details: [
            "email is invalid: Invalid email format",
            "fullName is invalid: Missing required field",
          ],
        },
      });
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error in registerInterest:",
        validationError,
      );
    });

    it("should handle validation errors without path", async () => {
      const validationError = new ValidationError([
        { message: "General validation error" },
      ]);

      vi.mocked(
        squidAPI.createRegisterOfInterestSubmissionSync,
      ).mockRejectedValue(validationError);

      const result = await registerInterest({
        email: mockEmail,
        fullName: mockFullName,
        address: mockAddress,
      });

      expect(result).toEqual({
        error: {
          type: "validationError",
          message: "The register of interest data is invalid",
          details: ["General validation error"],
        },
      });
    });
  });

  describe("network errors", () => {
    it("should handle fetch errors", async () => {
      const fetchError = new FetchError(
        500,
        "Internal Server Error",
        "/registerOfInterestSubmissions",
        {},
        { status: 500 } as Response,
      );

      vi.mocked(
        squidAPI.createRegisterOfInterestSubmissionSync,
      ).mockRejectedValue(fetchError);

      const result = await registerInterest({
        email: mockEmail,
        fullName: mockFullName,
        address: mockAddress,
        affiliateCode: mockAffiliateCode,
        endOfContractDate: mockEndOfContractDate,
        originJourney: mockOriginJourney,
      });

      expect(result).toEqual({
        error: {
          type: "networkError",
          message: "Server error: HTTP Error: 500 Internal Server Error",
          details: ["Status: 500"],
        },
      });
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error in registerInterest:",
        fetchError,
      );
    });

    it("should handle fetch errors without response status", async () => {
      const fetchError = new FetchError(
        404,
        "Not Found",
        "/registerOfInterestSubmissions",
        {},
        {} as Response,
      );

      vi.mocked(
        squidAPI.createRegisterOfInterestSubmissionSync,
      ).mockRejectedValue(fetchError);

      const result = await registerInterest({
        email: mockEmail,
        fullName: mockFullName,
        address: mockAddress,
        affiliateCode: mockAffiliateCode,
        endOfContractDate: mockEndOfContractDate,
        originJourney: mockOriginJourney,
      });

      expect(result).toEqual({
        error: {
          type: "networkError",
          message: "Server error: HTTP Error: 404 Not Found",
          details: ["Status: undefined"],
        },
      });
    });
  });

  describe("unknown errors", () => {
    it("should handle unexpected errors", async () => {
      const unexpectedError = new Error("Unexpected error occurred");

      vi.mocked(
        squidAPI.createRegisterOfInterestSubmissionSync,
      ).mockRejectedValue(unexpectedError);

      const result = await registerInterest({
        email: mockEmail,
        fullName: mockFullName,
        address: mockAddress,
        affiliateCode: mockAffiliateCode,
        endOfContractDate: mockEndOfContractDate,
        originJourney: mockOriginJourney,
      });

      expect(result).toEqual({
        error: {
          type: "unknownError",
          message: "An unexpected error occurred",
          details: ["Unexpected error occurred"],
        },
      });
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error in registerInterest:",
        unexpectedError,
      );
    });

    it("should handle non-Error thrown values", async () => {
      const nonError = "String error";

      vi.mocked(
        squidAPI.createRegisterOfInterestSubmissionSync,
      ).mockRejectedValue(nonError);

      const result = await registerInterest({
        email: mockEmail,
        fullName: mockFullName,
        address: mockAddress,
        affiliateCode: mockAffiliateCode,
        endOfContractDate: mockEndOfContractDate,
        originJourney: mockOriginJourney,
      });

      expect(result).toEqual({
        error: {
          type: "unknownError",
          message: "An unexpected error occurred",
          details: ["Unknown error"],
        },
      });
    });
  });

  describe("function call verification", () => {
    it("should call squidAPI.createRegisterOfInterestSubmissionSync with correct parameters", async () => {
      vi.mocked(
        squidAPI.createRegisterOfInterestSubmissionSync,
      ).mockResolvedValue(mockSuccessResponse);

      await registerInterest({
        email: mockEmail,
        fullName: mockFullName,
        address: mockAddress,
        affiliateCode: mockAffiliateCode,
        endOfContractDate: mockEndOfContractDate,
        originJourney: mockOriginJourney,
      });

      expect(
        squidAPI.createRegisterOfInterestSubmissionSync,
      ).toHaveBeenCalledWith({
        email: mockEmail,
        fullName: mockFullName,
        address: mockAddress,
        affiliateCode: mockAffiliateCode,
        endOfContractDate: mockEndOfContractDate,
        originJourney: mockOriginJourney,
      });
      expect(
        squidAPI.createRegisterOfInterestSubmissionSync,
      ).toHaveBeenCalledTimes(1);
    });

    it("should log errors to console", async () => {
      const error = new Error("Test error");
      vi.mocked(
        squidAPI.createRegisterOfInterestSubmissionSync,
      ).mockRejectedValue(error);

      await registerInterest({
        email: mockEmail,
        fullName: mockFullName,
        address: mockAddress,
        affiliateCode: mockAffiliateCode,
        endOfContractDate: mockEndOfContractDate,
        originJourney: mockOriginJourney,
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        "Error in registerInterest:",
        error,
      );
    });
  });
});
