import { BroadbandPackage } from "@/store/useJoinFlowStore";

export const PackageTitle = ({ pkg }: { pkg: BroadbandPackage }) => (
  <div className="flex flex-col gap-2">
    <h2 className="text-[26px] md:text-3xl font-semibold leading-[1.5] md:leading-[1.4]">
      {pkg.name}
    </h2>
    <p className="text-sm md:text-md font-medium leading-[1.6] md:leading-[1.6]">
      {pkg.speed.download}Mbps full fibre speed, {pkg.contractLength}-month
      contract
    </p>
  </div>
);
