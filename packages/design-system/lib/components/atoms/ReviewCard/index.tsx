import { TrustpilotStars } from "../TrustpilotStars";

export interface ReviewCardProps {
  title: string;
  starRating: number;
  reviewText: string;
  author: string;
  id: string;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  hasOverflow?: boolean;
}

export const ReviewCard = ({
  title,
  starRating,
  reviewText,
  author,
  id,
  isExpanded = false,
  onToggleExpand = () => {},
  hasOverflow = true,
}: ReviewCardProps) => {
  return (
    <article
      role="article"
      className={`ds:flex ds:flex-col ds:bg-core-white ds:w-[290px] ds:md:w-[368px] ds:rounded-sm ds:sm:rounded-md ds:p-8 ${
        isExpanded ? "ds:h-auto" : "ds:h-[410px] ds:md:h-[460px]"
      } ds:overflow-hidden ds:transition-all ds:duration-300`}
    >
      <div className="ds:h-[120px] ds:md:h-[160px] ds:mb-4">
        <a
          href={`https://www.trustpilot.com/reviews/${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3 className="ds:md:text-3xl ds:text-[26px] ds:font-semibold ds:line-clamp-3">
            {title}
          </h3>
        </a>
      </div>
      <div className="ds:mb-6 ds:w-[140px]">
        <span
          className="ds:sr-only"
          aria-label={`Rating: ${starRating} out of 5 stars`}
        />
        <TrustpilotStars trustScore={starRating} height={28} />
      </div>
      <blockquote className="ds:md:text-md ds:text-sm ds:flex-grow">
        <div
          className={`ds:font-thin ds:text-ui-grey-500 ds:transition-all ds:duration-300 ${
            isExpanded ? "" : "ds:max-h-[100px] ds:line-clamp-3"
          }`}
        >
          {reviewText}
        </div>
        {hasOverflow && (
          <button
            onClick={onToggleExpand}
            className="ds:font-thin ds:mt-2 ds:text-ui-grey-500 ds:hover:underline ds:cursor-pointer ds:text-sm"
            aria-label={
              isExpanded ? "Show less of the review" : "Show more of the review"
            }
          >
            {isExpanded ? "Read less" : "Read more"}
          </button>
        )}
        <div className="ds:mt-4 ds:md:text-md ds:text-sm ds:font-bold">
          {author}
        </div>
      </blockquote>
    </article>
  );
};
