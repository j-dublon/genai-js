"use client";

import { Button } from "@react-component-library/ui";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { EeroProduct } from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Footer } from "@/components/Footer";
import Stepper from "@/components/Stepper";
import { eeroSelectionSchema } from "@/validation/join-flow-schema";

import {
  eeroChooseProductButtonText,
  eeroContinueButtonText,
  eeroPageContent,
  eeroProducts,
} from "./eeroSelectionProps";

const EeroSelection = () => {
  const router = useRouter();
  const { eeroSelection, setCurrentStep } = useJoinFlowStore();

  // TO DO: might need to come from api eventually, but to be reviewed
  const noAdditionalEero = {
    id: "no-additional-eero",
    name: "No additional eero device",
    description: "Just one eero provided by us.",
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
        useJoinFlowStore.setState((state) => ({
          ...state,
          eeroSelection: noAdditionalEero,
          currentStep: 3,
          _hasHydrated: true,
        }));
      } else {
        eeroSelectionSchema.parse(selectedEero);

        useJoinFlowStore.setState((state) => ({
          ...state,
          eeroSelection: selectedEero,
          currentStep: 3,
          _hasHydrated: true,
        }));
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
      <div className="container mx-auto px-4 py-8">
        <Stepper />

        <div className="max-w-4xl mx-auto">
          <div className="p-8 rounded-md">
            <h1 className="text-2xl font-bold mb-2">{eeroPageContent.title}</h1>
            <p className="mb-6 text-ui-grey-500">
              {eeroPageContent.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {eeroProducts.map((product) => (
                <div
                  key={product.id}
                  className={`border rounded-md p-6 transition-all ${
                    selectedEero?.id === product.id
                      ? "border-2 border-core-yellow bg-ui-grey-100"
                      : "hover:border-ui-grey-300"
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{product.name}</h3>
                      {product.price > 0 ? (
                        <p className="font-semibold">
                          {eeroPageContent.currencySymbol}
                          {product.price.toFixed(2)}
                          {eeroPageContent.monthlyCostSuffix}
                        </p>
                      ) : (
                        <p className="font-semibold">
                          {eeroPageContent.noAdditionalCostText}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="mb-4 text-ui-grey-500">{product.description}</p>

                  <Button
                    onClick={() => handleSelectEero(product)}
                    tint={selectedEero?.id === product.id ? "yellow" : "white"}
                    variant={
                      selectedEero?.id === product.id ? "solid" : "outline"
                    }
                    size="small"
                  >
                    {selectedEero?.id === product.id
                      ? eeroChooseProductButtonText.remove
                      : eeroChooseProductButtonText.choose}
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <Button
                onClick={() => {
                  setCurrentStep(1);
                  router.push("/join-flow/personal-details");
                }}
                tint="white"
                variant="outline"
              >
                {eeroPageContent.backButtonText}
              </Button>

              <Button
                type="submit"
                tint="yellow"
                variant="solid"
                onClick={handleContinue}
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
