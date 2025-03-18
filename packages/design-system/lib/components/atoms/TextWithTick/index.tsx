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
  padding?: "none" | "default" | "large";
  iconSize?: number;
}

export const TextWithTick = ({
  textInput,
  backgroundColor = "white",
  broadbandOffer = false,
  padding = "default",
  iconSize = 20,
  ariaLabel,
}: TextWithTickProps) => {
  const paddingClass = {
    none: "",
    default: "ds:px-6 ds:py-3",
    large: "ds:px-6 ds:py-4",
  };

  return (
    <div
      className={cx(
        "ds:flex ds:items-center ds:gap-2.5 ds:rounded-full",
        paddingClass[padding],
        `${broadbandOffer ? "ds:bg-offer-gradient ds:font-semibold" : bgColorVariants[backgroundColor]}`,
      )}
      aria-label={`${ariaLabel ?? `Text with tick with the statement ${textInput}`}`}
    >
      <div className="ds:flex ds:items-center">
        {broadbandOffer ? (
          <OfferIcon height={iconSize} width={iconSize} />
        ) : (
          <Tick height={iconSize} width={iconSize} />
        )}
      </div>

      <p
        className={`${broadbandOffer ? "ds:md:text-[26px]" : "ds:md:text-md"} ds:text-[16px]`}
      >
        {textInput}
      </p>
    </div>
  );
};
