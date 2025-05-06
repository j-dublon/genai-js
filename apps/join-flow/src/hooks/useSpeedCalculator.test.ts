import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SpeedCalculatorFormData } from "@/screens/PackageSelection/components/SpeedCalculator";
import { BroadbandPackage } from "@/store/useJoinFlowStore";

import { useSpeedCalculator } from "./useSpeedCalculator";

const mockThreePackages: BroadbandPackage[] = [
  {
    id: "c-150",
    name: "C-150",
    speed: {
      download: 150,
      upload: 30,
    },
    price: {
      monthly: 30,
      setup: 0,
    },
    priceIncrease: {
      nextYearIncrease: 3.0,
      followingYearIncrease: 3.0,
    },
    contractLength: 24,
    description: "Full fibre speed",
  },
  {
    id: "c-500",
    name: "C-500",
    speed: {
      download: 500,
      upload: 20,
    },
    price: {
      monthly: 35,
      setup: 0,
    },
    priceIncrease: {
      nextYearIncrease: 3.0,
      followingYearIncrease: 3.0,
    },
    contractLength: 24,
    description: "Full fibre speed",
  },
  {
    id: "c-900",
    name: "C-900",
    speed: {
      download: 900,
      upload: 100,
    },
    price: {
      monthly: 41,
      setup: 0,
    },
    priceIncrease: {
      nextYearIncrease: 3.0,
      followingYearIncrease: 3.0,
    },
    contractLength: 24,
    description: "Full fibre speed",
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
});
