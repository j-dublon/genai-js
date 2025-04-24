import { Button } from "@components/atoms/Button";
import { ArrowIcon } from "@icons/ArrowIcon";
import { InfoIcon } from "@icons/InfoIcon";

const TEXT_CLASS =
  "ds:font-normal ds:text-xs ds:md:text-sm ds:leading-[1.6] ds:md:leading-[1.5]";
const FEATURE_TEXT_CLASS = "ds:text-sm ds:md:text-md ds:font-semibold";

type BroadbandPackage = {
  id: string;
  name: string;
  speed: {
    download: number;
    upload: number;
  };
  price: {
    monthly: number;
    setup: number;
  };
  priceIncrease: {
    nextYearIncrease: number;
    followingYearIncrease: number;
  };
  contractLength: number;
  description: string;
  features?: string[];
};

interface PackageCardProps {
  pkg: BroadbandPackage;
  onPackageSelect: (pkg: BroadbandPackage) => void;
  tint: "pink" | "blue" | "yellow";
  buttonText: string;
  className?: string;
  featurePackage?: boolean;
  promotion?: string;
}

const packageCardColors = {
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

const AnnualPrice = ({
  price,
  dateType,
}: {
  price: number;
  dateType: "nextYear" | "followingYear";
}) => {
  const calculateYear = (dateType: "nextYear" | "followingYear"): number => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const isBeforeApril = today.getMonth() < 3;

    const nextYear = isBeforeApril ? currentYear : currentYear + 1;
    return dateType === "nextYear" ? nextYear : nextYear + 1;
  };

  return (
    <div className="ds:flex ds:flex-col">
      <hr className="ds:border-ui-grey-300" />
      <div className="ds:flex ds:flex-row ds:justify-between ds:py-2 ds:md:py-3 ds:font-normal ds:text-xs ds:md:text-sm ds:leading-[1.6]">
        <p>From 1 April {calculateYear(dateType)}</p>
        <p className="ds:font-semibold">£{price}/month</p>
      </div>
    </div>
  );
};

const Speed = ({
  value,
  direction,
}: {
  value: number;
  direction: "up" | "down";
}) => {
  return (
    <div className="ds:flex ds:flex-row ds:items-center ds:gap-1 ds:md:gap-2">
      <ArrowIcon direction={direction} />
      <p className={TEXT_CLASS}>
        <span className={FEATURE_TEXT_CLASS}>{value}Mbps</span>{" "}
        {direction === "down" ? "download" : "upload"} speed
      </p>
    </div>
  );
};

const PromotionPill = ({ promotion }: { promotion: string }) => {
  const mobile = "ds:top-[-16px] ds:right-[10px] ds:w-[115px] ds:h-[32px]";
  const desktop =
    "ds:md:top-[-25px] ds:md:right-5 ds:md:w-[170px] ds:md:h-[50px]";
  return (
    <div
      aria-label="Promotion"
      className={`ds:absolute ds:bg-offer-gradient ds:rounded-full ds:flex ds:items-center ds:justify-center ${mobile} ${desktop}`}
    >
      <span className="ds:leading-[1.6] ds:text-xxs ds:md:text-sm ds:font-semibold ds:text-core-black">
        {promotion}
      </span>
    </div>
  );
};

export const PackageCard = ({
  pkg,
  onPackageSelect,
  tint,
  buttonText,
  className = "",
  featurePackage = false,
  promotion,
}: PackageCardProps) => {
  const getBorderClasses = (isFeaturePackage: boolean) =>
    isFeaturePackage
      ? "ds:border-core-black ds:transition-shadow ds:duration-300 ds:hover:shadow-[10px_10px_15px_-5px_rgba(31,31,31,0.4)]"
      : "ds:border-transparent ds:transition-colors ds:duration-300 ds:hover:border-core-black";

  const getBorderBottomClasses = (isFeaturePackage: boolean) =>
    isFeaturePackage
      ? "ds:border-b-core-black"
      : "ds:border-b-transparent ds:transition-colors ds:duration-300 ds:group-hover:border-b-core-black";

  return (
    <div
      aria-label={`${pkg.name} broadband package`}
      className={`ds:relative ds:mb-4 ds:mt-4 ds:md:mt-[25px] ds:flex-shrink-0 ds:w-[260px] ds:md:w-[346px] ds:rounded-lg ds:flex ds:flex-col ds:border-2 ds:group ${getBorderClasses(featurePackage)} ${className}`}
    >
      {promotion && <PromotionPill promotion={promotion} />}
      <div
        className={`ds:flex-shrink-0 ds:h-[104px] ds:md:h-[142px] ds:p-4 ds:md:p-6 ds:rounded-t-lg ${packageCardColors[tint].dark} ds:border-b-2 ${getBorderBottomClasses(featurePackage)}`}
      >
        <h2 className="ds:font-semibold ds:text-3xl ds:md:text-5xl ds:leading-[1.4] ds:md:leading-[1.2]">
          {pkg.name}
        </h2>
        <p className="ds:font-medium ds:text-sm ds:md:text-md ds:leading-[1.4] ds:md:leading-[1.5]">
          {pkg.description}
        </p>
      </div>

      <div
        className={`ds:p-4 ds:md:p-6 ${packageCardColors[tint].light} ds:border-b-2 ${getBorderBottomClasses(featurePackage)}`}
      >
        <Speed value={pkg.speed.download} direction="down" />
        <Speed value={pkg.speed.upload} direction="up" />
      </div>

      <div className="ds:flex-shrink-0 ds:h-[263px] ds:md:h-[348px] ds:p-4 ds:md:p-6 ds:bg-core-white ds:rounded-b-lg ds:flex-grow ds:flex ds:flex-col">
        <p className={`${TEXT_CLASS} ds:pb-2`}>
          £
          <span className="ds:font-semibold ds:text-3xl ds:md:text-5xl ds:leading-[1.2]">
            {pkg.price.monthly}
          </span>
          /month
        </p>
        <AnnualPrice
          price={pkg.price.monthly + pkg.priceIncrease.nextYearIncrease}
          dateType="nextYear"
        />
        <AnnualPrice
          price={
            pkg.price.monthly +
            pkg.priceIncrease.nextYearIncrease +
            pkg.priceIncrease.followingYearIncrease
          }
          dateType="followingYear"
        />
        <div className="ds:flex ds:flex-col ds:gap-3 ds:md:gap-4 ds:items-center ds:pt-3 ds:md:pt-4">
          <Button
            onClick={() => onPackageSelect(pkg)}
            className="ds:before:!border-core-black ds:group-hover:bg-core-yellow"
            type="button"
            variant="solid"
            tint={tint === "yellow" ? "yellow" : "white"}
            size="large"
            fullWidth
          >
            {buttonText}
          </Button>
          <div className="ds:flex ds:flex-row ds:gap-2">
            <InfoIcon />
            {/* TODO: info link functionality */}
            <a
              href="/"
              className="ds:text-ui-link ds:underline ds:font-medium ds:text-xs ds:md:text-sm"
            >
              Is this plan for me?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
