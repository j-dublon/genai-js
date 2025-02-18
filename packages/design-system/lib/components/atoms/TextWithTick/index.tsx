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
}

export const TextWithTick = ({
  textInput,
  backgroundColor = "white",
  broadbandOffer = false,
}: TextWithTickProps) => {
  console.log(broadbandOffer);

  return (
    <div
      className={cx(
        "flex items-center gap-2.5 p-3 rounded-full",
        `${broadbandOffer ? "bg-offer-gradient" : bgColorVariants[backgroundColor]}`,
      )}
      aria-label={`Text with tick with the statement ${textInput}`}
    >
      <span>{broadbandOffer ? <OfferIcon /> : <Tick />}</span>

      <p className="text-md">{textInput}</p>
    </div>
  );
};
