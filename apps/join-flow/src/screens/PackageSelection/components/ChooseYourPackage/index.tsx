"use client";

import { FullScreenModal } from "@react-component-library/ui";
import {
  PackageCard,
  ToggleSwitch,
  useScrollable,
} from "@react-component-library/ui";
import useJoinFlowStore, { BroadbandPackage } from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { useClearFocus } from "@/hooks/useClearFocus";
import { useTopSpeedPackage } from "@/hooks/useTopSpeedPackage";
import { createBasket } from "@/services/helpers/createBasket";

import { PackageSelectionDetails } from "../PackageSelectionDetails";
import { SpeedCalculator } from "../SpeedCalculator";
import {
  broadbandPackages,
  packageSelectionPageText,
  speedCalculatorText,
} from "./ChooseYourPackageProps";

type ModalContent = "speed-calculator" | "package-details";

export const ChooseYourPackage = () => {
  const router = useRouter();
  const { selectPackage, quoteResponse, setBasket } = useJoinFlowStore();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  const [is24Month, setIs24Month] = useState(true);
  const [modalContent, setModalContent] =
    useState<ModalContent>("speed-calculator");
  const [packageDetails, setPackageDetails] = useState<BroadbandPackage | null>(
    null,
  );
  const { isMouseDown, onMouseDown, onMouseUp, onMouseMove } =
    useScrollable(scrollContainerRef);

  const {
    toggleSwitchLabels,
    pageTitle,
    pageSubtitle,
    packageDetailsModalTitle,
    promotionText,
    promotionActive,
  } = packageSelectionPageText;
  const { calculatorModalTitle, title, subtitle, speedCalculatorButtonText } =
    speedCalculatorText;

  const filteredPackages = broadbandPackages.filter(
    (pkg) => pkg.contractLength === (is24Month ? 24 : 12),
  );

  const topSpeedPackage = useTopSpeedPackage(filteredPackages);

  const handleToggleSwitch = (isOn: boolean) => {
    setIs24Month(isOn);

    if (packageDetails) {
      const targetContractLength = isOn ? 24 : 12;
      if (packageDetails.contractLength !== targetContractLength) {
        // Find the same package with the correct contract length
        const matchingPackage = broadbandPackages.find(
          (pkg) =>
            pkg.name === packageDetails.name &&
            pkg.contractLength === targetContractLength,
        );
        if (matchingPackage) {
          setPackageDetails(matchingPackage);
        }
      }
    }
  };

  const packageDetailsToggle = {
    isOn: is24Month,
    onChange: handleToggleSwitch,
    leftLabel: toggleSwitchLabels.left,
    rightLabel: toggleSwitchLabels.right,
  };

  const modalTitle =
    modalContent === "package-details"
      ? packageDetailsModalTitle
      : calculatorModalTitle;

  const handlePackageSelection = async (packageId: string) => {
    const selectedPackage = broadbandPackages.find(
      (pkg) => pkg.id === packageId,
    );

    if (selectedPackage && quoteResponse?.response?.products?.[0]) {
      selectPackage(selectedPackage);

      try {
        const result = await createBasket({
          product: {
            selectionIdentifier:
              quoteResponse.response.products[0].selectionIdentifier,
            quoteLookup: quoteResponse.documentID,
          },
        });

        if (result.basket) {
          setBasket(result.basket);
          router.push("/join-flow/personal-details");
        } else if (result.error) {
          console.error("Failed to create basket:", result.error);
        }
      } catch (error) {
        console.error("Unexpected error creating basket:", error);
      }
    }
  };

  const getTint = (index: number) => {
    const cardColors = ["pink", "blue", "yellow"] as const;
    return cardColors[index % cardColors.length];
  };

  useClearFocus(modalRef, "close");

  const handleOpenModal = (content: ModalContent, pkg?: BroadbandPackage) => {
    if (pkg) {
      setPackageDetails(pkg);
    }
    setModalContent(content);
    modalRef.current?.showModal();
  };

  const getModalContent = () => {
    switch (modalContent) {
      case "speed-calculator":
        return (
          <SpeedCalculator
            title={title}
            subtitle={subtitle}
            broadbandPackages={broadbandPackages}
            onShowPackageDetails={(pkg) => {
              setPackageDetails(pkg);
              setModalContent("package-details");
            }}
          />
        );
      case "package-details":
        return packageDetails ? (
          <PackageSelectionDetails
            packageDetails={packageDetails}
            handlePackageSelection={handlePackageSelection}
            topSpeedPackage={topSpeedPackage}
            toggle={packageDetailsToggle}
            changePackage={setPackageDetails}
          />
        ) : null;
    }
  };

  return (
    <section
      className="bg-ui-grey-100 py-10 md:py-20"
      aria-label="Choose Your Package"
    >
      <div className="px-mobile sm:px-tablet lg:px-desktop">
        <div className="flex flex-col gap-4 md:gap-8 pb-6 md:pb-10 mx-auto md:max-w-[1152px]">
          <h2 className="text-[26px] md:text-3xl md:leading-[1.4] font-semibold">
            {pageTitle}
          </h2>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-center">
            <p className="leading-[1.6] text-xs md:text-sm font-semibold">
              {pageSubtitle}
            </p>
            <ToggleSwitch
              leftLabel={toggleSwitchLabels.left}
              rightLabel={toggleSwitchLabels.right}
              isOn={is24Month}
              onChange={setIs24Month}
            />
            {filteredPackages.filter(
              (pkg) => pkg.contractLength === (is24Month ? 24 : 12),
            ).length > 1 && (
              <button
                onClick={() => handleOpenModal("speed-calculator")}
                className="w-fit text-ui-link underline cursor-pointer leading-[1.4] md:leading-[1.6] text-xs md:text-sm font-medium bg-transparent border-0 p-0"
                aria-label="Open speed calculator modal"
              >
                {speedCalculatorButtonText}
              </button>
            )}
          </div>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className={`flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pl-mobile sm:pl-tablet lg:px-desktop ${isMouseDown ? "cursor-grabbing" : "cursor-grab"}`}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        <div className="mx-auto md:max-w-[1152px] w-full">
          <div className="flex gap-3 md:gap-6 lg:gap-13 flex-row-reverse md:flex-row justify-end md:justify-start pr-mobile sm:pr-tablet md:pr-desktop">
            <div className="pr-3 md:hidden block" />
            {filteredPackages.map((pkg, index) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onPackageSelect={(pkg: BroadbandPackage) =>
                  handlePackageSelection(pkg.id)
                }
                onViewDetails={(pkg: BroadbandPackage) =>
                  handleOpenModal("package-details", pkg)
                }
                buttonText={packageSelectionPageText.buttonText}
                tint={getTint(index)}
                featurePackage={pkg.id === "c-900"}
                promotion={
                  promotionActive && pkg.id === "c-900"
                    ? promotionText
                    : undefined
                }
              />
            ))}
            <div className="md:pr-6 hidden md:block" />
          </div>
        </div>
      </div>
      <FullScreenModal
        title={modalTitle}
        modalRef={modalRef}
        toggle={packageDetailsToggle}
      >
        {getModalContent()}
      </FullScreenModal>
    </section>
  );
};
