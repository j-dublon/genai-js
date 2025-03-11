"use client";

import { Button } from "@react-component-library/ui";
import { eeroProducts } from "@store/mockData";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { EeroProduct } from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import DemoStepper from "@/components/molecules/DemoStepper";

const EeroSelection = () => {
  const router = useRouter();
  const { selectEeroProduct, eeroSelection, setCurrentStep } =
    useJoinFlowStore();

  const [selectedEero, setSelectedEero] = useState<EeroProduct | null>(
    eeroSelection || eeroProducts.find((p) => p.id === "no-eero") || null,
  );

  const handleSelectEero = (product: EeroProduct) => {
    const updatedProduct = {
      ...product,
      isSelected: true,
    };
    setSelectedEero(updatedProduct);
  };

  const handleContinue = () => {
    if (selectedEero) {
      selectEeroProduct(selectedEero);
      setCurrentStep(3);
      router.push("/join-flow/one-touch-switching");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <DemoStepper />

      <div className="max-w-4xl mx-auto">
        <div className="p-8 rounded-md">
          <h1 className="text-2xl font-bold mb-2">Choose Your WiFi Router</h1>
          <p className="mb-6 text-ui-grey-500">
            Enhance your broadband with an eero mesh WiFi system for whole-home
            coverage
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
                        £{product.price.toFixed(2)}/month
                      </p>
                    ) : (
                      <p className="font-semibold">No additional cost</p>
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
                    ? "Selected"
                    : "Select this option"}
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
              Back
            </Button>

            <Button
              onClick={handleContinue}
              disabled={!selectedEero}
              tint="yellow"
              variant="solid"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EeroSelection;
