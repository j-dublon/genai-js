import { PillButton } from "@react-component-library/ui";
import { Minus, Plus } from "@react-component-library/ui/icons";

import { getAssetPath } from "@/lib/get-asset-path";
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

  // TODO: Next PR - handle eeros in review basket
  const mockEeroSelection = {
    ...eeroSelection,
    totalCount: 1,
    imageURL: getAssetPath("/images/x1_eeros.png"),
    name: "Eero",
    description: "The best eero router",
  };
  const mockEeroProducts = [
    ...eeroProducts.map((product) => ({
      ...product,
      totalCount: 2,
    })),
  ];

  const maximumAvailableEeros = Math.max(
    ...mockEeroProducts.map((product) => product.totalCount),
  );

  const handleIncreaseEeros = () => {
    const nextEero = mockEeroProducts.find(
      (product) => product.totalCount === mockEeroSelection.totalCount + 1,
    );
    if (nextEero) {
      selectEeroProduct(nextEero);
      //TODO: update basket in payload
    }
  };

  const handleDecreaseEeros = () => {
    const previousEero = mockEeroProducts.find(
      (product) => product.totalCount === mockEeroSelection.totalCount - 1,
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
          {`You've got ${mockEeroSelection.totalCount}x eero router${mockEeroSelection.totalCount > 1 ? "s" : ""}`}
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        {mockEeroSelection.imageURL && (
          <div className="aspect-[111/74] w-[110px] bg-ui-grey-300 rounded-md px-2">
            <img
              src={mockEeroSelection.imageURL}
              alt={mockEeroSelection.name}
              className="w-full h-full object-contain"
            />
          </div>
        )}
        <div>
          {mockEeroSelection.description}
          {eeroSelection.price > 0 && (
            <p className="mt-4 md:mt-1">
              <span className="font-semibold">+£{monthlyEeroPrice}</span>
              /month extra
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-4 flex-col md:flex-row">
        {mockEeroSelection.totalCount < maximumAvailableEeros && (
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
        {mockEeroSelection.totalCount !== 1 && (
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
