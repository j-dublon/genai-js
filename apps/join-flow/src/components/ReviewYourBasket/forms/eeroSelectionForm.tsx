import { Button } from "@react-component-library/ui";
import React from "react";

import { paymentDetailsText } from "@/components/ReviewYourBasket/ReviewYourBasketProps";
import { EeroProduct } from "@/store/useJoinFlowStore";

interface EeroSelectionFormProps {
  eeroProducts: EeroProduct[];
  currentSelection: EeroProduct | null;
  onSelect: (product: EeroProduct) => void;
  onCancel: () => void;
}

const EeroSelectionForm = ({
  eeroProducts,
  currentSelection,
  onSelect,
  onCancel,
}: EeroSelectionFormProps) => {
  const shouldShowProduct = (product: EeroProduct) => {
    if (currentSelection?.id === "eero-6-plus" && product.id === "eero-6") {
      return false;
    }

    if (currentSelection?.id === "eero-6" && product.id === "eero-6") {
      return false;
    }

    return true;
  };

  return (
    <div className="mt-4 mb-6">
      <div className="mb-4 p-5 border border-ui-grey-300 rounded-md bg-ui-grey-100">
        <h3 className="font-medium mb-3 text-core-black">
          {paymentDetailsText.chooseEeroSetup}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {eeroProducts.map((product) => {
            if (!shouldShowProduct(product)) {
              return null;
            }

            return (
              <div
                key={product.id}
                className="border rounded-md p-4 cursor-pointer hover:bg-ui-grey-50 transition-all"
                onClick={() => onSelect(product)}
              >
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-sm text-ui-grey-500">
                  {product.description}
                </p>
                <p className="text-sm font-medium mt-2">
                  £{product.price}
                  {paymentDetailsText.perMonth}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" size="small" type="button" onClick={onCancel}>
          {paymentDetailsText.cancel}
        </Button>
      </div>
    </div>
  );
};

export default EeroSelectionForm;
