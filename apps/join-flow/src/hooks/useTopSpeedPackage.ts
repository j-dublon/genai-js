import { BroadbandPackage } from "@/store/useJoinFlowStore";

export const useTopSpeedPackage = (
  packages: BroadbandPackage[],
): BroadbandPackage | null => {
  const filteredPackages = [...packages].sort(
    (a, b) => b.speed.download - a.speed.download,
  );

  return filteredPackages[0] || null;
};
