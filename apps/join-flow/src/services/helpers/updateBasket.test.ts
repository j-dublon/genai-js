import {
  type Basket,
  squidAPI,
} from "@cuckoointernet/util-squid-network-requests";
import type { StoreBasket } from "@store/useJoinFlowStore";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { updateBasket } from "./updateBasket";

vi.mock("@cuckoointernet/util-squid-network-requests", async () => {
  const actual = await vi.importActual(
    "@cuckoointernet/util-squid-network-requests",
  );
  return {
    ...actual,
    squidAPI: {
      updateBasket: vi.fn(),
    },
  };
});

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
        type: "basketError",
        message: "Basket ID is required",
        details: ["ID parameter cannot be empty"],
      });
      expect(squidAPI.updateBasket).not.toHaveBeenCalled();
    });
  });

  describe("function call verification", () => {
    it("should call squidAPI.updateBasket with correct parameters", async () => {
      vi.mocked(squidAPI.updateBasket).mockResolvedValue(mockBasket);

      await updateBasket(mockBasketId, mockBasketData);

      expect(squidAPI.updateBasket).toHaveBeenCalledWith(
        mockBasketId,
        mockBasketData,
      );
      expect(squidAPI.updateBasket).toHaveBeenCalledTimes(1);
    });
  });
});
