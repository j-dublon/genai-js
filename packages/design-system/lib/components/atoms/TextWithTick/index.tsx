import { OfferIcon } from "@icons/OfferIcon";
import { Tick } from "@icons/Tick";
import { BackgroundColors } from "@lib/types";
import { bgColorVariants } from "@lib/variants";
import cx from "classnames";

export interface TextWithTickProps {
  textInput: string;
  backgroundColor?: BackgroundColors;
  ariaLabel?: string;
  broadbandOffer?: boolean;
  noPadding?: boolean;
}

export const TextWithTick = ({
  textInput,
  backgroundColor = "white",
  broadbandOffer = false,
  noPadding = false,
}: TextWithTickProps) => {
  return (
    <div
      className={cx(
        "ds:flex ds:items-center ds:gap-2.5 ds:rounded-full",
        !noPadding && "ds:px-6 ds:py-3",
        `${broadbandOffer ? "ds:bg-offer-gradient" : bgColorVariants[backgroundColor]}`,
      )}
      aria-label={`Text with tick with the statement ${textInput}`}
    >
      <span>{broadbandOffer ? <OfferIcon /> : <Tick />}</span>

      <p className="ds:md:text-md ds:text-[16px]">{textInput}</p>
    </div>
  );
};
