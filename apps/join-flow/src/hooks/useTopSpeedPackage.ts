import { StoreSelectedPackage } from "@/store/useJoinFlowStore";

export const useTopSpeedPackage = (
  packages: StoreSelectedPackage[],
): StoreSelectedPackage | null => {
  const filteredPackages = [...packages].sort(
    (a, b) => b.speeds.download - a.speeds.download,
  );

  return filteredPackages[0] || null;
};
