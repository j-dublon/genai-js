import cx from "classnames";
import { Tick } from "@icons/Tick";
import { OfferIcon } from "@icons/OfferIcon";

export interface TextWithTickProps {
  textInput: string;
  ariaLabel?: string;
  broadbandOffer?: boolean;
}

export const TextWithTick = ({
  textInput,
  ariaLabel,
  broadbandOffer = false,
}: TextWithTickProps) => {
  return (
    <div
      className={cx(
        "flex items-center gap-2.5 p-3 rounded-full",
        `${broadbandOffer ? "bg-offer-gradient" : "bg-core-white"}`,
      )}
      aria-label={`Text with tick with the statement ${textInput}`}
    >
      <span>{broadbandOffer ? <OfferIcon /> : <Tick />}</span>

      <p
        className="text-xl"
        aria-label={
          ariaLabel ? ariaLabel : `Text with the statement ${textInput}`
        }
      >
        {textInput}
      </p>
    </div>
  );
};

TextWithTick.displayName = "TextWithTick";
