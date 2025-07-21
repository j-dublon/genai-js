import { InfoIcon } from "@icons/InfoIcon";
import { Present } from "@icons/Present";
import { Button } from "@lib/components/atoms/Button";
import { format } from "date-fns";
import { ReactNode } from "react";

const TEXT_CLASS =
  "ds:font-normal ds:text-xs ds:md:text-sm ds:leading-[1.6] ds:md:leading-[1.5]";
const FEATURE_TEXT_CLASS = "ds:text-sm ds:md:text-md ds:font-semibold";

export type ColorTint = "pink" | "blue" | "yellow";

export interface CardData {
  id?: string;
  [key: string]: unknown;
}

export interface FeatureItem {
  icon?: ReactNode;
  value: string | number;
  label: string;
  unit?: string;
}

const PromotionBadge = ({
  text,
  showIcon = true,
}: {
  text: string;
  showIcon?: boolean;
}) => {
  return (
    <div
      aria-label="Promotion"
      className="ds:flex ds:min-w-[115px] ds:flex-shrink-0 ds:items-center ds:justify-center ds:gap-1 ds:rounded-full ds:bg-offer-gradient ds:px-4 ds:py-2 ds:align-middle"
    >
      <span className="ds:hidden ds:md:block">{showIcon && <Present />}</span>
      <span className="ds:text-xxs ds:leading-[1.6] ds:font-semibold ds:text-core-black ds:md:text-xs">
        {text}
      </span>
    </div>
  );
};

const Feature = ({ icon, value, label, unit = "" }: FeatureItem) => {
  return (
    <div className="ds:flex ds:flex-row ds:items-center ds:gap-1 ds:md:gap-2">
      {icon}
      <p className={TEXT_CLASS}>
        <span className={FEATURE_TEXT_CLASS}>
          {value}
          {unit}
        </span>{" "}
        {label}
      </p>
    </div>
  );
};

const cardColors: Record<ColorTint, { dark: string; light: string }> = {
  pink: {
    dark: "ds:bg-secondary-pink",
    light: "ds:bg-tertiary-pink-light",
  },
  blue: {
    dark: "ds:bg-secondary-blue",
    light: "ds:bg-tertiary-blue-light",
  },
  yellow: {
    dark: "ds:bg-core-yellow",
    light: "ds:bg-[#FEFFC6]",
  },
};

interface PromotionCardProps {
  heading: string;
  subtitle?: string;

  features?: FeatureItem[];

  mainPrice: string;
  basePrice?: string;
  currency?: string;
  priceLabel?: string;
  additionalPrices?: { price: string; label: string; date?: string }[];

  buttonText: string;
  onButtonClick: (data?: CardData) => void;
  detailsButtonText?: string;
  onDetailsClick?: (data?: CardData) => void;

  tint: ColorTint;
  className?: string;
  featured?: boolean;
  promotionPillsText?: string[];

  data?: CardData;
}

export const formatPricingDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, "d MMMM yyyy");
};

export const PriceDetail = ({
  price,
  label,
  date,
  currency = "£",
}: { price: string; label: string; date?: string } & { currency?: string }) => {
  return (
    <div className="ds:flex ds:flex-col">
      <hr className="ds:border-ui-grey-300" />
      <div className="ds:flex ds:flex-row ds:justify-between ds:py-2 ds:md:py-3 ds:font-normal ds:text-xs ds:md:text-sm ds:leading-[1.6]">
        <p>{date ? `${label} ${formatPricingDate(date)}` : label}</p>
        <p className="ds:font-semibold">
          {currency}
          {price}/month
        </p>
      </div>
    </div>
  );
};

