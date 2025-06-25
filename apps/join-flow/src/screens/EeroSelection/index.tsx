"use client";

import { Button } from "@react-component-library/ui";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { EeroProduct } from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { EeroCard } from "@/components/EeroCard";
import { Footer } from "@/components/Footer";
import { StepNavigationWithBasket } from "@/components/StepNavigationWithBasket";
import { getAssetPath } from "@/lib/get-asset-path";
import { eeroSelectionSchema } from "@/validation/join-flow-schema";

import {
  eeroChooseProductButtonText,
  eeroContinueButtonText,
  eeroPageContent,
  eeroProducts,
} from "./eeroSelectionProps";

const EeroSelection = () => {
  const router = useRouter();
  const { eeroSelection, setCurrentStep, selectEeroProduct } =
    useJoinFlowStore();

  // TO DO: might need to come from api eventually, but to be reviewed
  const noAdditionalEero = {
    id: "no-additional-eero",
    name: "No additional eero device",
    heading: "No additional Eero needed",
    imageURL: getAssetPath("/images/x1_eeros.png"),
    description: "Just one eero provided by us.",
    totalCount: 1,
    price: 0,
    isSelected: true,
  };

  const [selectedEero, setSelectedEero] = useState<EeroProduct | null>(
    eeroSelection ||
      eeroProducts.find((p) => p.id === "no-eero") ||
      noAdditionalEero,
  );

  const handleSelectEero = (product: EeroProduct) => {
    // If the product is already selected, reset to noEero
    if (selectedEero?.id === product.id) {
      setSelectedEero(noAdditionalEero);
    } else {
      const updatedProduct = {
        ...product,
        isSelected: true,
      };
      setSelectedEero(updatedProduct);
    }
  };

  const handleContinue = () => {
    try {
      if (!selectedEero) {
        selectEeroProduct(noAdditionalEero);
        setCurrentStep(3);
      } else {
        eeroSelectionSchema.parse(selectedEero);
        selectEeroProduct(selectedEero);
        setCurrentStep(3);
      }

      // Add a small delay to ensure store updates before navigation
      setTimeout(() => {
        router.replace("/join-flow/one-touch-switching");
      }, 100);
    } catch (error) {
      console.error("Error in handleContinue:", error);
    }
  };

  return (
    <>
      <StepNavigationWithBasket step={2} />
      <div className="container px-4 pb-8 lg:pt-16 mx-auto">
        <div className="max-w-[1183px] mx-auto mt-16">
          <div className="p-5 md:p-8 rounded-md">
            <div className="flex flex-col items-center">
              <h1 className="mb-4 text-[26px] md:text-3xl font-semibold text-center [text-wrap:balance]">
                {eeroPageContent.title}
              </h1>
              <p className="text-xs md:text-md mb-6 text-center max-w-[880px]">
                {eeroPageContent.description}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 mb-8 md:gap-19 md:grid-cols-2">
              {eeroProducts.map((product) => (
                <EeroCard
                  key={product.id}
                  product={product}
                  isActive={selectedEero?.id === product.id}
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
                {eeroPageContent.backButtonText}
              </Button>

              <Button
                type="submit"
                name="Continue"
                tint="yellow"
                variant="solid"
                onClick={handleContinue}
                className="w-full md:w-fit"
              >
                {selectedEero && selectedEero.id === "no-additional-eero"
                  ? eeroContinueButtonText.continueButtonText
                  : eeroContinueButtonText.next}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EeroSelection;
