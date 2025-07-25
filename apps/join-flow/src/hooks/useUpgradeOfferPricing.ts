import { StoreSelectedPackage } from "@store/useJoinFlowStore";
import { useMemo } from "react";

const convertPenceToPounds = (pence: number): number => pence / 100;

export const useUpgradeOfferPricing = (
  topSpeedPackage: StoreSelectedPackage | null,
) => {
  return useMemo(() => {
    if (!topSpeedPackage) {
      return {
        monthlyPrice: 0,
        nextPrice: 0,
        followingPrice: 0,
        speedMbps: 0,
      };
    }

    const { prices, speeds } = topSpeedPackage;
    const { broadbandAndCurrentExtras } = prices;
    const { basePrice, annualPriceRise } = broadbandAndCurrentExtras;

    const sortedPriceRises = annualPriceRise;

    const monthlyPrice = convertPenceToPounds(basePrice);
    const nextPrice = sortedPriceRises?.[0]?.price
      ? convertPenceToPounds(sortedPriceRises[0].price)
      : monthlyPrice;
    const followingPrice = sortedPriceRises?.[1]?.price
      ? convertPenceToPounds(sortedPriceRises[1].price)
      : nextPrice;

    return {
      monthlyPrice,
      nextPrice,
      followingPrice,
      speedMbps: speeds.download,
    };
  }, [topSpeedPackage]);
};
