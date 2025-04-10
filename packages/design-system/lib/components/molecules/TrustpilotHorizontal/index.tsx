import { TrustpilotStars } from "@components/atoms/TrustpilotStars";
import { TrustpilotLogo } from "@icons/TrustpilotLogo";
import cx from "classnames";
import Link from "next/link";

interface TrustpilotHorizontalProps {
  trustScore: number;
  numberOfReviews?: number;
  flexDirection?: string;
}

export const TrustpilotHorizontal = ({
  trustScore,
  numberOfReviews,
  flexDirection = "flex-row",
}: TrustpilotHorizontalProps) => {
  return (
    <Link
      href="https://uk.trustpilot.com/review/cuckoo.co"
      data-testid="trustpilot-link"
    >
      <div
        className={cx(
          "ds:flex ds:md:flex-row ds:items-center ds:lg:space-x-3 ds:space-x-2 ds:md:space-y-0",
          `ds:${flexDirection}`,
        )}
      >
        <div className="ds:flex ds:flex-row ds:items-center ds:align-middle ds:space-x-2 ds:md:space-x-4">
          <div className="ds:flex-shrink-0 ds:w-[77px] ds:md:w-[97px]">
            <TrustpilotLogo />
          </div>
          <div className="ds:flex-shrink-0">
            <TrustpilotStars
              trustScore={trustScore}
              className="ds:w-[109px] ds:md:w-[149px]"
            />
          </div>
        </div>
        {numberOfReviews && (
          <div className="ds:whitespace-nowrap ds:text-[12px] ds:md:text-[14px] ds:lg:text-[16px] ds:font-normal ds:leading-[1.4]">
            Based on{" "}
            <span className="ds:font-semibold">
              {numberOfReviews.toLocaleString()}
            </span>{" "}
            reviews
          </div>
        )}
      </div>
    </Link>
  );
};
