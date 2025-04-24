"use client";

import { ToggleSwitch, useScrollable } from "@react-component-library/ui";
import { PackageCard } from "@react-component-library/ui/server";
import useJoinFlowStore, {
  Address,
  BroadbandPackage,
} from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useAddress } from "@/hooks/useAddress";

import {
  broadbandPackages,
  MOCK_ADDRESS,
  packageSelectionPageText,
} from "./ChooseYourPackageProps";

export const ChooseYourPackage = () => {
  const router = useRouter();
  const { selectPackage, setServiceAddress } = useJoinFlowStore();
  const [is24Month, setIs24Month] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { isMouseDown, onMouseDown, onMouseUp, onMouseMove } =
    useScrollable(scrollContainerRef);

  const { selectedAddress } = useAddress({
    initialPostcode: "SW1A 2AA",
    autoFetch: true,
  });

  useEffect(() => {
    if (selectedAddress) {
      const addressToSave: Address = {
        line1: selectedAddress.line1 || "",
        line2: selectedAddress.line2 || undefined,
        line3: selectedAddress.line3 || undefined,
        postcode: selectedAddress.postcode || "",
        addressKey: selectedAddress.addressKey || "",
        addressKeyType: selectedAddress.addressKeyType || "NAD",
      };

      setServiceAddress(addressToSave);
    }
  }, [selectedAddress, setServiceAddress]);

  const handlePackageSelection = (packageId: string) => {
    const selectedPackage = broadbandPackages.find(
      (pkg) => pkg.id === packageId,
    );

    if (selectedPackage) {
      selectPackage(selectedPackage);

      if (!selectedAddress) {
        setServiceAddress(MOCK_ADDRESS);
      }

      router.push("/join-flow/personal-details");
    }
  };

  const getTint = (index: number) => {
    const cardColors = ["pink", "blue", "yellow"] as const;
    return cardColors[index % cardColors.length];
  };

  return (
    <section
      className="bg-ui-grey-100 py-10 md:py-20"
      aria-label="Choose Your Package"
    >
      <div className="px-mobile sm:px-tablet lg:px-desktop">
        <div className="flex flex-col gap-4 md:gap-8 pb-6 md:pb-10 mx-auto md:max-w-[1152px]">
          <h2 className="text-[26px] md:text-3xl md:leading-[1.4] font-semibold">
            {packageSelectionPageText.pageTitle}
          </h2>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-center">
            <p className="leading-[1.6] text-xs md:text-sm font-semibold">
              {packageSelectionPageText.pageSubtitle}
            </p>
            <ToggleSwitch
              leftLabel="12-months"
              rightLabel="24-months"
              isOn={is24Month}
              onChange={setIs24Month}
            />
            <p className="text-ui-link underline cursor-pointer leading-[1.4] md:leading-[1.6] text-xs md:text-sm font-medium">
              I need help choosing
            </p>
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
        <div className="flex gap-3 md:gap-6 lg:gap-13 flex-row-reverse md:flex-row pr-mobile sm:pr-tablet md:pr-desktop mx-auto md:max-w-[1152px]">
          {broadbandPackages
            .filter((pkg) => pkg.contractLength === (is24Month ? 24 : 12))
            .map((pkg, index) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onPackageSelect={(pkg: BroadbandPackage) =>
                  handlePackageSelection(pkg.id)
                }
                buttonText={packageSelectionPageText.buttonText}
                tint={getTint(index)}
                featurePackage={pkg.id === "c-900"}
                promotion={pkg.id === "c-900" ? "3 months free" : undefined}
              />
            ))}
        </div>
      </div>
    </section>
  );
};
