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
          "flex flex-col md:flex-row items-center space-x-1 space-y-2 lg:space-x-4 ",
        )}
      >
        <div className="flex flex-row space-x-2">
          <div className="flex-shrink-0">
            <TrustpilotLogo />
          </div>
          <div className="flex-shrink-0">
            <TrustpilotStars trustScore={trustScore} />
          </div>
        </div>
        {numberOfReviews && (
          <div className={cx("whitespace-nowrap", "text-18px")}>
            Based on <strong>{numberOfReviews.toLocaleString()}</strong> reviews
          </div>
        )}
      </div>
    </Link>
  );
};
