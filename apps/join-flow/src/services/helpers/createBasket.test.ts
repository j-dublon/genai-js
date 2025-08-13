import {
  type Basket,
  FetchError,
  squidAPI,
  ValidationError,
  type ValidationErrorDetail,
} from "@cuckoointernet/util-squid-network-requests";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createBasket } from "./createBasket";

vi.mock("@cuckoointernet/util-squid-network-requests", async () => {
  const actual = await vi.importActual(
    "@cuckoointernet/util-squid-network-requests",
  );
  return {
    ...actual,
    squidAPI: {
      createBasket: vi.fn(),
    },
  };
});

describe("createBasket", () => {
  const mockBasketData: Partial<Basket> = {
    product: {
      selectionIdentifier: "test-selection-id",
      quoteLookup: {
        value: "test-quote-lookup-id",
        relationTo: "newSaleQuoteLookups",
      },
    },
  };

  const mockBasketResponse: Basket = {
    id: "basket-123",
    product: {
      quoteLookup: {
        value: "test-quote-lookup-id",
        relationTo: "newSaleQuoteLookups",
      },
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
      vi.mocked(squidAPI.createBasket).mockResolvedValue(mockBasketResponse);

      const result = await createBasket(mockBasketData);

      expect(result).toEqual({
        type: "success",
        basket: mockBasketResponse,
      });
      expect(squidAPI.createBasket).toHaveBeenCalledWith(mockBasketData);
      expect(squidAPI.createBasket).toHaveBeenCalledTimes(1);
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
      vi.mocked(squidAPI.createBasket).mockResolvedValue(complexBasketResponse);

      const result = await createBasket(mockBasketData);

      expect(result).toEqual({
        type: "success",
        basket: complexBasketResponse,
      });
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
      vi.mocked(squidAPI.createBasket).mockRejectedValue(validationError);

      const result = await createBasket(mockBasketData);

      expect(result).toEqual({
        type: "error",
        error: {
          type: "validationError",
          message: "Payload Validation Error",
          details: [
            "product.selectionIdentifier is invalid: Selection identifier is required",
          ],
        },
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
          path: "product.quoteLookup.value",
        },
      ];
      const validationError = new ValidationError(validationDetails);
      vi.mocked(squidAPI.createBasket).mockRejectedValue(validationError);

      const result = await createBasket(mockBasketData);

      expect(result).toEqual({
        type: "error",
        error: {
          type: "validationError",
          message: "Payload Validation Error",
          details: [
            "product.selectionIdentifier is invalid: Selection identifier is required",
            "product.quoteLookup.value is invalid: Quote lookup ID is invalid",
          ],
        },
      });
    });

    it("should handle ValidationError without path", async () => {
      const validationDetails: ValidationErrorDetail[] = [
        {
          message: "General validation error",
        },
      ];
      const validationError = new ValidationError(validationDetails);
      vi.mocked(squidAPI.createBasket).mockRejectedValue(validationError);

      const result = await createBasket(mockBasketData);

      expect(result).toEqual({
        type: "error",
        error: {
          type: "validationError",
          message: "Payload Validation Error",
          details: ["General validation error"],
        },
      });
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
        {},
        mockResponse,
      );
      vi.mocked(squidAPI.createBasket).mockRejectedValue(fetchError);

      const result = await createBasket(mockBasketData);

      expect(result).toEqual({
        type: "error",
        error: {
          type: "networkError",
          message: "HTTP Error: 400 Bad Request",
          details: ["Status: 400"],
        },
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
        {},
        mockResponse,
      );
      vi.mocked(squidAPI.createBasket).mockRejectedValue(fetchError);

      const result = await createBasket(mockBasketData);

      expect(result).toEqual({
        type: "error",
        error: {
          type: "networkError",
          message: "HTTP Error: 500 Internal Server Error",
          details: ["Status: 500"],
        },
      });
    });
  });

  describe("Unknown errors", () => {
    it("should handle generic Error instances", async () => {
      const genericError = new Error("Something went wrong");
      vi.mocked(squidAPI.createBasket).mockRejectedValue(genericError);

      const result = await createBasket(mockBasketData);

      expect(result).toEqual({
        type: "error",
        error: {
          type: "unknownError",
          message: "Something went wrong",
          details: ["Something went wrong"],
        },
      });
    });

    it("should handle non-Error thrown values", async () => {
      vi.mocked(squidAPI.createBasket).mockRejectedValue("String error");

      const result = await createBasket(mockBasketData);

      expect(result).toEqual({
        type: "error",
        error: {
          type: "unknownError",
          message: "An unexpected error occurred",
          details: ["Unknown error"],
        },
      });
    });

    it("should handle null/undefined errors", async () => {
      vi.mocked(squidAPI.createBasket).mockRejectedValue(null);

      const result = await createBasket(mockBasketData);

      expect(result).toEqual({
        type: "error",
        error: {
          type: "unknownError",
          message: "An unexpected error occurred",
          details: ["Unknown error"],
        },
      });
    });
  });

  describe("Edge cases", () => {
    it("should handle empty basket data", async () => {
      const emptyBasketData = {};
      vi.mocked(squidAPI.createBasket).mockResolvedValue(mockBasketResponse);

      const result = await createBasket(emptyBasketData);

      expect(result).toEqual({
        type: "success",
        basket: mockBasketResponse,
      });
      expect(squidAPI.createBasket).toHaveBeenCalledWith(emptyBasketData);
    });
  });
});
