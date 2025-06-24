import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useMemo } from "react";

import { BasketDialog } from "@/components/ReviewYourBasket/components/BasketDialog";
import { SummaryBar } from "@/components/ReviewYourBasket/components/SummaryBar";
import { usePricingCalculations } from "@/hooks/usePricingCalculations";
import { getAssetPath } from "@/lib/get-asset-path";
import { eeroProducts } from "@/screens/EeroSelection/eeroSelectionProps";
import { generateCICS } from "@/services/helpers/generateCICS";
import { updateBasket } from "@/services/helpers/updateBasket";
import useJoinFlowStore, {
  StoreSelectedPackage,
} from "@/store/useJoinFlowStore";

interface ReviewYourBasketProps {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export const ReviewYourBasket = ({
  isDialogOpen,
  setIsDialogOpen,
}: ReviewYourBasketProps) => {
  const {
    selectedPackage,
    eeroSelection,
    selectPackage,
    resetFlow,
    quoteResponse,
    basket,
    setBasket,
  } = useJoinFlowStore();
  const router = useRouter();

  const storeSelectedPackages = useMemo((): StoreSelectedPackage[] => {
    if (!quoteResponse?.response?.products) return [];

    return quoteResponse.response.products.map((product) => ({
      krakenProductCode: product.krakenProductCode,
      frontendIdentifier: product.frontendIdentifier,
      termMonths: product.termMonths,
      frontendTitle: product.frontendTitle,
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
              family: extra.family,
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
      name: "No additional eero device",
      heading: "No additional Eero needed",
      imageURL: getAssetPath("/images/x1_eeros.png"),
      description: "Just one eero provided by us.",
      totalCount: 1,
      price: 0,
      isSelected: true,
    },
    ...eeroProducts,
  ];

  const handlePlanChange = async (selectedPlanId: string) => {
    if (!selectedPlanId) {
      console.error("No plan ID found in form data");
      return;
    }

    const lastDashIndex = selectedPlanId.lastIndexOf("-");
    if (lastDashIndex === -1) {
      console.error("Invalid plan ID format");
      return;
    }

    const frontendIdentifier = selectedPlanId;
    const newPackage = storeSelectedPackages.find(
      (p) => p.frontendIdentifier === frontendIdentifier,
    );

    if (newPackage) {
      try {
        if (
          newPackage.selectionIdentifier ===
          selectedPackage?.selectionIdentifier
        ) {
          // No need to update the basket as the package is the same
          return;
        }

        if (!basket?.id) {
          console.error("No basket ID found");
          return;
        }

        const result = await updateBasket(basket.id, {
          product: {
            quoteLookup: quoteResponse?.documentID,
            selectionIdentifier: newPackage.selectionIdentifier,
          },
        });

        if (result.error) {
          console.error("Error updating basket:", result.error);
          return;
        }

        if (result.basket) {
          await generateCICS(result.basket, setBasket);
          selectPackage(newPackage);
        }
      } catch (error) {
        console.error("Error updating basket:", error);
      }
    } else {
      console.error("No matching package found");
    }
  };

  const handleAddressChange = () => {
    resetFlow();
    router.push("/join-flow");
  };

  const pricing = usePricingCalculations(selectedPackage, eeroSelection);

  if (!selectedPackage) return null;

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
        availablePackages={storeSelectedPackages}
        eeroProducts={allEeroProducts}
        onPlanChange={handlePlanChange}
        onAddressChange={handleAddressChange}
        pricing={pricing}
      />
    </div>
  );
};
