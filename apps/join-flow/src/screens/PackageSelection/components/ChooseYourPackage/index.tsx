"use client";

import {
  FullScreenModal,
  LoadingModal,
  ToggleSwitch,
  useScrollable,
} from "@react-component-library/ui";
import useJoinFlowStore, {
  type Offer,
  type StoreSelectedPackage,
} from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useMemo, useRef, useState } from "react";

import { useClearFocus } from "@/hooks/useClearFocus";
import { useLoadingModal } from "@/hooks/useLoadingModal";
import { useTopSpeedPackage } from "@/hooks/useTopSpeedPackage";
import { PackageCard } from "@/screens/PackageSelection/components/PackageCard";
import { createBasket } from "@/services/helpers/createBasket";

import { PackageSelectionDetails } from "../PackageSelectionDetails";
import { SpeedCalculator } from "../SpeedCalculator";
import {
  packageSelectionPageText,
  slides,
  speedCalculatorText,
} from "./ChooseYourPackageProps";

type ModalContent = "speed-calculator" | "package-details";

export const ChooseYourPackage = () => {
  const posthog = usePostHog();
  const router = useRouter();
  const {
    selectPackage,
    quoteResponse,
    setBasket,
    setSoftCreditCheck,
    setIsLoadingModalOpen,
    isLoadingModalOpen,
  } = useJoinFlowStore();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);
  const { loadingModalRef, slidesWithAssetPath } = useLoadingModal({
    isLoadingModalOpen,
    slides,
  });

  const [modalContent, setModalContent] =
    useState<ModalContent>("speed-calculator");
  const [packageDetails, setPackageDetails] =
    useState<StoreSelectedPackage | null>(null);
  const { isMouseDown, onMouseDown, onMouseUp, onMouseMove } =
    useScrollable(scrollContainerRef);

  useClearFocus(modalRef, "close");

  const {
    toggleSwitchLabels,
    pageTitle,
    pageSubtitle,
    packageDetailsModalTitle,
    packageDetailsModalTitleFallback,
  } = packageSelectionPageText;
  const { calculatorModalTitle, title, subtitle, speedCalculatorButtonText } =
    speedCalculatorText;

  const getTint = (index: number) => {
    const cardColors = ["pink", "blue", "yellow"] as const;
    return cardColors[index % cardColors.length];
  };

  const storeSelectedPackages = useMemo((): StoreSelectedPackage[] => {
    if (!quoteResponse?.response?.products) return [];

    return quoteResponse.response.products.map((product) => ({
      krakenProductCode: product.krakenProductCode,
      frontendIdentifier: product.frontendIdentifier,
      frontendTitle: product.frontendTitle,
      termMonths: product.termMonths,
      selectionIdentifier: product.selectionIdentifier,
      installationRequired: product.installationRequired,
      appliedPromotionUUIDs: product.appliedPromotionUUIDs || null,
      prices: {
        broadband: {
          basePrice: product.prices.broadband.basePrice,
          discount: product.prices.broadband.discount,
          customerPriceIncDiscount:
            product.prices.broadband.customerPriceIncDiscount,
          annualPriceRise:
            product.prices.broadband.annualPriceRise?.map((rise) => ({
              price: rise.price,
              date: rise.date,
              id: rise.id || null,
            })) || null,
        },
      },
      speeds: {
        download: product.speeds.download,
        upload: product.speeds.upload,
      },
      availableExtras:
        product.availableExtras?.map((extra) => ({
          family: extra.family,
          extras:
            extra.extras?.map((availableExtra) => ({
              code: availableExtra.code,
              name: availableExtra.name,
              description: availableExtra.description,
              price: availableExtra.price,
              selectionIdentifier: availableExtra.selectionIdentifier,
              family: extra.family,
              id: availableExtra.id || null,
            })) || null,
          id: extra.id || null,
        })) || null,
      offers: (product.offers as Offer[]) || null,
      id: product.id || null,
    }));
  }, [quoteResponse]);

  const hasOnly12MonthPackages = storeSelectedPackages.every(
    (pkg) => pkg.termMonths === 12,
  );
  const hasOnly24MonthPackages = storeSelectedPackages.every(
    (pkg) => pkg.termMonths === 24,
  );
  const hasOnlyOneContractLengthAvailable =
    hasOnly12MonthPackages || hasOnly24MonthPackages;
  const [is24Month, setIs24Month] = useState(!hasOnly12MonthPackages);

  const filteredPackages = storeSelectedPackages
    .filter((pkg) => pkg.termMonths === (is24Month ? 24 : 12))
    .sort((a, b) => a.speeds.download - b.speeds.download);

  const topSpeedPackage = useTopSpeedPackage(filteredPackages);

  if (storeSelectedPackages.length === 0) {
    return null;
  }

  const handleToggleSwitch = (isOn: boolean) => {
    setIs24Month(isOn);

    if (packageDetails) {
      const targetContractLength = isOn ? 24 : 12;
      if (packageDetails.termMonths !== targetContractLength) {
        const matchingPackage = storeSelectedPackages.find(
          (pkg) =>
            pkg.speeds.download === packageDetails.speeds.download &&
            pkg.termMonths === targetContractLength,
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
      ? hasOnlyOneContractLengthAvailable
        ? packageDetailsModalTitleFallback
        : packageDetailsModalTitle
      : calculatorModalTitle;

  const handlePackageSelection = async (
    selectedStorePackage: StoreSelectedPackage,
  ) => {
    posthog.capture("join_flow_selected_choose_your_package");
    if (selectedStorePackage && quoteResponse?.response?.products?.[0]) {
      selectPackage(selectedStorePackage);
      modalRef.current?.close();

      try {
        setIsLoadingModalOpen(true);
        const result = await createBasket({
          product: {
            selectionIdentifier: selectedStorePackage.selectionIdentifier,
            quoteLookup: {
              relationTo: "newSaleQuoteLookups",
              value: quoteResponse.documentID,
            },
          },
        });

        if (result.basket) {
          setBasket(result.basket);
          setSoftCreditCheck({
            latestStatus: null,
            attempts: 0,
          });
          router.push("/join-flow/personal-details");
        } else if (result.error) {
          console.error("Failed to create basket:", result.error);
          setIsLoadingModalOpen(false);
        }
      } catch (error) {
        console.error("Unexpected error creating basket:", error);
        setIsLoadingModalOpen(false);
      }
    }
  };

  const handleOpenModal = (
    content: ModalContent,
    pkg?: StoreSelectedPackage,
  ) => {
    if (pkg) {
      setPackageDetails(pkg);
    }
    setModalContent(content);
    modalRef.current?.showModal();
  };

  const ModalContent = () => {
    switch (modalContent) {
      case "speed-calculator":
        return (
          <SpeedCalculator
            title={title}
            subtitle={subtitle}
            broadbandPackages={storeSelectedPackages}
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
            hasOnlyOneContractLengthAvailable={
              hasOnlyOneContractLengthAvailable
            }
          />
        ) : null;
    }
  };

  return (
    <>
      <LoadingModal
        modalRef={loadingModalRef}
        loading={isLoadingModalOpen}
        slides={slidesWithAssetPath}
      />
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
              {!hasOnly12MonthPackages && !hasOnly24MonthPackages && (
                <>
                  <p className="leading-[1.6] text-xs md:text-sm font-semibold">
                    {pageSubtitle}
                  </p>
                  <ToggleSwitch
                    leftLabel={toggleSwitchLabels.left}
                    rightLabel={toggleSwitchLabels.right}
                    isOn={is24Month}
                    onChange={setIs24Month}
                  />
                </>
              )}
              {filteredPackages.length > 1 && (
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
                //to do: The feature package depends needs to be changed on offer or promotion
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  onPackageSelect={handlePackageSelection}
                  onViewDetails={(pkg: StoreSelectedPackage) =>
                    handleOpenModal("package-details", pkg)
                  }
                  buttonText={packageSelectionPageText.buttonText}
                  tint={getTint(index)}
                  featurePackage={
                    pkg.frontendIdentifier === "900-12" ||
                    pkg.frontendIdentifier === "900-24"
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
          toggle={
            !hasOnlyOneContractLengthAvailable
              ? packageDetailsToggle
              : undefined
          }
        >
          <ModalContent />
        </FullScreenModal>
      </section>
    </>
  );
};
