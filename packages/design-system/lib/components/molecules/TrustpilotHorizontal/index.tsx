import { TrustpilotStars } from "@components/atoms/TrustpilotStars";
import { TrustpilotLogo } from "@icons/TrustpilotLogo";
import cx from "classnames";
import Link from "next/link";

interface TrustpilotHorizontalProps {
  trustScore: number;
  numberOfReviews?: number;
}

export const TrustpilotHorizontal = ({
  trustScore,
  numberOfReviews,
}: TrustpilotHorizontalProps) => {
  return (
    <Link href="https://uk.trustpilot.com/review/cuckoo.co">
      <div
        className={cx(
          "ds:flex ds:flex-col ds:md:flex-row ds:items-center ds:space-x-1 ds:space-y-2 ds:lg:space-x-4",
        )}
      >
        <div className="ds:flex ds:flex-row ds:space-x-2">
          <div className="ds:flex-shrink-0">
            <TrustpilotLogo />
          </div>
          <div className="ds:flex-shrink-0">
            <TrustpilotStars trustScore={trustScore} />
          </div>
        </div>
        {numberOfReviews && (
          <div className={cx("ds:whitespace-nowrap", "ds:text-18px")}>
            Based on <strong>{numberOfReviews.toLocaleString()}</strong> reviews
          </div>
        )}
      </div>
    </Link>
  );
};
