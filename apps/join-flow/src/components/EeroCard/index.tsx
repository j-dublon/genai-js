import { Button, ColorPill } from "@react-component-library/ui";
import { Tick } from "@react-component-library/ui/icons";
import Link from "next/link";

import { EeroProduct } from "@/store/useJoinFlowStore";

export type EeroCardProps = {
  product: EeroProduct;
  isActive: boolean;
  eeroChooseProductButtonText: {
    remove: string;
    choose: string;
  };
  handleSelectEero: (product: EeroProduct) => void;
};

const ProductImageAndInfo = ({ product }: { product: EeroProduct }) => (
  <div className="flex flex-col mb-2">
    {product.imageURL && (
      <img src={product.imageURL} className="h-full" alt="Eero router image." />
    )}
    <div className="flex flex-col justify-between w-full mt-8 space-y-2 md:flex-row">
      <h3 className="font-bold text-md">{product.heading}</h3>
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
  product: EeroProduct;
  isActive: boolean;
}) => (
  <>
    <div className="flex flex-row justify-between md:flex-col">
      {product.totalCount && (
        <h2 className="text-sm font-semibold text-gray-800">
          {isActive ? (
            <span className="flex flex-row">
              <Tick />
              <span className="ml-1">
                {product.totalCount - 1} extra eero
                {product.totalCount - 1 > 1 ? "s" : ""} selected
              </span>
            </span>
          ) : (
            `Add ${product.totalCount - 1} extra eeros`
          )}
        </h2>
      )}
      <span className="flex flex-row items-baseline mt-1">
        <span className="font-semibold text-md">+£{product.price}</span>
        <span className="text-xxs">/month</span>
      </span>
    </div>
    <p className="mt-1 text-xs text-gray-700 md:max-w-[130px]">
      You&apos;ll have <strong>{product.totalCount}</strong> eero routers in
      your plan.
    </p>
  </>
);

export const EeroCard = ({
  product,
  isActive,
  eeroChooseProductButtonText,
  handleSelectEero,
}: EeroCardProps) => {
  return (
    <div
      className={`
        flex flex-col group justify-between transition-all min-h-[340px] rounded-lg
        ${isActive ? "border-2 border-ui-teal md:border-none" : "border-2 border-ui-grey-300 md:border-none hover:border-ui-teal"}
        md:flex md:flex-col
      `}
    >
      <div className="p-4 pb-0 md:pb-4 md:mb-8">
        <ProductImageAndInfo product={product} />
        <span>
          {product.description}{" "}
          <Link className="font-medium underline text-ui-link" href="">
            Help me decide
          </Link>
        </span>
      </div>

      <div className="flex flex-col w-full mx-auto overflow-hidden md:flex-row">
        <div
          className={`
            flex flex-col justify-center w-full p-4 pb-2 md:pb-4 md:pl-7 md:py-6
            ${isActive ? "md:w-7/9 md:pr-0" : "md:w-1/2"}
            ${isActive ? "bg-core-white" : "md:bg-ui-grey-100"}
            ${isActive ? "md:border-ui-teal md:border-2 md:border-r-0" : "border-2 border-transparent md:group-hover:border-ui-teal md:group-hover:border-r-0"}
            md:rounded-l-lg
          `}
        >
          <PricingInfo product={product} isActive={isActive} />
        </div>

        <div
          className={`
            w-full p-4 bg-ui-white flex items-center md:items-center
            ${isActive ? "md:w-2/5" : "md:w-1/2"}
            ${isActive ? "md:border-2 border-l-0 md:border-ui-teal" : "md:w-1/2"}
            border-0 md:rounded-r-lg md:border-2 border-core-grey-200 md:border-t-2 md:border-b-2 md:border-r-2 md:border-l-0 group-hover:border-ui-teal
          `}
        >
          <Button
            onClick={() => handleSelectEero(product)}
            tint={isActive ? "light-peach" : "yellow"}
            variant="solid"
            size="medium"
            fullWidth
          >
            {isActive
              ? eeroChooseProductButtonText.remove
              : eeroChooseProductButtonText.choose}
          </Button>
        </div>
      </div>
    </div>
  );
};
