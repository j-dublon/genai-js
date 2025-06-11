import { EeroProduct, StoreSelectedPackage } from "@store/useJoinFlowStore";
import { renderHook } from "@testing-library/react";

import {
  convertPenceToPounds,
  usePricingCalculations,
} from "./usePricingCalculations";

describe("usePricingCalculations", () => {
  const mockPackage: StoreSelectedPackage = {
    id: "1",
    frontendIdentifier: "Superfast",
    frontendTitle: "C-150",
    speeds: {
      download: 67,
      upload: 18,
    },
    prices: {
      basePrice: 3000,
      discountedPrice: 2999,
      annualPriceRise: [
        { price: 3300, date: "2025-04-01" },
        { price: 3600, date: "2026-04-01" },
      ],
    },
    krakenProductCode: "SUPERFAST_67",
    termMonths: 18,
    selectionIdentifier: "superfast-67",
    installationRequired: false,
  };

  const mockEeroProduct: EeroProduct = {
    id: "1",
    name: "eero 6",
    description: "Fast WiFi for your home",
    price: 500,
    isSelected: false,
  };

  describe("convertPenceToPounds", () => {
    it("should convert pence to pounds correctly", () => {
      expect(convertPenceToPounds(3000)).toBe(30);
      expect(convertPenceToPounds(500)).toBe(5);
      expect(convertPenceToPounds(0)).toBe(0);
      expect(convertPenceToPounds(100)).toBe(1);
    });
  });

  describe("when selectedPackage is null", () => {
    it("should return default values", () => {
      const { result } = renderHook(() => usePricingCalculations(null, null));

      expect(result.current).toEqual({
        monthlyPackagePrice: 0,
        nextPrice: 0,
        followingPrice: 0,
        monthlyEeroPrice: 0,
        monthlyTotal: 0,
        predictedTotalNext: 0,
        predictedTotalFollowing: 0,
        packageName: "",
      });
    });
  });

  describe("when selectedPackage is provided", () => {
    it("should calculate pricing correctly without eero", () => {
      const { result } = renderHook(() =>
        usePricingCalculations(mockPackage, null),
      );

      expect(result.current).toEqual({
        monthlyPackagePrice: 30,
        nextPrice: 33,
        followingPrice: 36,
        monthlyEeroPrice: 0,
        monthlyTotal: 30,
        predictedTotalNext: 33,
        predictedTotalFollowing: 36,
        packageName: "67Mbps",
      });
    });

    it("should calculate pricing correctly with eero", () => {
      const { result } = renderHook(() =>
        usePricingCalculations(mockPackage, mockEeroProduct),
      );

      expect(result.current).toEqual({
        monthlyPackagePrice: 30,
        nextPrice: 33,
        followingPrice: 36,
        monthlyEeroPrice: 5,
        monthlyTotal: 35,
        predictedTotalNext: 38,
        predictedTotalFollowing: 41,
        packageName: "67Mbps",
      });
    });

    it("should handle package without annual price rises", () => {
      const packageWithoutRises = {
        ...mockPackage,
        prices: {
          ...mockPackage.prices,
          annualPriceRise: null,
        },
      };

      const { result } = renderHook(() =>
        usePricingCalculations(packageWithoutRises, null),
      );

      expect(result.current.nextPrice).toBe(30);
      expect(result.current.followingPrice).toBe(30);
      expect(result.current.predictedTotalNext).toBe(30);
      expect(result.current.predictedTotalFollowing).toBe(30);
    });

    it("should handle package with only one annual price rise", () => {
      const packageWithOneRise = {
        ...mockPackage,
        prices: {
          ...mockPackage.prices,
          annualPriceRise: [{ price: 3300, date: "2025-04-01" }],
        },
      };

      const { result } = renderHook(() =>
        usePricingCalculations(packageWithOneRise, null),
      );

      expect(result.current.nextPrice).toBe(33);
      expect(result.current.followingPrice).toBe(33);
    });

    it("should handle empty annual price rises array", () => {
      const packageWithEmptyRises = {
        ...mockPackage,
        prices: {
          ...mockPackage.prices,
          annualPriceRise: [],
        },
      };

      const { result } = renderHook(() =>
        usePricingCalculations(packageWithEmptyRises, null),
      );

      expect(result.current.nextPrice).toBe(30);
      expect(result.current.followingPrice).toBe(30);
    });
  });

  describe("eero pricing calculations", () => {
    it("should round eero price when necessary", () => {
      const eeroWithDecimalPrice: EeroProduct = {
        ...mockEeroProduct,
        price: 567,
      };

      const { result } = renderHook(() =>
        usePricingCalculations(mockPackage, eeroWithDecimalPrice),
      );

      expect(result.current.monthlyEeroPrice).toBe(6);
    });

    it("should handle zero price eero", () => {
      const freeEero: EeroProduct = {
        ...mockEeroProduct,
        price: 0,
      };

      const { result } = renderHook(() =>
        usePricingCalculations(mockPackage, freeEero),
      );

      expect(result.current.monthlyEeroPrice).toBe(0);
      expect(result.current.monthlyTotal).toBe(30);
    });
  });

  describe("package name generation", () => {
    it("should generate correct package name", () => {
      const fastPackage = {
        ...mockPackage,
        speeds: { download: 100, upload: 20 },
      };

      const { result } = renderHook(() =>
        usePricingCalculations(fastPackage, null),
      );

      expect(result.current.packageName).toBe("100Mbps");
    });
  });

  describe("memoization", () => {
    it("should return the same reference when inputs do not change", () => {
      const { result, rerender } = renderHook(() =>
        usePricingCalculations(mockPackage, mockEeroProduct),
      );

      const firstResult = result.current;

      rerender();

      expect(result.current).toBe(firstResult);
    });

    it("should return new reference when inputs change", () => {
      const { result, rerender } = renderHook(
        ({ pkg, eero }) => usePricingCalculations(pkg, eero),
        {
          initialProps: { pkg: mockPackage, eero: mockEeroProduct },
        },
      );

      const firstResult = result.current;

      const newPackage = {
        ...mockPackage,
        speeds: { download: 200, upload: 50 },
      };
      rerender({ pkg: newPackage, eero: mockEeroProduct });

      expect(result.current).not.toBe(firstResult);
      expect(result.current.packageName).toBe("200Mbps");
    });
  });
});
