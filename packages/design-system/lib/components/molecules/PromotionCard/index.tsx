import { InfoIcon } from "@icons/InfoIcon";
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

const PromotionBadge = ({ text }: { text: string }) => {
  const mobile = "ds:top-[-16px] ds:right-[10px] ds:w-[115px] ds:h-[32px]";
  const desktop =
    "ds:md:top-[-25px] ds:md:right-5 ds:md:w-[170px] ds:md:h-[50px]";
  return (
    <div
      aria-label="Promotion"
      className={`ds:absolute ds:bg-offer-gradient ds:rounded-full ds:flex ds:items-center ds:justify-center ${mobile} ${desktop}`}
    >
      <span className="ds:leading-[1.6] ds:text-xxs ds:md:text-sm ds:font-semibold ds:text-core-black">
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

  mainPrice: number;
  currency?: string;
  priceLabel?: string;
  additionalPrices?: { price: number; label: string; date?: string }[];

  buttonText: string;
  onButtonClick: (data?: CardData) => void;
  detailsButtonText?: string;
  onDetailsClick?: (data?: CardData) => void;

  tint: ColorTint;
  className?: string;
  featured?: boolean;
  promotionText?: string;

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
}: { price: number; label: string; date?: string } & { currency?: string }) => {
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
  promotionText,
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
      className={`ds:relative ds:mb-4 ds:mt-4 ds:md:mt-[25px] ds:flex-shrink-0 ds:w-[260px] ds:md:w-[346px] ds:rounded-lg ds:flex ds:flex-col ds:border-2 ds:group ${getBorderClasses(featured)} ${className}`}
    >
      {promotionText && <PromotionBadge text={promotionText} />}

      <div
        className={`ds:flex-shrink-0 ds:h-[104px] ds:md:h-[142px] ds:p-4 ds:md:p-6 ds:rounded-t-lg ${cardColors[tint].dark} ds:border-b-2 ${getBorderBottomClasses(featured)}`}
      >
        <h2 className="ds:font-semibold ds:text-3xl ds:md:text-5xl ds:leading-[1.4] ds:md:leading-[1.2]">
          {heading}
        </h2>
        {subtitle && (
          <p className="ds:font-medium ds:text-sm ds:md:text-md ds:leading-[1.4] ds:md:leading-[1.5]">
            {subtitle}
          </p>
        )}
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
        <p className={`${TEXT_CLASS} ds:pb-2`}>
          {currency}
          <span className="ds:font-semibold ds:text-3xl ds:md:text-5xl ds:leading-[1.2]">
            {mainPrice}
          </span>
          {priceLabel}
        </p>

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
