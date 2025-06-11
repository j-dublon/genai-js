import { beforeEach, describe, expect, it, vi } from "vitest";

import { payloadAPI } from "@/services/payloadClient";
import {
  FetchError,
  ValidationError,
  ValidationErrorDetail,
} from "@/services/payloadTypes";

import { Basket } from "../../../payload-types";
import { createBasket } from "./createBasket";

vi.mock("@/services/payloadClient", () => ({
  payloadAPI: {
    createBasket: vi.fn(),
  },
}));

describe("createBasket", () => {
  const mockBasketData = {
    product: {
      selectionIdentifier: "test-selection-id",
      quoteLookup: "test-quote-lookup-id",
    },
  };

  const mockBasketResponse: Basket = {
    id: "basket-123",
    product: {
      quoteLookup: "test-quote-lookup-id",
      selectionIdentifier: "test-selection-id",
      extras: null,
    },
    updatedAt: "2025-01-01T00:00:00.000Z",
    createdAt: "2025-01-01T00:00:00.000Z",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Successful basket creation", () => {
    it("should return basket data when API call is successful", async () => {
      vi.mocked(payloadAPI.createBasket).mockResolvedValue(mockBasketResponse);

      const result = await createBasket(mockBasketData);

      expect(result).toEqual({
        basket: mockBasketResponse,
      });
      expect(payloadAPI.createBasket).toHaveBeenCalledWith(mockBasketData);
      expect(payloadAPI.createBasket).toHaveBeenCalledTimes(1);
    });

    it("should handle basket with all optional fields populated", async () => {
      const complexBasketResponse: Basket = {
        ...mockBasketResponse,
        engineer: {
          engineerAppointment: "engineer-123",
          selectionIdentifier: "engineer-slot-1",
        },
        personalDetails: {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          phone: "1234567890",
          dateOfBirth: "1990-01-01",
        },
        billingAddress: {
          line1: "123 Test St",
          line2: "Apt 4",
          line3: "Test Area",
          postcode: "TE5T 1NG",
        },
      };
      vi.mocked(payloadAPI.createBasket).mockResolvedValue(
        complexBasketResponse,
      );

      const result = await createBasket(mockBasketData);

      expect(result.basket).toEqual(complexBasketResponse);
      expect(result.error).toBeUndefined();
    });
  });

  describe("Validation errors", () => {
    it("should handle ValidationError with single detail", async () => {
      const validationDetails: ValidationErrorDetail[] = [
        {
          label: "Product Selection",
          message: "Selection identifier is required",
          path: "product.selectionIdentifier",
        },
      ];
      const validationError = new ValidationError(validationDetails);
      vi.mocked(payloadAPI.createBasket).mockRejectedValue(validationError);

      const result = await createBasket(mockBasketData);

      expect(result.basket).toBeUndefined();
      expect(result.error).toEqual({
        type: "validationError",
        message: "The basket data is invalid",
        details: [
          "product.selectionIdentifier is invalid: Selection identifier is required",
        ],
      });
    });

    it("should handle ValidationError with multiple details", async () => {
      const validationDetails: ValidationErrorDetail[] = [
        {
          label: "Product Selection",
          message: "Selection identifier is required",
          path: "product.selectionIdentifier",
        },
        {
          label: "Quote Lookup",
          message: "Quote lookup ID is invalid",
          path: "product.quoteLookup",
        },
      ];
      const validationError = new ValidationError(validationDetails);
      vi.mocked(payloadAPI.createBasket).mockRejectedValue(validationError);

      const result = await createBasket(mockBasketData);

      expect(result.error?.details).toHaveLength(2);
      expect(result.error?.details).toContain(
        "product.selectionIdentifier is invalid: Selection identifier is required",
      );
      expect(result.error?.details).toContain(
        "product.quoteLookup is invalid: Quote lookup ID is invalid",
      );
    });

    it("should handle ValidationError without path", async () => {
      const validationDetails: ValidationErrorDetail[] = [
        {
          message: "General validation error",
        },
      ];
      const validationError = new ValidationError(validationDetails);
      vi.mocked(payloadAPI.createBasket).mockRejectedValue(validationError);

      const result = await createBasket(mockBasketData);

      expect(result.error?.details).toEqual(["General validation error"]);
    });
  });

  describe("Network errors", () => {
    it("should handle FetchError with response status", async () => {
      const mockResponse = {
        status: 400,
        statusText: "Bad Request",
        ok: false,
      } as Response;

      const fetchError = new FetchError(
        400,
        "Bad Request",
        "/api/baskets",
        { error: "Invalid data" },
        mockResponse,
      );
      vi.mocked(payloadAPI.createBasket).mockRejectedValue(fetchError);

      const result = await createBasket(mockBasketData);

      expect(result.basket).toBeUndefined();
      expect(result.error).toEqual({
        type: "networkError",
        message: "Server error: HTTP Error: 400 Bad Request",
        details: ["Status: 400"],
      });
    });

    it("should handle FetchError with 500 status", async () => {
      const mockResponse = {
        status: 500,
        statusText: "Internal Server Error",
        ok: false,
      } as Response;

      const fetchError = new FetchError(
        500,
        "Internal Server Error",
        "/api/baskets",
        { error: "Server error" },
        mockResponse,
      );
      vi.mocked(payloadAPI.createBasket).mockRejectedValue(fetchError);

      const result = await createBasket(mockBasketData);

      expect(result.error?.type).toBe("networkError");
      expect(result.error?.details).toContain("Status: 500");
    });
  });

  describe("Unknown errors", () => {
    it("should handle generic Error instances", async () => {
      const genericError = new Error("Something went wrong");
      vi.mocked(payloadAPI.createBasket).mockRejectedValue(genericError);

      const result = await createBasket(mockBasketData);

      expect(result.basket).toBeUndefined();
      expect(result.error).toEqual({
        type: "unknownError",
        message: "An unexpected error occurred",
        details: ["Something went wrong"],
      });
    });

    it("should handle non-Error thrown values", async () => {
      vi.mocked(payloadAPI.createBasket).mockRejectedValue("String error");

      const result = await createBasket(mockBasketData);

      expect(result.error).toEqual({
        type: "unknownError",
        message: "An unexpected error occurred",
        details: ["Unknown error"],
      });
    });

    it("should handle null/undefined errors", async () => {
      vi.mocked(payloadAPI.createBasket).mockRejectedValue(null);

      const result = await createBasket(mockBasketData);

      expect(result.error?.details).toEqual(["Unknown error"]);
    });
  });

  describe("Edge cases", () => {
    it("should handle empty basket data", async () => {
      const emptyBasketData = {};
      vi.mocked(payloadAPI.createBasket).mockResolvedValue(mockBasketResponse);

      const result = await createBasket(emptyBasketData);

      expect(result.basket).toEqual(mockBasketResponse);
      expect(payloadAPI.createBasket).toHaveBeenCalledWith(emptyBasketData);
    });

    it("should log errors to console", async () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const testError = new Error("Test error");
      vi.mocked(payloadAPI.createBasket).mockRejectedValue(testError);

      await createBasket(mockBasketData);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Error in createBasket:",
        testError,
      );

      consoleSpy.mockRestore();
    });
  });

  describe("Type safety", () => {
    it("should return correct TypeScript types for success case", async () => {
      vi.mocked(payloadAPI.createBasket).mockResolvedValue(mockBasketResponse);

      const result = await createBasket(mockBasketData);

      if (result.basket) {
        expect(typeof result.basket.id).toBe("string");
        expect(typeof result.basket.updatedAt).toBe("string");
        expect(typeof result.basket.createdAt).toBe("string");
      }
    });

    it("should return correct TypeScript types for error case", async () => {
      const error = new ValidationError([{ message: "test error" }]);
      vi.mocked(payloadAPI.createBasket).mockRejectedValue(error);

      const result = await createBasket(mockBasketData);

      if (result.error) {
        expect([
          "generalError",
          "validationError",
          "networkError",
          "unknownError",
        ]).toContain(result.error.type);
        expect(typeof result.error.message).toBe("string");
        expect(Array.isArray(result.error.details)).toBe(true);
      }
    });
  });
});
