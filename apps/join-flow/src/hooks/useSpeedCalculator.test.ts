import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SpeedCalculatorFormData } from "@/screens/PackageSelection/components/SpeedCalculator";
import { StoreSelectedPackage } from "@/store/useJoinFlowStore";

import { useSpeedCalculator } from "./useSpeedCalculator";

const mockThreePackages: StoreSelectedPackage[] = [
  {
    krakenProductCode: "BT-150-24M_30",
    frontendIdentifier: "150-24",
    frontendTitle: "C-150",
    termMonths: 24,
    selectionIdentifier: "0",
    installationRequired: true,
    appliedPromotionUUIDs: [],
    prices: {
      basePrice: 3000,
      discountedPrice: 3000,
      annualPriceRise: [
        {
          price: 3300,
          date: "2026-04-01T12:00:00.000Z",
          id: "rise-1",
        },
      ],
    },
    speeds: {
      download: 150,
      upload: 30,
    },
    extras: null,
    offers: null,
    id: "c-150-id",
  },
  {
    krakenProductCode: "BT-500-24M_35",
    frontendIdentifier: "500-24",
    frontendTitle: "C-500",
    termMonths: 24,
    selectionIdentifier: "1",
    installationRequired: true,
    appliedPromotionUUIDs: [],
    prices: {
      basePrice: 3500,
      discountedPrice: 3500,
      annualPriceRise: [
        {
          price: 3800,
          date: "2026-04-01T12:00:00.000Z",
          id: "rise-2",
        },
      ],
    },
    speeds: {
      download: 500,
      upload: 20,
    },
    extras: null,
    offers: null,
    id: "c-500-id",
  },
  {
    krakenProductCode: "BT-900-24M_41",
    frontendIdentifier: "900-24",
    frontendTitle: "C-900",
    termMonths: 24,
    selectionIdentifier: "2",
    installationRequired: true,
    appliedPromotionUUIDs: [],
    prices: {
      basePrice: 4100,
      discountedPrice: 4100,
      annualPriceRise: [
        {
          price: 4400,
          date: "2026-04-01T12:00:00.000Z",
          id: "rise-3",
        },
      ],
    },
    speeds: {
      download: 900,
      upload: 100,
    },
    extras: null,
    offers: null,
    id: "c-900-id",
  },
];

const mockTwoPackages = mockThreePackages.slice(0, 2);
const mockOnePackage = mockThreePackages.slice(0, 1);

