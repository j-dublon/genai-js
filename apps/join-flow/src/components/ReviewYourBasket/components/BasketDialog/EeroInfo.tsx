import { PillButton } from "@react-component-library/ui";
import { Minus, Plus } from "@react-component-library/ui/icons";

import useJoinFlowStore, { EeroProduct } from "@/store/useJoinFlowStore";

interface EeroInfoProps {
  eeroSelection: EeroProduct;
  monthlyEeroPrice: number;
  eeroProducts: EeroProduct[];
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
  const { selectEeroProduct } = useJoinFlowStore();

  if (!eeroSelection) return null;

  const maximumAvailableEeros = Math.max(
    ...eeroProducts.map((product) => product.totalCount),
  );

  const handleIncreaseEeros = () => {
    const nextEero = eeroProducts.find(
      (product) => product.totalCount === eeroSelection.totalCount + 1,
    );
    if (nextEero) {
      selectEeroProduct(nextEero);
      //TODO: update basket in payload
    }
  };

  const handleDecreaseEeros = () => {
    const previousEero = eeroProducts.find(
      (product) => product.totalCount === eeroSelection.totalCount - 1,
    );
    if (previousEero) {
      selectEeroProduct(previousEero);
      //TODO: update basket in payload
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row text-xs md:text-sm leading-[1.6] gap-4 md:gap-1">
        <h3 className="font-normal whitespace-nowrap">{title}</h3>
        <p className="font-semibold">
          {`You've got ${eeroSelection.totalCount}x eero router${eeroSelection.totalCount > 1 ? "s" : ""}`}
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        {eeroSelection.imageURL && (
          <div className="aspect-[111/74] w-[110px] bg-ui-grey-300 rounded-md px-2">
            <img
              src={eeroSelection.imageURL}
              alt={eeroSelection.name}
              className="w-full h-full object-contain"
            />
          </div>
        )}
        <div>
          {eeroSelection.description}
          {eeroSelection.price > 0 && (
            <p className="mt-4 md:mt-1">
              <span className="font-semibold">+£{monthlyEeroPrice}</span>
              /month extra
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-4 flex-col md:flex-row">
        {eeroSelection.totalCount < maximumAvailableEeros && (
          <PillButton
            buttonText={addMoreEeros}
            backgroundColor="black"
            whiteText={true}
            type="button"
            onSelect={handleIncreaseEeros}
            icon={<Plus fill="#FFFFFF" />}
            ariaLabel="Add more eeros"
            className="min-w-[175px]"
          />
        )}
        {eeroSelection.totalCount !== 1 && (
          <PillButton
            buttonText={removeEeros}
            backgroundColor="white"
            type="button"
            onSelect={handleDecreaseEeros}
            icon={<Minus fill="#1F1F1F" />}
            ariaLabel="Remove eeros"
            className="min-w-[175px]"
          />
        )}
      </div>
    </>
  );
};
