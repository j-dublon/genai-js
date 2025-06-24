import { PillButton } from "@react-component-library/ui";
import { useState } from "react";

import { convertPenceToPounds } from "@/hooks/usePricingCalculations";
import { StoreSelectedPackage } from "@/store/useJoinFlowStore";

export const PackageInfo = ({
  availablePackages,
  onPlanChange,
  selectedPackage,
  changePlanButtonText,
  broadbandPlanText,
  planDescriptionText,
}: {
  availablePackages: StoreSelectedPackage[];
  onPlanChange: (selectedPlanId: string) => Promise<void>;
  selectedPackage: StoreSelectedPackage;
  changePlanButtonText: string;
  broadbandPlanText: string;
  planDescriptionText: string;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlanChange = async (selectedPlanId: string) => {
    setIsLoading(true);
    setDropdownOpen(false);
    await onPlanChange(selectedPlanId);
    setIsLoading(false);
  };

  const getOptionLabel = (pkg: StoreSelectedPackage) => {
    return `${pkg.speeds.download}Mbps - £${convertPenceToPounds(pkg.prices.basePrice)}/month - ${pkg.termMonths} months`;
  };

  return (
    <>
      <div className="flex flex-col md:flex-row text-xs md:text-sm leading-[1.6] gap-4 md:gap-1">
        <h3 className="font-normal whitespace-nowrap">{broadbandPlanText}</h3>
        <p className="font-semibold flex flex-col">
          <span>{`${selectedPackage.frontendIdentifier} ${planDescriptionText}`}</span>
          <span>{`${selectedPackage.speeds.download}Mbps download speed`}</span>
          <span>{`${selectedPackage.speeds.upload}Mbps upload speed`}</span>
          <span>{`${selectedPackage.termMonths} months`}</span>
        </p>
      </div>
      <PillButton
        buttonText={changePlanButtonText}
        backgroundColor="black"
        whiteText={true}
        type="dropdown"
        onSelect={(selectedPlanId) => handlePlanChange(selectedPlanId ?? "")}
        ariaLabel="Change plan"
        dropDownOpen={dropdownOpen}
        setDropDownOpen={setDropdownOpen}
        dropDownOptions={availablePackages.map((p) => ({
          label: getOptionLabel(p),
          value: p.frontendIdentifier,
        }))}
        isLoading={isLoading}
      />
    </>
  );
};
