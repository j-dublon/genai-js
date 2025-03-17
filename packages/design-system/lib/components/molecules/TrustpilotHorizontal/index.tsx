import { TrustpilotStars } from "@components/atoms/TrustpilotStars";
import { TrustpilotLogo } from "@icons/TrustpilotLogo";
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
      <div className="ds:flex ds:flex-col ds:md:flex-row ds:items-center ds:sm:space-x-4 ds:space-y-2 ds:md:space-y-0">
        <div className="ds:flex ds:flex-row ds:space-x-2 ds:md:space-x-4">
          <div className="ds:flex-shrink-0">
            <TrustpilotLogo />
          </div>
          <div className="ds:flex-shrink-0">
            <TrustpilotStars trustScore={trustScore} />
          </div>
        </div>
        {numberOfReviews && (
          <div className="ds:whitespace-nowrap ds:text-[12px] ds:sm:text-[18px]">
            Based on <strong>{numberOfReviews.toLocaleString()}</strong> reviews
          </div>
        )}
      </div>
    </Link>
  );
};