export const PromotionCard = ({
  heading,
  subtitle,
  features = [],
  mainPrice,
  basePrice,
  currency = "£",
  priceLabel = "/month",
  additionalPrices = [],
  buttonText,
  onButtonClick,
  detailsButtonText,
  onDetailsClick,
  tint,
  className = "",
  featured = false,
  promotionPillsText,
  data,
}: PromotionCardProps) => {
  const getBorderClasses = (isFeatured: boolean) =>
    isFeatured
      ? "ds:border-core-black"
      : "ds:border-transparent ds:transition-colors ds:duration-300 ds:hover:border-core-black";

  const getBorderBottomClasses = (isFeatured: boolean) =>
    isFeatured
      ? "ds:border-b-core-black"
      : "ds:border-b-transparent ds:transition-colors ds:duration-300 ds:group-hover:border-b-core-black";

  return (
    <div
      aria-label={`${heading} card`}
      className={`ds:group ds:relative ds:mt-4 ds:mb-4 ds:flex ds:min-w-[260px] ds:flex-shrink-0 ds:flex-col ds:rounded-lg ds:border-2 ds:md:mt-[25px] ds:md:min-w-[346px] ${getBorderClasses(featured)} ${className}`}
    >
      {promotionPillsText && promotionPillsText.length === 1 && (
        <div className="ds:absolute ds:top-[-16px] ds:right-[10px] ds:flex ds:flex-col ds:gap-1 ds:md:top-[-25px] ds:md:right-5">
          <PromotionBadge text={promotionPillsText[0]} />
        </div>
      )}
      <div
        className={`ds:flex ds:flex-shrink-0 ds:flex-col ds:gap-2 ds:rounded-t-lg ds:p-4 ds:md:flex-row ds:md:p-6 ${cardColors[tint].dark} ds:border-b-2 ${getBorderBottomClasses(featured)}`}
      >
        <div className="ds:flex ds:flex-col ds:gap-1">
          <h2 className="ds:text-3xl ds:leading-[1.4] ds:font-semibold ds:md:text-5xl ds:md:leading-[1.2]">
            {heading}
          </h2>
          {subtitle && (
            <p className="ds:text-sm ds:leading-[1.4] ds:font-medium ds:md:text-md ds:md:leading-[1.5]">
              {subtitle}
            </p>
          )}
        </div>
        <div className="ds:flex ds:flex-row ds:gap-2 ds:self-center ds:md:flex-col">
          {promotionPillsText &&
            promotionPillsText.length > 1 &&
            promotionPillsText.map((text, index) => (
              <PromotionBadge key={index} text={text} showIcon={false} />
            ))}
        </div>
      </div>

      {features.length > 0 && (
        <div
          className={`ds:p-4 ds:md:p-6 ${cardColors[tint].light} ds:border-b-2 ${getBorderBottomClasses(featured)}`}
        >
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      )}

      <div className="ds:flex-shrink-0 ds:h-[263px] ds:md:h-[348px] ds:p-4 ds:md:p-6 ds:bg-core-white ds:rounded-b-lg ds:flex-grow ds:flex ds:flex-col">
        <div className="ds:flex ds:flex-row ds:justify-between ds:py-2 ds:md:py-3 ds:font-normal ds:text-xs ds:md:text-sm ds:leading-[1.6]">
          <p className={`${TEXT_CLASS}`}>
            {currency}
            <span className="ds:font-semibold ds:text-3xl ds:md:text-5xl ds:leading-[1.2]">
              {mainPrice}
            </span>
            {priceLabel}
          </p>
          {basePrice && (
            <p className="ds:font-semibold ds:self-end">
              {currency}
              {basePrice}/month
            </p>
          )}
        </div>

        {additionalPrices.map((priceDetail, index) => (
          <PriceDetail key={index} {...priceDetail} currency={currency} />
        ))}
        <div className="ds:flex ds:flex-col ds:gap-3 ds:md:gap-4 ds:items-center ds:pt-3 ds:md:pt-4">
          <Button
            onClick={() => onButtonClick(data)}
            className="ds:before:!border-core-black ds:group-hover:bg-core-yellow"
            type="button"
            variant="solid"
            tint={tint === "yellow" ? "yellow" : "white"}
            size="large"
            fullWidth
          >
            {buttonText}
          </Button>

          {onDetailsClick && detailsButtonText && (
            <div className="ds:flex ds:flex-row ds:gap-2">
              <InfoIcon />
              <button
                onClick={() => onDetailsClick(data)}
                className="ds:text-ui-link ds:underline ds:font-medium ds:text-xs ds:md:text-sm ds:bg-transparent ds:border-0 ds:p-0 ds:cursor-pointer"
              >
                {detailsButtonText}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
