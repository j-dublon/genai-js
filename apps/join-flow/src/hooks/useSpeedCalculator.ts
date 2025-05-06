import { useState } from "react";

import { BroadbandPackage } from "@/store/useJoinFlowStore";

import { SpeedCalculatorFormData } from "../screens/PackageSelection/components/SpeedCalculator";

const WEIGHTING = {
  PEOPLE_COUNT: 10,
  USAGE_WEIGHTS: {
    Gaming: 15,
    Streaming: 12,
    "Working from home": 10,
    "Video calls": 8,
    "Social media": 5,
  },
  SMART_SPEAKERS_MULTIPLIER: 1.2,
};

export const useSpeedCalculator = (broadbandPackages: BroadbandPackage[]) => {
  const [recommendedPackage, setRecommendedPackage] =
    useState<BroadbandPackage | null>(null);

  const calculateScore = (data: SpeedCalculatorFormData): number => {
    let totalScore = 0;
    // score based on number of people
    totalScore += data.peopleCount * WEIGHTING.PEOPLE_COUNT;

    // add score based on internet usage
    data.internetUses.forEach((usage) => {
      if (usage in WEIGHTING.USAGE_WEIGHTS) {
        totalScore +=
          WEIGHTING.USAGE_WEIGHTS[
            usage as keyof typeof WEIGHTING.USAGE_WEIGHTS
          ];
      }
    });

    // add score based on smart speakers
    if (data.smartSpeakers === "Yes") {
      totalScore *= WEIGHTING.SMART_SPEAKERS_MULTIPLIER;
    }

    return totalScore;
  };

  const getRecommendedPackage = (
    data: SpeedCalculatorFormData,
  ): BroadbandPackage | null => {
    const score = calculateScore(data);

    // filter to only include 24-month plans, then sort by download speed
    const sortedPackages = broadbandPackages
      .filter((pkg) => pkg.contractLength === 24)
      .sort((a, b) => a.speed.download - b.speed.download);

    // if there's only 1 package, return it, or return null if there are no packages
    if (sortedPackages.length <= 1) {
      return sortedPackages[0] || null;
    }

    const thresholds = {
      low: 50,
      medium: sortedPackages.length === 3 ? 100 : 75,
    };

    if (score >= thresholds.medium) {
      return sortedPackages.at(-1) || null;
    } else if (score >= thresholds.low && sortedPackages.length === 3) {
      return sortedPackages[1];
    }
    return sortedPackages[0];
  };

  const calculateRecommendedPackage = (
    data: SpeedCalculatorFormData | null,
  ): void => {
    // this is used to reset the form
    if (!data) {
      setRecommendedPackage(null);
      return;
    }
    const recommended = getRecommendedPackage(data);
    setRecommendedPackage(recommended);
  };

  return {
    recommendedPackage,
    calculateRecommendedPackage,
  };
};
