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
        "flex items-center gap-2.5 rounded-full",
        !noPadding && "px-6 py-3",
        `${broadbandOffer ? "bg-offer-gradient" : bgColorVariants[backgroundColor]}`,
      )}
      aria-label={`Text with tick with the statement ${textInput}`}
    >
      <span>{broadbandOffer ? <OfferIcon /> : <Tick />}</span>

      <p className="md:text-md text-[16px]">{textInput}</p>
    </div>
  );
};
