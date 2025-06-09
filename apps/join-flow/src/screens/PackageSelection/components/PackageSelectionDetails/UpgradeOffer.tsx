import { Button, DropdownPill } from "@react-component-library/ui";
import { useState } from "react";

import { usePricingCalculations } from "@/hooks/usePricingCalculations";
import { StoreSelectedPackage } from "@/store/useJoinFlowStore";

import { upgradeOfferText } from "./PackageSelectionDetailsProps";

export const UpgradeOffer = ({
  topSpeedPackage,
  toggle,
  offer,
  priceDifference,
  handlePackageSelection,
}: {
  topSpeedPackage: StoreSelectedPackage | null;
  toggle: {
    isOn: boolean;
    onChange: (isOn: boolean) => void;
    leftLabel: string;
    rightLabel: string;
  };
  offer: boolean;
  priceDifference: number;
  handlePackageSelection: (selectedStorePackage: StoreSelectedPackage) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const pricing = usePricingCalculations(topSpeedPackage, null);

  if (!topSpeedPackage || priceDifference <= 0) return null;
  const value = toggle.isOn ? toggle.rightLabel : toggle.leftLabel;

  const handleChange = (value: string) => {
    toggle.onChange(value === toggle.rightLabel);
  };

  return (
    <div
      data-testid="upgrade-offer"
      className="bg-ui-grey-100 py-8 px-8 md:px-11 rounded-lg flex flex-col gap-6"
    >
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-lg md:text-xl md:max-w-[90%]">
          For just £{priceDifference} more per month, you could get a super
          speedy {topSpeedPackage.speeds.download}Mbps
        </p>
        {/* TO DO: We don't have offers yet, but when this gets returned change it */}
        {offer && (
          <p
            className="font-medium text-sm md:text-md"
            data-testid="upgrade-offer-subtitle"
          >
            {upgradeOfferText.upgradeOffer}
          </p>
        )}
      </div>
      <DropdownPill
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        value={value}
        setValue={handleChange}
        options={[toggle.leftLabel, toggle.rightLabel]}
      />
      <div className="bg-core-yellow rounded-lg py-4 px-3 max-w-[272px]">
        <p className="pb-1 text-sm" data-testid="monthly-price">
          <span className="font-semibold text-xl">
            £{pricing.monthlyPackagePrice}
          </span>
          /month
        </p>
        <hr className="border-t-[1px] border-core-black" />
        <div className="pt-1 flex flex-col">
          <p className="text-xs leading-[1.6]" data-testid="next-price">
            {upgradeOfferText.nextPrice}{" "}
            <span className="font-semibold">
              £{pricing.nextPrice}
              /month
            </span>
          </p>
          <p className="text-xs leading-[1.6]" data-testid="following-price">
            {upgradeOfferText.followingPrice}{" "}
            <span className="font-semibold">
              £{pricing.followingPrice}
              /month
            </span>
          </p>
        </div>
      </div>
      <Button
        type="button"
        variant="solid"
        tint="black"
        size="small"
        onClick={() => {
          handlePackageSelection(topSpeedPackage);
        }}
        className="w-full sm:w-[173px]"
      >
        {upgradeOfferText.upgradeButton}
      </Button>
    </div>
  );
};
