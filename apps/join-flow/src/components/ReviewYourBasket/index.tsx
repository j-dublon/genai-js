import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

import { BasketDialog } from "@/components/ReviewYourBasket/components/BasketDialog";
import { SummaryBar } from "@/components/ReviewYourBasket/components/SummaryBar";
import { PlanChangeFormData } from "@/components/ReviewYourBasket/forms/packageChangeForm";
import { usePricingCalculations } from "@/hooks/usePricingCalculations";
import { eeroProducts } from "@/screens/EeroSelection/eeroSelectionProps";
import useJoinFlowStore, {
  EeroProduct,
  StoreSelectedPackage,
} from "@/store/useJoinFlowStore";

export const ReviewYourBasket = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    selectedPackage,
    eeroSelection,
    serviceAddress,
    selectPackage,
    selectEeroProduct,
    resetFlow,
    quoteResponse,
  } = useJoinFlowStore();
  const router = useRouter();

  const storeSelectedPackages = useMemo((): StoreSelectedPackage[] => {
    if (!quoteResponse?.response?.products) return [];

    return quoteResponse.response.products.map((product) => ({
      krakenProductCode: product.krakenProductCode,
      frontendIdentifier: product.frontendIdentifier,
      termMonths: product.termMonths.toString(),
      selectionIdentifier: product.selectionIdentifier,
      installationRequired: product.installationRequired,
      appliedPromotionUUIDs: product.appliedPromotionUUIDs || null,
      prices: {
        basePrice: product.prices.basePrice,
        discountedPrice: product.prices.discountedPrice,
        annualPriceRise:
          product.prices.annualPriceRise
            ?.map((rise) => ({
              price: rise.price,
              date: rise.date,
              id: rise.id || null,
            }))
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            ) || null,
      },
      speeds: {
        download: product.speeds.download,
        upload: product.speeds.upload,
      },
      extras:
        product.extras?.map((extra) => ({
          family: extra.family,
          availableExtras:
            extra.availableExtras?.map((availableExtra) => ({
              code: availableExtra.code,
              name: availableExtra.name,
              description: availableExtra.description,
              price: availableExtra.price,
              selectionIdentifier: availableExtra.selectionIdentifier,
              id: availableExtra.id || null,
            })) || null,
          id: extra.id || null,
        })) || null,
      offers: product.offers || null,
      id: product.id || null,
    }));
  }, [quoteResponse]);

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

    const frontendIdentifier = data.selectedPlanId;
    const newPackage = storeSelectedPackages.find(
      (p) => p.frontendIdentifier === frontendIdentifier,
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

  const pricing = usePricingCalculations(selectedPackage, eeroSelection);

  return (
    <div className="pt-32">
      <SummaryBar
        selectedPackage={selectedPackage}
        predictedTotalNext={pricing.predictedTotalNext}
        openDialog={openDialog}
        isDialogOpen={isDialogOpen}
      />

      <BasketDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        selectedPackage={selectedPackage}
        eeroSelection={eeroSelection}
        availablePackages={storeSelectedPackages}
        eeroProducts={allEeroProducts}
        serviceAddress={serviceAddress}
        onPlanChange={handlePlanChange}
        onEeroSelect={handleEeroSelect}
        onEeroRemove={handleEeroRemove}
        onAddressChange={handleAddressChange}
        monthlyPackagePrice={pricing.monthlyPackagePrice}
        monthlyEeroPrice={pricing.monthlyEeroPrice}
        monthlyTotal={pricing.monthlyTotal}
        predictedTotalNext={pricing.predictedTotalNext}
        predictedTotalFollowing={pricing.predictedTotalFollowing}
      />
    </div>
  );
};
