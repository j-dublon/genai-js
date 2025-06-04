import { Button, DropdownPill } from "@react-component-library/ui";
import { useState } from "react";

import { useScrollToElement } from "@/hooks/useScrollToElement";
import { BroadbandPackage } from "@/store/useJoinFlowStore";

import { upgradeOfferText } from "./PackageSelectionDetailsProps";

export const UpgradeOffer = ({
  topSpeedPackage,
  toggle,
  offer,
  priceDifference,
  setShowUpgradeOffer,
  changePackage,
}: {
  topSpeedPackage: BroadbandPackage | null;
  toggle: {
    isOn: boolean;
    onChange: (isOn: boolean) => void;
    leftLabel: string;
    rightLabel: string;
  };
  offer: boolean;
  priceDifference: number;
  setShowUpgradeOffer: (show: boolean) => void;
  changePackage: (pkg: BroadbandPackage) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollToTop = useScrollToElement("#fullscreen-modal-title");

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
          speedy {topSpeedPackage.speed.download}Mbps
        </p>
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
            £{topSpeedPackage.price.monthly}
          </span>
          /month
        </p>
        <hr className="border-t-[1px] border-core-black" />
        <div className="pt-1 flex flex-col">
          <p className="text-xs leading-[1.6]" data-testid="next-year-price">
            {upgradeOfferText.nextYearPrice}{" "}
            <span className="font-semibold">
              £
              {topSpeedPackage.price.monthly +
                topSpeedPackage.priceIncrease.nextYearIncrease}
              /month
            </span>
          </p>
          <p
            className="text-xs leading-[1.6]"
            data-testid="following-year-price"
          >
            {upgradeOfferText.followingYearPrice}{" "}
            <span className="font-semibold">
              £
              {topSpeedPackage.price.monthly +
                topSpeedPackage.priceIncrease.nextYearIncrease +
                topSpeedPackage.priceIncrease.followingYearIncrease}
              /month
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
        <Button
          type="button"
          variant="outline"
          tint="black"
          size="small"
          onClick={() => setShowUpgradeOffer(false)}
          className="w-full sm:w-[173px]"
        >
          {upgradeOfferText.hideOfferButton}
        </Button>
        <Button
          type="button"
          variant="solid"
          tint="black"
          size="small"
          onClick={() => {
            changePackage(topSpeedPackage);
            scrollToTop();
          }}
          className="w-full sm:w-[173px]"
        >
          {upgradeOfferText.upgradeButton}
        </Button>
      </div>
    </div>
  );
};
