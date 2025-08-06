import { Button, DropdownPill } from "@react-component-library/ui";
import { useState } from "react";

import { usePricingCalculations } from "@/hooks/usePricingCalculations";
import {
  followingApril,
  formatDisplayDateMonthYear,
  nextApril,
} from "@/lib/formatDate";
import { formatPriceHideZeroPence } from "@/lib/formatPriceHideZeroPence";
import { StoreSelectedPackage } from "@/store/useJoinFlowStore";

import { upgradeOfferText } from "./PackageSelectionDetailsProps";

export const UpgradeOffer = ({
  topSpeedPackage,
  toggle,
  priceDifference,
  handlePackageSelection,
  hasOnlyOneContractLengthAvailable,
}: {
  topSpeedPackage: StoreSelectedPackage;
  toggle: {
    isOn: boolean;
    onChange: (isOn: boolean) => void;
    leftLabel: string;
    rightLabel: string;
  };
  priceDifference: number;
  handlePackageSelection: (selectedStorePackage: StoreSelectedPackage) => void;
  hasOnlyOneContractLengthAvailable: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const pricing = usePricingCalculations(topSpeedPackage, null);

  if (priceDifference <= 0) return null;

  const value = toggle.isOn ? toggle.rightLabel : toggle.leftLabel;

  const handleChange = (value: string) => {
    toggle.onChange(value === toggle.rightLabel);
  };

  const annualPriceRise =
    topSpeedPackage.prices?.broadband.annualPriceRise ?? [];
  const nextPriceDate = annualPriceRise[0]?.date;
  const followingPriceDate = annualPriceRise[1]?.date;

  return (
    <div
      data-testid="upgrade-offer"
      className="bg-ui-grey-100 py-8 px-8 md:px-11 rounded-lg flex flex-col gap-6"
    >
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-lg md:text-xl md:max-w-[90%]">
          For just {formatPriceHideZeroPence(priceDifference)} more per month,
          you could get a super speedy {topSpeedPackage.speeds.download}Mbps
        </p>
      </div>
      {!hasOnlyOneContractLengthAvailable && (
        <DropdownPill
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          value={value}
          setValue={handleChange}
          options={[toggle.leftLabel, toggle.rightLabel]}
        />
      )}
      <div className="bg-core-yellow rounded-lg py-4 px-3 max-w-[272px]">
        <p className="pb-1 text-sm" data-testid="monthly-price">
          <span className="font-semibold text-xl">
            £{pricing.discountedPrice || pricing.monthlyPackagePrice}
          </span>
          /month
        </p>
        <hr className="border-t-[1px] border-core-black" />
        <div className="pt-1 flex flex-col">
          <p className="text-xs leading-[1.6]" data-testid="next-price">
            From{" "}
            {nextPriceDate
              ? formatDisplayDateMonthYear(nextPriceDate)
              : nextApril(new Date())}{" "}
            <span className="font-semibold">
              £{pricing.nextPrice}
              /month
            </span>
          </p>
          {topSpeedPackage.termMonths > 12 && (
            <p className="text-xs leading-[1.6]" data-testid="following-price">
              From{" "}
              {followingPriceDate
                ? formatDisplayDateMonthYear(followingPriceDate)
                : followingApril(new Date())}{" "}
              <span className="font-semibold">
                £{pricing.followingPrice}
                /month
              </span>
            </p>
          )}
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
