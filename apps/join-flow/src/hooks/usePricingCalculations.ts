import { StoreSelectedPackage } from "@store/useJoinFlowStore";
import { useMemo } from "react";

import { EeroProduct } from "@/store/useJoinFlowStore";

export const convertPenceToPounds = (pence: number): number => pence / 100;

const generatePackageName = (speeds: { download: number }): string =>
  `${speeds.download}Mbps`;

export const usePricingCalculations = (
  selectedPackage: StoreSelectedPackage | null,
  eeroSelection: EeroProduct | null,
) => {
  return useMemo(() => {
    if (!selectedPackage) {
      return {
        monthlyPackagePrice: 0,
        nextPrice: 0,
        followingPrice: 0,
        monthlyEeroPrice: 0,
        monthlyTotal: 0,
        predictedTotalNext: 0,
        predictedTotalFollowing: 0,
        packageName: "",
      };
    }

    const monthlyPackagePrice = convertPenceToPounds(
      selectedPackage.prices.basePrice,
    );
    const nextPrice = selectedPackage.prices.annualPriceRise?.[0]?.price
      ? convertPenceToPounds(selectedPackage.prices.annualPriceRise[0].price)
      : monthlyPackagePrice;
    const followingPrice = selectedPackage.prices.annualPriceRise?.[1]?.price
      ? convertPenceToPounds(selectedPackage.prices.annualPriceRise[1].price)
      : nextPrice;

    //TO DO: unlikely we need to round this, but lets to see what extras returns
    const monthlyEeroPrice = eeroSelection
      ? Math.round(convertPenceToPounds(eeroSelection.price))
      : 0;
    const monthlyTotal = monthlyPackagePrice + monthlyEeroPrice;
    const predictedTotalNext = nextPrice + monthlyEeroPrice;
    const predictedTotalFollowing = followingPrice + monthlyEeroPrice;
    const packageName = generatePackageName(selectedPackage.speeds);

    return {
      monthlyPackagePrice,
      nextPrice,
      followingPrice,
      monthlyEeroPrice,
      monthlyTotal,
      predictedTotalNext,
      predictedTotalFollowing,
      packageName,
    };
  }, [selectedPackage, eeroSelection]);
};
