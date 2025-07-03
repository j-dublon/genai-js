import type { StoreBasket } from "@store/useJoinFlowStore";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { payloadAPI } from "@/services/payloadClient";
import { FetchError, ValidationError } from "@/services/payloadTypes";

import { submitBasket } from "./submitBasket";

vi.mock("@/services/payloadClient", () => ({
  payloadAPI: {
    signUpToKraken: vi.fn(),
  },
}));

describe("submitBasket", () => {
  const mockPayloadAPI = vi.mocked(payloadAPI);

  beforeEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
  });

  describe("success cases", () => {
    it("should successfully submit a basket with valid basketId", async () => {
      const mockBasket: StoreBasket = {
        id: "basket-123",
        locked: false,
        optIns: {
          termsAgreed: true,
          directDebitAgreed: true,
          creditSearchAgreed: true,
          isAccountHolder: true,
          hasSmartPhone: true,
          marketingConsent: false,
        },
        product: {
          quoteLookup: {
            value: "quote-123",
            relationTo: "newSaleQuoteLookups",
          },
          selectionIdentifier: "selection-123",
          extras: [],
        },
        engineer: {
          selectionIdentifier: "engineer-123",
        },
        goLiveDate: "2024-01-01",
        addressHistory: [
          {
            line1: "123 Test Street",
            line2: "Test Area",
            line3: "Test City",
            postcode: "TE1 1ST",
            id: "address-123",
          },
        ],
        billingAddress: {
          line1: "123 Test Street",
          line2: "Test Area",
          line3: "Test City",
          postcode: "TE1 1ST",
        },
        payment: {
          bankAccountHolder: "John Doe",
          bankAccountNumber: "12345678",
          bankSortCode: "12-34-56",
        },
        personalDetails: {
          firstName: "John",
          lastName: "Doe",
          dateOfBirth: "1990-01-01",
          email: "john.doe@example.com",
          phone: "07123456789",
        },
        switchMatchLookup: "switch-123",
        sales: {
          discretionaryBillCreditsAmount: 1000,
        },
        cics: {
          summaryHref: "https://example.com/summary",
          informationHref: "https://example.com/info",
        },
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      mockPayloadAPI.signUpToKraken.mockResolvedValue(mockBasket);

      const result = await submitBasket("basket-123");

      expect(mockPayloadAPI.signUpToKraken).toHaveBeenCalledWith("basket-123");
      expect(result).toEqual({
        type: "success",
        basket: mockBasket,
      });
    });
  });

  describe("validation error cases", () => {
    it("should return a validation error when basketId is an empty string", async () => {
      const result = await submitBasket("");

      expect(mockPayloadAPI.signUpToKraken).not.toHaveBeenCalled();
      expect(result).toEqual({
        type: "error",
        error: {
          type: "validationError",
          message: "Basket ID is required",
          details: ["ID parameter cannot be empty"],
        },
      });
    });

    it("should return a validation error when basketId is undefined", async () => {
      // @ts-expect-error - we want to test the case where basketId is undefined
      const result = await submitBasket(undefined);

      expect(mockPayloadAPI.signUpToKraken).not.toHaveBeenCalled();
      expect(result).toEqual({
        type: "error",
        error: {
          type: "validationError",
          message: "Basket ID is required",
          details: ["ID parameter cannot be empty"],
        },
      });
    });

    it("should return a validation error when basketId is null", async () => {
      // @ts-expect-error - we want to test the case where basketId is null
      const result = await submitBasket(null);

      expect(mockPayloadAPI.signUpToKraken).not.toHaveBeenCalled();
      expect(result).toEqual({
        type: "error",
        error: {
          type: "validationError",
          message: "Basket ID is required",
          details: ["ID parameter cannot be empty"],
        },
      });
    });

    it("should handle a ValidationError from the API", async () => {
      const validationDetails = [
        { path: "email", message: "Email is required" },
        { message: "General validation error" },
      ];
      const validationError = new ValidationError(validationDetails);
      mockPayloadAPI.signUpToKraken.mockRejectedValue(validationError);

      const result = await submitBasket("basket-123");

      expect(mockPayloadAPI.signUpToKraken).toHaveBeenCalledWith("basket-123");
      expect(result).toEqual({
        type: "error",
        error: {
          type: "validationError",
          message: "The basket submission is invalid",
          details: [
            "email is invalid: Email is required",
            "General validation error",
          ],
        },
      });
    });
  });

  describe("network error cases", () => {
    it("should handle a FetchError from the API", async () => {
      const fetchError = new FetchError(
        500,
        "Server error",
        "https://api.example.com",
        {},
        new Response(null, {
          status: 500,
          statusText: "Internal Server Error",
        }),
      );
      mockPayloadAPI.signUpToKraken.mockRejectedValue(fetchError);

      const result = await submitBasket("basket-123");

      expect(mockPayloadAPI.signUpToKraken).toHaveBeenCalledWith("basket-123");
      expect(result).toEqual({
        type: "error",
        error: {
          type: "networkError",
          message: "Server error: HTTP Error: 500 Server error",
          details: ["Status: 500"],
        },
      });
    });
  });

  describe("unknown error cases", () => {
    it("should handle a generic Error", async () => {
      const genericError = new Error("Something went wrong");
      mockPayloadAPI.signUpToKraken.mockRejectedValue(genericError);

      const result = await submitBasket("basket-123");

      expect(mockPayloadAPI.signUpToKraken).toHaveBeenCalledWith("basket-123");
      expect(result).toEqual({
        type: "error",
        error: {
          type: "unknownError",
          message: "An unexpected error occurred",
          details: ["Something went wrong"],
        },
      });
    });

    it("should handle non-Error objects", async () => {
      const nonErrorObject = "This is not an error object";
      mockPayloadAPI.signUpToKraken.mockRejectedValue(nonErrorObject);

      const result = await submitBasket("basket-123");

      expect(mockPayloadAPI.signUpToKraken).toHaveBeenCalledWith("basket-123");
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
      mockPayloadAPI.signUpToKraken.mockRejectedValue(null);

      const result = await submitBasket("basket-123");

      expect(mockPayloadAPI.signUpToKraken).toHaveBeenCalledWith("basket-123");
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
});
