"use client";

import {
  Button,
  ColorPill,
  InsertLinksOrButtons,
  LoadingModal,
  useClickOutside,
} from "@react-component-library/ui";
import { TickWithCircle } from "@react-component-library/ui/icons";
import useJoinFlowStore, { EeroProduct } from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useEffect, useRef, useState } from "react";

import { Footer } from "@/components/Footer";
import { StepNavigationWithBasket } from "@/components/StepNavigationWithBasket";
import { useLoadingModal } from "@/hooks/useLoadingModal";
import { PILL_FADE_OUT_DELAY, PILL_HIDE_DELAY } from "@/lib/constants";
import { createEeroOptions, type EeroOption } from "@/lib/createEeroOptions";
import { updateBasket } from "@/services/helpers/updateBasket";
import { eeroSelectionSchema } from "@/validation/join-flow-schema";

import { EeroCard } from "./components/EeroCard";
import { EeroSelectionHelpModal } from "./components/EeroSelectionHelpModal";
import {
  eeroChooseProductButtonText,
  eeroContinueButtonText,
  eeroPageContent,
  eeroProducts,
  slides,
} from "./eeroSelectionProps";

const INCLUDED_EERO_CODE = "EERO_MESH_ROUTER_X1";

const EeroSelection = () => {
  const router = useRouter();
  const {
    eeroSelection,
    setCurrentStep,
    selectEeroProduct,
    basket,
    setBasket,
    selectedPackage,
    isLoadingModalOpen,
    setIsLoadingModalOpen,
  } = useJoinFlowStore();

  const {
    backButtonText,
    title,
    description,
    linkText,
    infoModalTitle,
    infoModalButtonText,
    infoModalSubtitle,
    infoModalContent,
    infoModalImage,
  } = eeroPageContent;

  const posthog = usePostHog();

  const infoModalRef = useRef<HTMLDialogElement>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const closeFunction = () => {
    if (infoModalRef.current) {
      infoModalRef.current.close();
      setIsInfoModalOpen(false);
    }
  };

  useClickOutside(infoModalRef, isInfoModalOpen, closeFunction);

  const { loadingModalRef, slidesWithAssetPath } = useLoadingModal({
    isLoadingModalOpen,
    slides,
  });

  const eeroOptions = createEeroOptions(
    selectedPackage?.availableExtras || [],
    eeroProducts,
  );
  const noAdditionalEeroOption = eeroOptions.find(
    (option) => option.totalCount === 1,
  )!;
  const additionalEeroOptions = eeroOptions.filter(
    (option) => option.totalCount > 1,
  );

  const [selectedEero, setSelectedEero] = useState<EeroProduct>(
    eeroSelection || noAdditionalEeroOption,
  );

  const [showPill, setShowPill] = useState<boolean>(true);
  const [fadeOut, setFadeOut] = useState<boolean>(false);

  const handleSelectEero = (eero: EeroOption) => {
    // If the product is already selected, reset to noEero - i.e. untoggle the additional eero
    if (selectedEero?.selectionIdentifier === eero.selectionIdentifier) {
      setSelectedEero(noAdditionalEeroOption);
    } else {
      setSelectedEero(eero);
    }
  };

  const handleContinue = async () => {
    posthog.capture("join_flow_selected_eero_router");
    if (!basket) {
      console.error("Basket not found"); // TODO: This shouldn't be possible but needs handling
      return;
    }

    try {
      if (
        !basket.product?.extras?.find(
          (extra) =>
            extra.selectionIdentifier === selectedEero.selectionIdentifier,
        ) &&
        !(
          selectedEero.code === INCLUDED_EERO_CODE &&
          basket.product?.extras?.length === 0
        )
      ) {
        // Update basket with selected eero if a different selection has been made
        eeroSelectionSchema.parse(selectedEero);
        setIsLoadingModalOpen(true);
        const result = await updateBasket(basket.id, {
          product: {
            extras: [
              {
                family: selectedEero.family,
                selectionIdentifier: selectedEero.selectionIdentifier,
              },
            ],
          },
        });

        if (result.error) {
          // TODO: Error handling
          console.error("Error updating basket:", result.error);
          setIsLoadingModalOpen(false);
          return;
        }

        if (result.basket) {
          setBasket(result.basket);
        }
      }

      setCurrentStep(3);
      selectEeroProduct(selectedEero);
      router.push("/join-flow/one-touch-switching");
    } catch (error) {
      console.error("Error in handleContinue:", error);
      setIsLoadingModalOpen(false);
    }
  };

  useEffect(() => {
    setShowPill(true);
    setFadeOut(false);

    const fadeOuttimer = setTimeout(
      () => setFadeOut(true),
      PILL_FADE_OUT_DELAY,
    );
    const hidePillTimer = setTimeout(() => setShowPill(false), PILL_HIDE_DELAY);

    return () => {
      clearTimeout(fadeOuttimer);
      clearTimeout(hidePillTimer);
    };
  }, []);

  return (
    <>
      <StepNavigationWithBasket step={2} />
      <LoadingModal
        modalRef={loadingModalRef}
        slides={slidesWithAssetPath}
        loading={isLoadingModalOpen}
      />
      <div className="container px-4 pb-8 md:pt-12 mx-auto">
        <div className="max-w-[1183px] mx-auto">
          {showPill && (
            <div className="flex justify-center mb-6">
              <ColorPill
                colorPillText="Your info has been saved"
                backgroundColor="offer-gradient"
                size="small"
                icon={
                  <TickWithCircle
                    minY={-1}
                    height={24}
                    circleFill="none"
                    tickFill="black"
                  />
                }
                className={`px-4 pt-2 pb-2.5 transition-opacity duration-1000 ${fadeOut ? "opacity-0" : "opacity-100"}`}
              />
            </div>
          )}

          <div className="px-5 md:px-8 rounded-md">
            <div className="flex flex-col items-center">
              <h1 className="mb-4 text-[26px] md:text-3xl font-semibold text-center [text-wrap:balance]">
                {title}
              </h1>
              <p className="text-xs md:text-md mb-6 text-center max-w-[880px]">
                <InsertLinksOrButtons
                  text={description[0]}
                  items={[
                    {
                      onClick: () => {
                        infoModalRef.current?.showModal();
                        setIsInfoModalOpen(true);
                      },
                      searchText: linkText,
                      openInNewTab: true,
                    },
                  ]}
                />{" "}
                <span className="font-medium">{description[1]}</span>{" "}
                {description[2]}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 mb-8 md:gap-19 md:grid-cols-2">
              {additionalEeroOptions.map((eero) => (
                <EeroCard
                  key={eero.selectionIdentifier}
                  eero={eero}
                  isActive={
                    selectedEero?.selectionIdentifier ===
                    eero.selectionIdentifier
                  }
                  eeroChooseProductButtonText={eeroChooseProductButtonText}
                  handleSelectEero={handleSelectEero}
                />
              ))}
            </div>
            <div className="flex flex-col w-full mt-8 space-y-4 md:space-y-0 md:flex-row md:justify-between">
              <Button
                onClick={() => {
                  setCurrentStep(1);
                  router.push("/join-flow/personal-details");
                }}
                tint="white"
                variant="outline"
                className="w-full md:w-fit"
              >
                {backButtonText}
              </Button>

              <Button
                type="submit"
                name="Continue"
                tint="yellow"
                variant="solid"
                onClick={handleContinue}
                className="w-full md:w-fit"
              >
                {selectedEero && selectedEero.code === INCLUDED_EERO_CODE
                  ? eeroContinueButtonText.continueButtonText
                  : eeroContinueButtonText.next}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <EeroSelectionHelpModal
        title={infoModalTitle}
        buttonText={infoModalButtonText}
        modalRef={infoModalRef}
        subtitle={infoModalSubtitle}
        content={infoModalContent}
        image={infoModalImage}
      />
    </>
  );
};

export default EeroSelection;
