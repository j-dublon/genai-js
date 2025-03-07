import { useEffect, useRef, useState } from "react";

import { TrustpilotStars } from "../TrustpilotStars";

export interface ReviewCardProps {
  title: string;
  starRating: number;
  reviewText: string;
  author: string;
  id: string;
}

export const ReviewCard = ({
  title,
  starRating,
  reviewText,
  author,
  id,
}: ReviewCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setIsOverflowing(
        textRef.current.scrollHeight > textRef.current.clientHeight,
      );
    }
  }, [reviewText]);

  return (
    <article
      role="article"
      className={`ds:flex ds:flex-col ds:bg-core-white ds:w-[290px] ds:md:w-[368px] ds:rounded-sm ds:sm:rounded-md ds:px-4 ds:py-6 ${isExpanded ? "ds:h-fit" : "ds:h-[340px] ds:md:h-[380px]"}`}
    >
      <div className="ds:md:h-16 ds:h-auto ds:leading-10">
        <a
          href={`https://www.trustpilot.com/reviews/${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3 className="ds:md:text-2xl ds:text-[26px] ds:font-semibold ds:line-clamp-2">
            {title}
          </h3>
        </a>
      </div>
      <span
        role="img"
        className="ds:sr-only"
        aria-label={`Rating: ${starRating} out of 5 stars`}
      />
      <div className="ds:mt-6 ds:md:mt-12" aria-hidden="true">
        <TrustpilotStars trustScore={starRating} height={28} />
      </div>
      <blockquote className="ds:mt-6 ds:md:text-md ds:text-sm">
        <div
          ref={textRef}
          className={`ds:font-thin ds:transition-all ds:duration-300 ${isExpanded ? "" : "ds:max-h-[90px] ds:line-clamp-3"}`}
        >
          {reviewText}
        </div>
        {isOverflowing && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ds:font-thin ds:mt-2 ds:text-ui-grey-500 ds:hover:underline ds:cursor-pointer ds:text-sm"
            aria-label="Expand review"
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
