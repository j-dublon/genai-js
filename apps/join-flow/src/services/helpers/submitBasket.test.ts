import {
  FetchError,
  squidAPI,
  ValidationError,
} from "@cuckoointernet/util-squid-network-requests";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { submitBasket } from "./submitBasket";

vi.mock("@cuckoointernet/util-squid-network-requests", async () => {
  const actual = await vi.importActual(
    "@cuckoointernet/util-squid-network-requests",
  );
  return {
    ...actual,
    squidAPI: {
      doSignup: vi.fn(),
    },
  };
});

describe("submitBasket", () => {
  const mockSquidAPI = vi.mocked(squidAPI);

  beforeEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
  });

  describe("success cases", () => {
    it("should successfully submit a basket with valid basketId", async () => {
      mockSquidAPI.doSignup.mockResolvedValue({
        success: true,
        firstName: "John",
        accountNumber: "1234567890",
      });

      const result = await submitBasket("basket-123");

      expect(mockSquidAPI.doSignup).toHaveBeenCalledWith("basket-123");
      expect(result).toEqual({
        type: "success",
      });
    });
  });

  describe("validation error cases", () => {
    it("should return a validation error when basketId is an empty string", async () => {
      const result = await submitBasket("");

      expect(mockSquidAPI.doSignup).not.toHaveBeenCalled();
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

      expect(mockSquidAPI.doSignup).not.toHaveBeenCalled();
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

      expect(mockSquidAPI.doSignup).not.toHaveBeenCalled();
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
      mockSquidAPI.doSignup.mockRejectedValue(validationError);

      const result = await submitBasket("basket-123");

      expect(mockSquidAPI.doSignup).toHaveBeenCalledWith("basket-123");
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
      mockSquidAPI.doSignup.mockRejectedValue(fetchError);

      const result = await submitBasket("basket-123");

      expect(mockSquidAPI.doSignup).toHaveBeenCalledWith("basket-123");
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
      mockSquidAPI.doSignup.mockRejectedValue(genericError);

      const result = await submitBasket("basket-123");

      expect(mockSquidAPI.doSignup).toHaveBeenCalledWith("basket-123");
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
      mockSquidAPI.doSignup.mockRejectedValue(nonErrorObject);

      const result = await submitBasket("basket-123");

      expect(mockSquidAPI.doSignup).toHaveBeenCalledWith("basket-123");
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
      mockSquidAPI.doSignup.mockRejectedValue(null);

      const result = await submitBasket("basket-123");

      expect(mockSquidAPI.doSignup).toHaveBeenCalledWith("basket-123");
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
