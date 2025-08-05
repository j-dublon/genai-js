import { LoadingModal, useClickOutside } from "@react-component-library/ui";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { useLoadingModal } from "@/hooks/useLoadingModal";
import { usePricingCalculations } from "@/hooks/usePricingCalculations";
import { createEeroOptions } from "@/lib/createEeroOptions";
import { getCICS } from "@/services/helpers/getCICS";
import { updateBasket } from "@/services/helpers/updateBasket";
import useJoinFlowStore, {
  Offer,
  type StoreSelectedPackage,
} from "@/store/useJoinFlowStore";

import { AddressInfo } from "./AddressInfo";
import { basketDialogProps, slides } from "./basketDialogProps";
import { BasketHeader } from "./BasketHeader";
import { EeroInfo } from "./EeroInfo";
import { PackageInfo } from "./PackageInfo";
import { RestartBasket } from "./RestartBasket";
import { Subtotal } from "./Subtotal";

interface BasketDialogProps {
  isOpen: boolean;
  onClose: () => void;
  eeroProductContent: {
    code: string;
    heading: string;
    description: string;
    totalCount: number;
    imageURL: string;
  }[];
  stickyHeight: number;
}

export const BasketDialog = ({
  isOpen,
  onClose,
  eeroProductContent,
  stickyHeight,
}: BasketDialogProps) => {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const [basketIsLoading, setBasketIsLoading] = useState(false);
  const { loadingModalRef, slidesWithAssetPath } = useLoadingModal({
    isLoadingModalOpen: basketIsLoading,
    slides,
  });

  const {
    serviceAddress,
    selectedPackage,
    eeroSelection,
    quoteResponse,
    basket,
    setBasket,
    selectPackage,
  } = useJoinFlowStore();

  const { yourMeshNetwork, addMoreEeros, removeEeros } = basketDialogProps;

  useClickOutside(modalRef, isOpen, onClose);

  const availablePackages = useMemo((): StoreSelectedPackage[] => {
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
        broadbandAndCurrentExtras: {
          basePrice: product.prices.broadbandAndCurrentExtras.basePrice,
          discount: product.prices.broadbandAndCurrentExtras.discount,
          customerPriceIncDiscount:
            product.prices.broadbandAndCurrentExtras.customerPriceIncDiscount,
          annualPriceRise:
            product.prices.broadbandAndCurrentExtras.annualPriceRise
              ?.map((rise) => ({
                price: rise.price,
                date: rise.date,
                id: rise.id || null,
              }))
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime(),
              ) || null,
        },
        currentExtras: {
          basePrice: product.prices.currentExtras.basePrice,
          discount: product.prices.currentExtras.discount,
          customerPriceIncDiscount:
            product.prices.currentExtras.customerPriceIncDiscount,
        },
        broadband: {
          basePrice: product.prices.broadband.basePrice,
          discount: product.prices.broadband.discount,
          customerPriceIncDiscount:
            product.prices.broadband.customerPriceIncDiscount,
          annualPriceRise:
            product.prices.broadband.annualPriceRise
              ?.map((rise) => ({
                price: rise.price,
                date: rise.date,
                id: rise.id || null,
              }))
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime(),
              ) || null,
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

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const eeroProducts = createEeroOptions(
    selectedPackage?.availableExtras,
    eeroProductContent,
  );

  const pricing = usePricingCalculations(selectedPackage, eeroSelection);

  if (!isOpen) return null;

  const onPlanChange = async (selectedPlanId: string) => {
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
    const newPackage = availablePackages.find(
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
            quoteLookup: {
              relationTo: "newSaleQuoteLookups",
              value: quoteResponse?.documentID || "",
            },
            selectionIdentifier: newPackage.selectionIdentifier,
          },
        });

        if (result.error) {
          console.error("Error updating basket:", result.error);
          return;
        }

        if (result.basket) {
          let contractInformation = "";
          let contractSummary = "";
          const response = await getCICS(basket.id);
          if (response.success === true) {
            contractInformation = response.data.contractInformation;
            contractSummary = response.data.contractSummary;
          }
          setBasket({
            ...result.basket,
            cics: {
              informationHref: contractInformation,
              summaryHref: contractSummary,
            },
          });
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
    setBasketIsLoading(true);
    router.push("/join-flow");
  };

  return (
    <>
      <div className="fixed inset-0 bg-[rgba(31,31,31,0.4)]" />
      <div className="z-40">
        <div
          className="fixed inset-x-0 bottom-0 flex items-start justify-center z-40 overflow-y-auto"
          style={{
            top: `${stickyHeight}px`,
          }}
        >
          <div
            ref={modalRef}
            className="relative w-full md:w-[80%] h-auto max-w-[1143px] mx-auto mb-8 md:rounded-b-[50px] bg-ui-grey-100 md:bg-core-white"
          >
            <div className="py-3 px-5 md:py-10">
              <div className="w-full max-w-[713px] mx-auto flex flex-col gap-6 md:gap-16">
                <BasketHeader
                  onClose={onClose}
                  title={basketDialogProps.title}
                />
                <div
                  id="review-your-basket-content"
                  className="bg-core-white rounded-lg p-4 md:p-0"
                >
                  <div className="border md:border-none border-ui-grey-300 rounded-lg p-4 md:p-0 flex flex-col gap-6 md:gap-8">
                    {serviceAddress && (
                      <AddressInfo
                        title={basketDialogProps.yourAddress}
                        address={serviceAddress}
                      />
                    )}
                    <hr className="border-ui-grey-300 bg-ui-grey-300 md:border-ui-grey-400 md:bg-ui-grey-400" />
                    {selectedPackage && (
                      <PackageInfo
                        changePlanButtonText={basketDialogProps.changePlan}
                        broadbandPlanText={basketDialogProps.broadbandPlan}
                        planDescriptionText={basketDialogProps.fullFiber}
                        availablePackages={availablePackages}
                        onPlanChange={onPlanChange}
                        selectedPackage={selectedPackage}
                        setBasketIsLoading={setBasketIsLoading}
                      />
                    )}
                    <hr className="border-ui-grey-300 bg-ui-grey-300 md:border-ui-grey-400 md:bg-ui-grey-400" />
                    {eeroSelection && selectedPackage && (
                      <>
                        <EeroInfo
                          monthlyEeroPrice={pricing.monthlyEeroPrice}
                          eeroSelection={eeroSelection}
                          eeroProducts={eeroProducts}
                          eeroInfoText={{
                            title: yourMeshNetwork,
                            addMoreEeros,
                            removeEeros,
                          }}
                          setBasketIsLoading={setBasketIsLoading}
                        />
                        <hr className="border-ui-grey-300 bg-ui-grey-300 md:border-ui-grey-400 md:bg-ui-grey-400" />
                        <Subtotal
                          pricing={pricing}
                          selectedPackage={selectedPackage}
                          eeroSelection={eeroSelection}
                          eeroProducts={eeroProducts}
                          pricingText={{
                            title: basketDialogProps.yourSubtotal,
                            subtitle: basketDialogProps.yourTotal,
                            fullFiber: basketDialogProps.fullFiber,
                            perMonth: basketDialogProps.perMonth,
                            eeroRouters: basketDialogProps.eeroRouters,
                            contractText: basketDialogProps.contractText,
                            installationText:
                              basketDialogProps.installationText,
                            discountPeriodText:
                              basketDialogProps.discountPeriodText,
                            afterText: basketDialogProps.afterText,
                            savingText: basketDialogProps.savingText,
                            promotionPillText:
                              basketDialogProps.promotionPillText,
                          }}
                        />
                      </>
                    )}
                    <RestartBasket
                      subtitle={basketDialogProps.addressWrong}
                      restartText={basketDialogProps.startAgain}
                      warningText={basketDialogProps.addressChangeWarning}
                      onRestart={handleAddressChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <LoadingModal
            slides={slidesWithAssetPath}
            loading={basketIsLoading}
            modalRef={loadingModalRef}
          />
        </div>
      </div>
    </>
  );
};
