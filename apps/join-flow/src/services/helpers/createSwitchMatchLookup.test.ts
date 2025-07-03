import { beforeEach, describe, expect, it, vi } from "vitest";

import { squidAPI } from "@/services/payloadClient";
import { FetchError, ValidationError } from "@/services/payloadTypes";

import { createSwitchMatchLookup } from "./createSwitchMatchLookup";

vi.mock("@/services/payloadClient", () => ({
  squidAPI: {
    createSwitchMatchLookupSync: vi.fn(),
  },
}));

const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

describe("createSwitchMatchLookup", () => {
  const mockBasketId = "basket-123";
  const mockLosingRcpid = "rcpid-456";
  const mockLosingProviderAccountID = "provider-789";

  const mockSuccessResponse = {
    state: "success" as const,
    data: {
      documentID: "switch-match-lookup-123",
      response: {
        switchOrderReference: "switch-order-ref-123",
      },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    consoleSpy.mockClear();
  });

  describe("successful requests", () => {
    it("should return switch match lookup ID on successful API call with all parameters", async () => {
      vi.mocked(squidAPI.createSwitchMatchLookupSync).mockResolvedValue(
        mockSuccessResponse,
      );

      const result = await createSwitchMatchLookup(
        mockBasketId,
        mockLosingRcpid,
        mockLosingProviderAccountID,
      );

      expect(result).toEqual({
        switchMatchLookup: mockSuccessResponse.data.documentID,
      });
      expect(result.error).toBeUndefined();
      expect(squidAPI.createSwitchMatchLookupSync).toHaveBeenCalledWith({
        basket: mockBasketId,
        losingRcpid: mockLosingRcpid,
        losingProviderAccountID: mockLosingProviderAccountID,
      });
      expect(squidAPI.createSwitchMatchLookupSync).toHaveBeenCalledTimes(1);
    });

    it("should return switch match lookup ID on successful API call without optional parameter", async () => {
      vi.mocked(squidAPI.createSwitchMatchLookupSync).mockResolvedValue(
        mockSuccessResponse,
      );

      const result = await createSwitchMatchLookup(
        mockBasketId,
        mockLosingRcpid,
      );

      expect(result).toEqual({
        switchMatchLookup: mockSuccessResponse.data.documentID,
      });
      expect(squidAPI.createSwitchMatchLookupSync).toHaveBeenCalledWith({
        basket: mockBasketId,
        losingRcpid: mockLosingRcpid,
        losingProviderAccountID: undefined,
      });
    });
  });

  describe("API errors", () => {
    it("should handle general error when API state is not success", async () => {
      const mockErrorResponse = {
        state: "error" as const,
        data: {
          documentID: "switch-match-lookup-error-123",
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

      vi.mocked(squidAPI.createSwitchMatchLookupSync).mockResolvedValue(
        mockErrorResponse,
      );

      const result = await createSwitchMatchLookup(
        mockBasketId,
        mockLosingRcpid,
      );

      expect(result).toEqual({
        error: {
          type: "generalError",
          message: "Switch match lookup failed",
        },
      });
      expect(result.switchMatchLookup).toBeUndefined();
    });
  });

  describe("validation errors", () => {
    it("should handle validation errors", async () => {
      const validationError = new ValidationError([
        { message: "Invalid basket format", path: "basket" },
        { message: "Missing required field", path: "losingRcpid" },
      ]);

      vi.mocked(squidAPI.createSwitchMatchLookupSync).mockRejectedValue(
        validationError,
      );

      const result = await createSwitchMatchLookup(
        mockBasketId,
        mockLosingRcpid,
      );

      expect(result).toEqual({
        error: {
          type: "validationError",
          message: "The basket data is invalid",
          details: [
            "basket is invalid: Invalid basket format",
            "losingRcpid is invalid: Missing required field",
          ],
        },
      });
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error in createSwitchMatchLookup:",
        validationError,
      );
    });

    it("should handle validation errors without path", async () => {
      const validationError = new ValidationError([
        { message: "General validation error" },
      ]);

      vi.mocked(squidAPI.createSwitchMatchLookupSync).mockRejectedValue(
        validationError,
      );

      const result = await createSwitchMatchLookup(
        mockBasketId,
        mockLosingRcpid,
      );

      expect(result).toEqual({
        error: {
          type: "validationError",
          message: "The basket data is invalid",
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
        "/switchMatchLookup",
        {},
        { status: 500 } as Response,
      );

      vi.mocked(squidAPI.createSwitchMatchLookupSync).mockRejectedValue(
        fetchError,
      );

      const result = await createSwitchMatchLookup(
        mockBasketId,
        mockLosingRcpid,
      );

      expect(result).toEqual({
        error: {
          type: "networkError",
          message: "Server error: HTTP Error: 500 Internal Server Error",
          details: ["Status: 500"],
        },
      });
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error in createSwitchMatchLookup:",
        fetchError,
      );
    });

    it("should handle fetch errors without response status", async () => {
      const fetchError = new FetchError(
        404,
        "Not Found",
        "/switchMatchLookup",
        {},
        {} as Response,
      );

      vi.mocked(squidAPI.createSwitchMatchLookupSync).mockRejectedValue(
        fetchError,
      );

      const result = await createSwitchMatchLookup(
        mockBasketId,
        mockLosingRcpid,
      );

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

      vi.mocked(squidAPI.createSwitchMatchLookupSync).mockRejectedValue(
        unexpectedError,
      );

      const result = await createSwitchMatchLookup(
        mockBasketId,
        mockLosingRcpid,
      );

      expect(result).toEqual({
        error: {
          type: "unknownError",
          message: "An unexpected error occurred",
          details: ["Unexpected error occurred"],
        },
      });
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error in createSwitchMatchLookup:",
        unexpectedError,
      );
    });

    it("should handle non-Error thrown values", async () => {
      const nonError = "String error";

      vi.mocked(squidAPI.createSwitchMatchLookupSync).mockRejectedValue(
        nonError,
      );

      const result = await createSwitchMatchLookup(
        mockBasketId,
        mockLosingRcpid,
      );

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
    it("should call squidAPI.createSwitchMatchLookupSync with correct parameters", async () => {
      vi.mocked(squidAPI.createSwitchMatchLookupSync).mockResolvedValue(
        mockSuccessResponse,
      );

      await createSwitchMatchLookup(
        mockBasketId,
        mockLosingRcpid,
        mockLosingProviderAccountID,
      );

      expect(squidAPI.createSwitchMatchLookupSync).toHaveBeenCalledWith({
        basket: mockBasketId,
        losingRcpid: mockLosingRcpid,
        losingProviderAccountID: mockLosingProviderAccountID,
      });
      expect(squidAPI.createSwitchMatchLookupSync).toHaveBeenCalledTimes(1);
    });

    it("should log errors to console", async () => {
      const error = new Error("Test error");
      vi.mocked(squidAPI.createSwitchMatchLookupSync).mockRejectedValue(error);

      await createSwitchMatchLookup(mockBasketId, mockLosingRcpid);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Error in createSwitchMatchLookup:",
        error,
      );
    });
  });
});
