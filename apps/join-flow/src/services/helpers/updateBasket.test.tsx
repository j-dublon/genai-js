import { StoreBasket } from "@store/useJoinFlowStore";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { squidAPI } from "@/services/payloadClient";

import { Basket } from "../../../payload-types";
import { updateBasket } from "./updateBasket";

vi.mock("@/services/payloadClient", () => ({
  squidAPI: {
    updateBasket: vi.fn(),
  },
}));

const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

describe("updateBasket", () => {
  const mockBasketId = "basket-123";
  const mockBasketData: Partial<StoreBasket> = {
    id: mockBasketId,
    product: {
      selectionIdentifier: "item-1",
      quoteLookup: {
        value: "quote-123",
        relationTo: "newSaleQuoteLookups",
      },
    },
  };

  const mockBasket: Basket = {
    id: mockBasketId,
    product: {
      selectionIdentifier: "item-1",
      quoteLookup: {
        value: "quote-123",
        relationTo: "newSaleQuoteLookups",
      },
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    consoleSpy.mockClear();
  });

  describe("successful updates", () => {
    it("should return updated basket on successful API call", async () => {
      vi.mocked(squidAPI.updateBasket).mockResolvedValue(mockBasket);

      const result = await updateBasket(mockBasketId, mockBasketData);

      expect(result).toEqual({
        basket: mockBasket,
      });
      expect(result.error).toBeUndefined();
      expect(squidAPI.updateBasket).toHaveBeenCalledWith(
        mockBasketId,
        mockBasketData,
      );
      expect(squidAPI.updateBasket).toHaveBeenCalledTimes(1);
    });

    it("should handle empty basket data", async () => {
      const emptyBasketData = {};
      vi.mocked(squidAPI.updateBasket).mockResolvedValue(mockBasket);

      const result = await updateBasket(mockBasketId, emptyBasketData);

      expect(result).toEqual({
        basket: mockBasket,
      });
      expect(squidAPI.updateBasket).toHaveBeenCalledWith(
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
      expect(squidAPI.updateBasket).not.toHaveBeenCalled();
    });
  });

  describe("function call verification", () => {
    it("should call payloadAPI.updateBasket with correct parameters", async () => {
      vi.mocked(squidAPI.updateBasket).mockResolvedValue(mockBasket);

      await updateBasket(mockBasketId, mockBasketData);

      expect(squidAPI.updateBasket).toHaveBeenCalledWith(
        mockBasketId,
        mockBasketData,
      );
      expect(squidAPI.updateBasket).toHaveBeenCalledTimes(1);
    });

    it("should log errors to console", async () => {
      const error = new Error("Test error");
      vi.mocked(squidAPI.updateBasket).mockRejectedValue(error);

      await updateBasket(mockBasketId, mockBasketData);

      expect(consoleSpy).toHaveBeenCalledWith("Error in updateBasket:", error);
    });
  });
});
