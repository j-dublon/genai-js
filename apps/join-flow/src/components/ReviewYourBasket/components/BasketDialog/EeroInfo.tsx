import { PillButton } from "@react-component-library/ui";
import { Minus, Plus } from "@react-component-library/ui/icons";
import { useState } from "react";

import type { EeroOption } from "@/lib/createEeroOptions";
import { getCICS } from "@/services/helpers/getCICS";
import { updateBasket } from "@/services/helpers/updateBasket";
import useJoinFlowStore, { type EeroProduct } from "@/store/useJoinFlowStore";

interface EeroInfoProps {
  eeroSelection: EeroProduct;
  monthlyEeroPrice: string;
  eeroProducts: EeroOption[];
  eeroInfoText: {
    title: string;
    addMoreEeros: string;
    removeEeros: string;
  };
}

export const EeroInfo = ({
  eeroSelection,
  monthlyEeroPrice,
  eeroProducts,
  eeroInfoText,
}: EeroInfoProps) => {
  const { title, addMoreEeros, removeEeros } = eeroInfoText;
  const { selectEeroProduct, basket, setBasket } = useJoinFlowStore();
  const [isLoading, setIsLoading] = useState(false);

  if (!eeroSelection) return null;

  const eeroSelectionWithContent = eeroProducts.find(
    (product) => product.code === eeroSelection.code,
  )!;

  const maximumAvailableEeros = Math.max(
    ...eeroProducts.map((product) => product.totalCount),
  );

  const handleEeroChange = async (
    eeroSelection: EeroOption,
  ): Promise<boolean> => {
    if (!basket?.id) {
      console.error("No basket ID found");
      return false;
    }

    setIsLoading(true);

    try {
      const result = await updateBasket(basket.id, {
        product: {
          extras: [
            {
              family: eeroSelection.family,
              selectionIdentifier: eeroSelection.selectionIdentifier,
            },
          ],
        },
      });

      if (result.error) {
        // TODO: Handle error cases
        console.error("Error updating basket:", result.error);
        return false;
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
        return true;
      }
    } catch (error) {
      // TODO: Handle error cases
      console.error("Unexpected error updating basket:", error);
      return false;
    } finally {
      setIsLoading(false);
    }

    return false;
  };

  const handleIncreaseEeros = async () => {
    const nextEero = eeroProducts.find(
      (product) =>
        product.totalCount === eeroSelectionWithContent.totalCount + 1,
    );
    if (nextEero) {
      const success = await handleEeroChange(nextEero);
      if (success) {
        selectEeroProduct(nextEero);
      }
    }
  };

  const handleDecreaseEeros = async () => {
    const previousEero = eeroProducts.find(
      (product) =>
        product.totalCount === eeroSelectionWithContent.totalCount - 1,
    );
    if (previousEero) {
      const success = await handleEeroChange(previousEero);
      if (success) {
        selectEeroProduct(previousEero);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row text-xs md:text-sm leading-[1.6] gap-4 md:gap-1">
        <h3 className="font-normal whitespace-nowrap">{title}</h3>
        <p className="font-semibold">
          {`You've got ${eeroSelectionWithContent.totalCount}x eero router${eeroSelectionWithContent.totalCount > 1 ? "s" : ""}`}
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        {eeroSelectionWithContent.imageURL && (
          <div className="aspect-[111/74] w-[110px] bg-ui-grey-300 rounded-md px-2">
            <img
              src={eeroSelectionWithContent.imageURL}
              alt={eeroSelectionWithContent.heading}
              className="w-full h-full object-contain"
            />
          </div>
        )}
        <div>
          {eeroSelectionWithContent.description}
          {eeroSelection.price > 0 && (
            <p className="mt-4 md:mt-1">
              <span className="font-semibold">+£{monthlyEeroPrice}</span>
              /month extra
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-4 flex-col md:flex-row">
        {eeroSelectionWithContent.totalCount < maximumAvailableEeros && (
          <PillButton
            buttonText={addMoreEeros}
            backgroundColor="black"
            whiteText={true}
            type="button"
            onSelect={handleIncreaseEeros}
            icon={<Plus fill="#FFFFFF" />}
            ariaLabel="Add more eeros"
            className="min-w-[175px]"
            isLoading={isLoading}
          />
        )}
        {eeroSelectionWithContent.totalCount !== 1 && (
          <PillButton
            buttonText={removeEeros}
            backgroundColor="white"
            type="button"
            onSelect={handleDecreaseEeros}
            icon={<Minus fill="#1F1F1F" />}
            ariaLabel="Remove eeros"
            className="min-w-[175px]"
            isLoading={isLoading}
          />
        )}
      </div>
    </>
  );
};
