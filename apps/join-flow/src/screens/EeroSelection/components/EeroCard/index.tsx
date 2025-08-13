import { Button, ColorPill } from "@react-component-library/ui";
import { Tick } from "@react-component-library/ui/icons";

import { convertPenceToPounds } from "@/hooks/usePricingCalculations";
import type { EeroOption } from "@/lib/createEeroOptions";

export type EeroCardProps = {
  eero: EeroOption;
  isActive: boolean;
  eeroChooseProductButtonText: {
    remove: string;
    choose: string;
  };
  handleSelectEero: (product: EeroOption) => void;
  helpButton: { onHelpClick: () => void; buttonText: string };
};

const ProductImageAndInfo = ({ product }: { product: EeroOption }) => (
  <div className="flex flex-col">
    {product.imageURL && (
      <div className="w-full aspect-[555/256]">
        <img
          src={product.imageURL}
          className="object-contain w-full h-full"
          alt="Eero router image."
        />
      </div>
    )}
    <div className="flex flex-col justify-between w-full mt-8 mb-2 space-y-2md:flex-row">
      <h3 className="font-semibold text-core-black text-sm md:text-md leading-[1.6] mb-2 md:mb-3.5">
        {product.heading}
      </h3>
      {product.totalCount && (
        <ColorPill
          backgroundColor="pink"
          size="extraSmall"
          colorPillText={`${product.totalCount} in total`}
          className="whitespace-nowrap h-fit"
        />
      )}
    </div>
  </div>
);

const PricingInfo = ({
  product,
  isActive,
}: {
  product: EeroOption;
  isActive: boolean;
}) => {
  const price = convertPenceToPounds(product.price);
  const numberOfEeros = product.totalCount - 1;
  return (
    <>
      <div className="flex flex-row items-baseline justify-between md:flex-col">
        {product.totalCount && (
          <h2 className="text-sm font-semibold leading-[1.6]">
            {isActive ? (
              <span className="flex flex-row">
                <div className="pt-1">
                  <Tick height={14} width={17} />
                </div>
                <span className="ml-1">
                  {numberOfEeros} extra eero
                  {numberOfEeros > 1 ? "s" : ""} selected
                </span>
              </span>
            ) : (
              `Add ${numberOfEeros} extra eero${numberOfEeros > 1 ? "s" : ""}`
            )}
          </h2>
        )}
        <span className="flex flex-row">
          <span className="font-semibold text-sm text-nowrap">+£{price}</span>
          <span className="text-xxs mt-1">/month</span>
        </span>
      </div>
      <p className="mt-2 text-xs text-ui-grey-500 md:text-core-black md:max-w-[160px]">
        You&apos;ll have{" "}
        <span className="font-semibold text-core-black">
          {product.totalCount}
        </span>{" "}
        eero routers in your plan.
      </p>
    </>
  );
};

export const EeroCard = ({
  eero,
  isActive,
  eeroChooseProductButtonText,
  handleSelectEero,
  helpButton,
}: EeroCardProps) => {
  return (
    <div
      className={`
        flex flex-col group justify-between transition-all min-h-[340px] rounded-lg
        ${isActive ? "border-2 border-ui-teal md:border-none" : "border-2 border-ui-grey-300 md:border-none hover:border-ui-teal"}
        md:flex md:flex-col
      `}
    >
      <div className="p-4 pb-0 md:pb-4 md:mb-8 text-xs md:text-sm text-ui-grey-500">
        <ProductImageAndInfo product={eero} />
        <span>
          {eero.description}{" "}
          <button
            className="font-medium underline text-ui-link"
            onClick={helpButton.onHelpClick}
          >
            {helpButton.buttonText}
          </button>
        </span>
      </div>

      <div className="flex flex-col w-full mx-auto overflow-hidden md:flex-row">
        <div
          className={`
            flex flex-col justify-center w-full md:w-1/2 p-4 md:p-6 md:pr-0 md:rounded-l-lg
            ${isActive ? "bg-core-white md:border-ui-teal md:border-2 md:border-r-0" : "md:bg-ui-grey-100 md:border-2 border-transparent md:group-hover:border-ui-teal md:group-hover:border-r-0"}
          `}
        >
          <PricingInfo product={eero} isActive={isActive} />
        </div>

        <div
          className={`
            flex w-full md:w-1/2 px-4 pb-4 pt-2 md:py-11 md:pr-10 md:pl-12 bg-ui-white items-center md:items-start justify-center border-core-grey-200 border-0 md:rounded-r-lg md:border-2 md:border-l-0 group-hover:border-ui-teal
            ${isActive ? "md:border-2 border-l-0 md:border-ui-teal" : ""}
          `}
        >
          <Button
            onClick={() => handleSelectEero(eero)}
            tint={isActive ? "light-peach" : "yellow"}
            variant="solid"
            size="medium"
            fullWidth
          >
            {isActive && "X "}
            {isActive
              ? eeroChooseProductButtonText.remove
              : eeroChooseProductButtonText.choose}
          </Button>
        </div>
      </div>
    </div>
  );
};
