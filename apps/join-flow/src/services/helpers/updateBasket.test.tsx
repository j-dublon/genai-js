import { beforeEach,describe, expect, it, vi } from "vitest";

import { payloadAPI } from "@/services/payloadClient";

import { updateBasket } from "./updateBasket";

vi.mock("@/services/payloadClient", () => ({
  payloadAPI: {
    updateBasket: vi.fn(),
  },
}));

const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

interface Basket {
  id: string;
  items: Array<{ id: string; quantity: number; price: number }>;
  total: number;
  userId: string;
}

describe("updateBasket", () => {
  const mockBasketId = "basket-123";
  const mockBasketData: Partial<Basket> = {
    items: [{ id: "item-1", quantity: 2, price: 10.99 }],
    total: 21.98,
  };

  const mockBasket: Basket = {
    id: mockBasketId,
    items: [{ id: "item-1", quantity: 2, price: 10.99 }],
    total: 21.98,
    userId: "user-123",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    consoleSpy.mockClear();
  });

  describe("successful updates", () => {
    it("should return updated basket on successful API call", async () => {
      vi.mocked(payloadAPI.updateBasket).mockResolvedValue(mockBasket);

      const result = await updateBasket(mockBasketId, mockBasketData);

      expect(result).toEqual({
        basket: mockBasket,
      });
      expect(result.error).toBeUndefined();
      expect(payloadAPI.updateBasket).toHaveBeenCalledWith(
        mockBasketId,
        mockBasketData,
      );
      expect(payloadAPI.updateBasket).toHaveBeenCalledTimes(1);
    });

    it("should handle empty basket data", async () => {
      const emptyBasketData = {};
      vi.mocked(payloadAPI.updateBasket).mockResolvedValue(mockBasket);

      const result = await updateBasket(mockBasketId, emptyBasketData);

      expect(result).toEqual({
        basket: mockBasket,
      });
      expect(payloadAPI.updateBasket).toHaveBeenCalledWith(
        mockBasketId,
        emptyBasketData,
      );
    });

    it("should handle empty basket ID", async () => {
      const result = await updateBasket("", mockBasketData);

      expect(result.basket).toBeUndefined();
      expect(result.error).toEqual({
        type: "validationError",
        message: "Basket ID is required",
        details: ["ID parameter cannot be empty"],
      });
      expect(payloadAPI.updateBasket).not.toHaveBeenCalled();
    });
  });

  describe("function call verification", () => {
    it("should call payloadAPI.updateBasket with correct parameters", async () => {
      vi.mocked(payloadAPI.updateBasket).mockResolvedValue(mockBasket);

      await updateBasket(mockBasketId, mockBasketData);

      expect(payloadAPI.updateBasket).toHaveBeenCalledWith(
        mockBasketId,
        mockBasketData,
      );
      expect(payloadAPI.updateBasket).toHaveBeenCalledTimes(1);
    });

    it("should log errors to console", async () => {
      const error = new Error("Test error");
      vi.mocked(payloadAPI.updateBasket).mockRejectedValue(error);

      await updateBasket(mockBasketId, mockBasketData);

      expect(consoleSpy).toHaveBeenCalledWith("Error in updateBasket:", error);
    });
  });
});
