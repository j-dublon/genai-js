import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { BasketDialog } from "@/components/ReviewYourBasket/components/BasketDialog";
import { SummaryBar } from "@/components/ReviewYourBasket/components/SummaryBar";
import { PlanChangeFormData } from "@/components/ReviewYourBasket/forms/packageChangeForm";
import { eeroProducts } from "@/screens/EeroSelection/eeroSelectionProps";
import { broadbandPackages } from "@/screens/PackageSelection/components/ChooseYourPackage/ChooseYourPackageProps";
import useJoinFlowStore, { EeroProduct } from "@/store/useJoinFlowStore";

export const ReviewYourBasket = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    selectedPackage,
    eeroSelection,
    serviceAddress,
    selectPackage,
    selectEeroProduct,
    resetFlow,
  } = useJoinFlowStore();
  const router = useRouter();

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const allEeroProducts = [
    {
      id: "no-additional-eero",
      name: "Standard eero",
      description: "One eero router included with your package",
      price: 0,
      isSelected: false,
    },
    ...eeroProducts,
  ];

  const handlePlanChange = (data: PlanChangeFormData) => {
    if (!data.selectedPlanId) {
      console.error("No plan ID found in form data");
      return;
    }

    const lastDashIndex = data.selectedPlanId.lastIndexOf("-");
    if (lastDashIndex === -1) {
      console.error("Invalid plan ID format");
      return;
    }

    const planId = data.selectedPlanId.substring(0, lastDashIndex);
    const contractLength = parseInt(
      data.selectedPlanId.substring(lastDashIndex + 1),
    );

    const newPackage = broadbandPackages.find(
      (p) => p.id === planId && p.contractLength === contractLength,
    );

    if (newPackage) {
      selectPackage(newPackage);
    } else {
      console.error("No matching package found");
    }
  };

  const handleEeroSelect = (product: EeroProduct) => {
    selectEeroProduct(product);
  };

  const handleEeroRemove = () => {
    const noEero = allEeroProducts.find((p) => p.id === "no-additional-eero");
    if (noEero) {
      selectEeroProduct(noEero);
    }
  };

  const handleAddressChange = () => {
    resetFlow();
    router.push("/join-flow");
  };

  // Calculate pricing information to pass to BasketDialog
  const monthlyPackagePrice = selectedPackage?.price.monthly || 0;
  const monthlyEeroPrice = eeroSelection ? eeroSelection.price : 0;
  const monthlyTotal = monthlyPackagePrice + monthlyEeroPrice;
  const predictedTotalNextYear =
    monthlyTotal + (selectedPackage?.priceIncrease.nextYearIncrease || 0);
  const predictedTotalFollowingYear =
    monthlyTotal + (selectedPackage?.priceIncrease.followingYearIncrease || 0);

  return (
    <div className="pt-32">
      <SummaryBar
        selectedPackage={selectedPackage}
        predictedTotalNextYear={predictedTotalNextYear}
        openDialog={openDialog}
        isDialogOpen={isDialogOpen}
      />

      <BasketDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        selectedPackage={selectedPackage}
        eeroSelection={eeroSelection}
        availablePackages={broadbandPackages}
        eeroProducts={allEeroProducts}
        serviceAddress={serviceAddress}
        onPlanChange={handlePlanChange}
        onEeroSelect={handleEeroSelect}
        onEeroRemove={handleEeroRemove}
        onAddressChange={handleAddressChange}
        monthlyPackagePrice={monthlyPackagePrice}
        monthlyEeroPrice={monthlyEeroPrice}
        monthlyTotal={monthlyTotal}
        predictedTotalNextYear={predictedTotalNextYear}
        predictedTotalFollowingYear={predictedTotalFollowingYear}
      />
    </div>
  );
};
