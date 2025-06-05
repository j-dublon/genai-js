import {
  Button,
  TextWithTickList,
  TrustpilotHorizontal,
  useTrustpilotScore,
} from "@react-component-library/ui";
import { useState } from "react";

import { StoreSelectedPackage } from "@/store/useJoinFlowStore";

import { EeroImage } from "./EeroImage";
import { MoreInformation } from "./MoreInformation";
import { tickListItems } from "./PackageSelectionDetailsProps";
import { PackageTitle } from "./PackageTitle";
import { SpeedPriceDetails } from "./SpeedPriceDetails";
import { UpgradeOffer } from "./UpgradeOffer";
interface PackageSelectionDetailsProps {
  packageDetails: StoreSelectedPackage;
  handlePackageSelection: (selectedStorePackage: StoreSelectedPackage) => void;
  topSpeedPackage: StoreSelectedPackage | null;
  toggle: {
    isOn: boolean;
    onChange: (isOn: boolean) => void;
    leftLabel: string;
    rightLabel: string;
  };
  changePackage: (pkg: StoreSelectedPackage) => void;
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

  const isTopSpeedPackage =
    packageDetails.frontendIdentifier === topSpeedPackage?.frontendIdentifier;
  const packageName = `${packageDetails.speeds.download}Mbps`;
  const isHighSpeedPackage =
    packageDetails.frontendIdentifier === "900-12" ||
    packageDetails.frontendIdentifier === "900-24";

  return (
    <div className="px-5 md:px-20 lg:px-29 py-8 md:pt-14 lg:pt-20 md:pb-27">
      {/* Desktop View */}
      <div
        className="hidden md:block"
        data-testid="package-selection-details-desktop"
      >
        <div className="flex gap-10">
          <div className="flex flex-col gap-12 w-1/2">
            <EeroImage packageName={packageName} />
            <SpeedPriceDetails
              pkg={packageDetails}
              promotion={isHighSpeedPackage}
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
              onClick={() => handlePackageSelection(packageDetails)}
            >
              Add to basket
            </Button>
            <div className="flex flex-col md:gap-6">
              <TextWithTickList
                textItems={
                  isHighSpeedPackage ? tickListItems : tickListItems.slice(1)
                }
              />
            </div>
            {!isTopSpeedPackage && showUpgradeOffer && (
              <UpgradeOffer
                topSpeedPackage={topSpeedPackage}
                toggle={toggle}
                offer={
                  topSpeedPackage?.frontendIdentifier === "900-12" ||
                  topSpeedPackage?.frontendIdentifier === "900-24"
                }
                setShowUpgradeOffer={setShowUpgradeOffer}
                priceDifference={
                  (topSpeedPackage?.prices.basePrice || 0) / 100 -
                  packageDetails.prices.basePrice / 100
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
          <EeroImage packageName={packageName} />
          <div className="flex flex-col gap-4">
            <TextWithTickList
              textItems={
                isHighSpeedPackage ? tickListItems : tickListItems.slice(1)
              }
            />
          </div>
        </div>
        <SpeedPriceDetails
          pkg={packageDetails}
          promotion={isHighSpeedPackage}
        />
        {!isTopSpeedPackage && showUpgradeOffer && (
          <UpgradeOffer
            topSpeedPackage={topSpeedPackage}
            toggle={toggle}
            offer={
              topSpeedPackage?.frontendIdentifier === "900-12" ||
              topSpeedPackage?.frontendIdentifier === "900-24"
            }
            setShowUpgradeOffer={setShowUpgradeOffer}
            priceDifference={
              (topSpeedPackage?.prices.basePrice || 0) / 100 -
              packageDetails.prices.basePrice / 100
            }
            changePackage={changePackage}
          />
        )}
        <Button
          variant="solid"
          tint="yellow"
          size="large"
          fullWidth
          onClick={() => handlePackageSelection(packageDetails)}
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
