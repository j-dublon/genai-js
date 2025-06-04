import {
  Button,
  TextWithTickList,
  TrustpilotHorizontal,
  useTrustpilotScore,
} from "@react-component-library/ui";
import { BroadbandPackage } from "@store/useJoinFlowStore";
import { useState } from "react";

import { EeroImage } from "./EeroImage";
import { MoreInformation } from "./MoreInformation";
import { tickListItems } from "./PackageSelectionDetailsProps";
import { PackageTitle } from "./PackageTitle";
import { SpeedPriceDetails } from "./SpeedPriceDetails";
import { UpgradeOffer } from "./UpgradeOffer";

interface PackageSelectionDetailsProps {
  packageDetails: BroadbandPackage;
  handlePackageSelection: (packageId: string) => void;
  topSpeedPackage: BroadbandPackage | null;
  toggle: {
    isOn: boolean;
    onChange: (isOn: boolean) => void;
    leftLabel: string;
    rightLabel: string;
  };
  changePackage: (pkg: BroadbandPackage) => void;
}

export const PackageSelectionDetails = ({
  packageDetails,
  handlePackageSelection,
  topSpeedPackage,
  toggle,
  changePackage,
}: PackageSelectionDetailsProps) => {
  const { data: trustpilotRating } = useTrustpilotScore();
  const { trustScore, numberOfReviews } = trustpilotRating || {};

  const [showUpgradeOffer, setShowUpgradeOffer] = useState(true);

  const isTopSpeedPackage = packageDetails.id === topSpeedPackage?.id;

  return (
    <div className="px-5 md:px-20 lg:px-29 py-8 md:pt-14 lg:pt-20 md:pb-27">
      {/* Desktop View */}
      <div
        className="hidden md:block"
        data-testid="package-selection-details-desktop"
      >
        <div className="flex gap-10">
          <div className="flex flex-col gap-12 w-1/2">
            <EeroImage packageName={packageDetails.name} />
            <SpeedPriceDetails
              pkg={packageDetails}
              promotion={packageDetails.name === "C-900"}
            />
          </div>
          <div className="flex flex-col gap-12 w-1/2">
            <PackageTitle pkg={packageDetails} />
            <Button
              variant="solid"
              tint="yellow"
              size="large"
              fullWidth
              className="md:w-auto"
              onClick={() => handlePackageSelection(packageDetails.id)}
            >
              Add to basket
            </Button>
            <div className="flex flex-col md:gap-6">
              <TextWithTickList
                textItems={
                  packageDetails.name === "C-900"
                    ? tickListItems
                    : tickListItems.slice(1)
                }
              />
            </div>
            {!isTopSpeedPackage && showUpgradeOffer && (
              <UpgradeOffer
                topSpeedPackage={topSpeedPackage}
                toggle={toggle}
                offer={topSpeedPackage?.name === "C-900"}
                setShowUpgradeOffer={setShowUpgradeOffer}
                priceDifference={
                  (topSpeedPackage?.price.monthly || 0) -
                  packageDetails.price.monthly
                }
                changePackage={changePackage}
              />
            )}
            {trustScore && (
              <TrustpilotHorizontal
                trustScore={trustScore}
                numberOfReviews={numberOfReviews}
                className="md:flex-col lg:flex-row"
              />
            )}
          </div>
        </div>
        <hr className="border-t-[2px] text-ui-grey-300 my-16" />
        <MoreInformation />
      </div>

      {/* Mobile View */}
      <div
        className="md:hidden flex flex-col gap-6"
        data-testid="package-selection-details-mobile"
      >
        <PackageTitle pkg={packageDetails} />
        <div className="flex sm:gap-6 flex-col gap-4 sm:flex-row">
          <EeroImage packageName={packageDetails.name} />
          <div className="flex flex-col gap-4">
            <TextWithTickList
              textItems={
                packageDetails.name === "C-900"
                  ? tickListItems
                  : tickListItems.slice(1)
              }
            />
          </div>
        </div>
        <SpeedPriceDetails
          pkg={packageDetails}
          promotion={packageDetails.name === "C-900"}
        />
        {!isTopSpeedPackage && showUpgradeOffer && (
          <UpgradeOffer
            topSpeedPackage={topSpeedPackage}
            toggle={toggle}
            offer={topSpeedPackage?.name === "C-900"}
            setShowUpgradeOffer={setShowUpgradeOffer}
            priceDifference={
              (topSpeedPackage?.price.monthly || 0) -
              packageDetails.price.monthly
            }
            changePackage={changePackage}
          />
        )}
        <Button
          variant="solid"
          tint="yellow"
          size="large"
          fullWidth
          onClick={() => handlePackageSelection(packageDetails.id)}
        >
          Add to basket
        </Button>
        <hr className="border-t-[2px] text-ui-grey-300 mt-4" />
        <MoreInformation />
        {trustScore && (
          <div className="mt-4">
            <TrustpilotHorizontal
              trustScore={trustScore}
              numberOfReviews={numberOfReviews}
              flexDirectionMobile="col"
            />
          </div>
        )}
      </div>
    </div>
  );
};
