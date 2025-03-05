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
      className={`flex flex-col bg-core-white w-[290px] md:w-[368px] rounded-sm sm:rounded-md px-4 py-6 ${isExpanded ? "h-fit" : "h-[340px] md:h-[380px]"}`}
    >
      <div className="md:h-16 h-auto leading-10">
        <a
          href={`https://www.trustpilot.com/reviews/${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3 className="md:text-2xl text-[26px] font-semibold line-clamp-2">
            {title}
          </h3>
        </a>
      </div>
      <span
        role="img"
        className="sr-only"
        aria-label={`Rating: ${starRating} out of 5 stars`}
      />
      <div className="mt-6 md:mt-12" aria-hidden="true">
        <TrustpilotStars trustScore={starRating} height={28} />
      </div>
      <blockquote className="mt-6 md:text-md text-sm">
        <div
          ref={textRef}
          className={`font-thin transition-all duration-300 ${isExpanded ? "" : "max-h-[90px] line-clamp-3"}`}
        >
          {reviewText}
        </div>
        {isOverflowing && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="font-thin mt-2 text-ui-grey-500 hover:underline cursor-pointer text-sm"
            aria-label="Expand review"
          >
            {isExpanded ? "Read less" : "Read more"}
          </button>
        )}
        <div className="mt-4 md:text-md text-sm font-bold">{author}</div>
      </blockquote>
    </article>
  );
};
