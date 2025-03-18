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
    default: "ds:px-3 ds:md:px-6 ds:py-[10px] ds:md:py-3",
    large: "ds:px-3 ds:md:px-6 ds:py-[10px] ds:md:py-4",
  };

  return (
    <div
      className={cx(
        "ds:flex ds:items-center ds:gap-2.5 ds:rounded-full",
        paddingClass[padding],
        `${broadbandOffer ? "ds:bg-offer-gradient" : bgColorVariants[backgroundColor]}`,
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
        className={cx(
          `${broadbandOffer ? "ds:md:text-[26px] ds:font-semibold" : "ds:md:text-md ds:font-semibold ds:md:font-medium"}`,
          "ds:text-[14px] ds:leading-[1.6] ds:md:leading-[1.5]",
        )}
      >
        {textInput}
      </p>
    </div>
  );
};