describe("useSpeedCalculator", () => {
  it("should return null recommended package initially", () => {
    const { result } = renderHook(() => useSpeedCalculator(mockThreePackages));
    expect(result.current.recommendedPackage).toBeNull();
  });

  describe("with three packages", () => {
    it("should return the lowest package when low number of people and internet usage", () => {
      const { result } = renderHook(() =>
        useSpeedCalculator(mockThreePackages),
      );
      const formData: SpeedCalculatorFormData = {
        peopleCount: 2,
        internetUses: [],
        smartSpeakers: "No",
      };
      act(() => {
        result.current.calculateRecommendedPackage(formData);
      });
      expect(result.current.recommendedPackage).toEqual(mockThreePackages[0]);
    });

    it("should return the medium package when medium number of people and internet usage", () => {
      const { result } = renderHook(() =>
        useSpeedCalculator(mockThreePackages),
      );
      const formData: SpeedCalculatorFormData = {
        peopleCount: 3,
        internetUses: ["Gaming", "Streaming"],
        smartSpeakers: "No",
      };
      act(() => {
        result.current.calculateRecommendedPackage(formData);
      });
      expect(result.current.recommendedPackage).toEqual(mockThreePackages[1]);
    });

    it("should recommend the highest package when high number of people and internet usage", () => {
      const { result } = renderHook(() =>
        useSpeedCalculator(mockThreePackages),
      );
      const formData: SpeedCalculatorFormData = {
        peopleCount: 5,
        internetUses: ["Gaming", "Streaming", "Working from home"],
        smartSpeakers: "Yes",
      };
      act(() => {
        result.current.calculateRecommendedPackage(formData);
      });
      expect(result.current.recommendedPackage).toEqual(mockThreePackages[2]);
    });
  });

  describe("with two packages", () => {
    it("should return the lowest package when score is below medium threshold", () => {
      const { result } = renderHook(() => useSpeedCalculator(mockTwoPackages));
      const formData: SpeedCalculatorFormData = {
        peopleCount: 2,
        internetUses: [],
        smartSpeakers: "No",
      };
      act(() => {
        result.current.calculateRecommendedPackage(formData);
      });
      expect(result.current.recommendedPackage).toEqual(mockTwoPackages[0]);
    });

    it("should return the highest package when score is above medium threshold", () => {
      const { result } = renderHook(() => useSpeedCalculator(mockTwoPackages));
      const formData: SpeedCalculatorFormData = {
        peopleCount: 4,
        internetUses: ["Gaming", "Streaming"],
        smartSpeakers: "Yes",
      };
      act(() => {
        result.current.calculateRecommendedPackage(formData);
      });
      expect(result.current.recommendedPackage).toEqual(mockTwoPackages[1]);
    });
  });

  describe("with one package", () => {
    it("should always return the single package regardless of score", () => {
      const { result } = renderHook(() => useSpeedCalculator(mockOnePackage));
      const formData: SpeedCalculatorFormData = {
        peopleCount: 1,
        internetUses: [],
        smartSpeakers: "No",
      };
      act(() => {
        result.current.calculateRecommendedPackage(formData);
      });
      expect(result.current.recommendedPackage).toEqual(mockOnePackage[0]);
    });
  });

  it("should handle resetting the form", () => {
    const { result } = renderHook(() => useSpeedCalculator(mockThreePackages));
    const formData: SpeedCalculatorFormData = {
      peopleCount: 4,
      internetUses: ["Gaming", "Streaming"],
      smartSpeakers: "Yes",
    };
    act(() => {
      result.current.calculateRecommendedPackage(formData);
    });
    expect(result.current.recommendedPackage).not.toBeNull();

    act(() => {
      result.current.calculateRecommendedPackage(null);
    });
    expect(result.current.recommendedPackage).toBeNull();
  });

  it("returns null when no packages are provided to recommend", () => {
    const { result } = renderHook(() => useSpeedCalculator([]));
    const formData: SpeedCalculatorFormData = {
      peopleCount: 1,
      internetUses: ["Gaming"],
      smartSpeakers: "No",
    };
    act(() => {
      result.current.calculateRecommendedPackage(formData);
    });
    expect(result.current.recommendedPackage).toBeNull();
  });

  it("should filter packages by 24-month term", () => {
    const mixedTermPackages: StoreSelectedPackage[] = [
      {
        ...mockThreePackages[0],
        termMonths: 12,
      },
      ...mockThreePackages,
    ];

    const { result } = renderHook(() => useSpeedCalculator(mixedTermPackages));
    const formData: SpeedCalculatorFormData = {
      peopleCount: 2,
      internetUses: [],
      smartSpeakers: "No",
    };
    act(() => {
      result.current.calculateRecommendedPackage(formData);
    });
    expect(result.current.recommendedPackage).toEqual(mockThreePackages[0]);
  });

  it("should sort packages by download speed", () => {
    const unsortedPackages = [
      mockThreePackages[2],
      mockThreePackages[0],
      mockThreePackages[1],
    ];

    const { result } = renderHook(() => useSpeedCalculator(unsortedPackages));
    const formData: SpeedCalculatorFormData = {
      peopleCount: 2,
      internetUses: [],
      smartSpeakers: "No",
    };
    act(() => {
      result.current.calculateRecommendedPackage(formData);
    });
    expect(result.current.recommendedPackage).toEqual(mockThreePackages[0]);
  });
});
