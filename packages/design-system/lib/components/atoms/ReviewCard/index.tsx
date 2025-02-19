import { TrustpilotStars } from "../TrustpilotStars";

export interface ReviewCardProps {
  title: string;
  starRating: number;
  reviewText: string;
  author: string;
}

export const ReviewCard = ({
  title,
  starRating,
  reviewText,
  author,
}: ReviewCardProps) => {
  return (
    <article
      role="article"
      className="flex flex-col bg-core-white w-[290px] h-[330px] md:w-[368px] md:h-[368px] sm:h-[368px] rounded-sm sm:rounded-md px-4 py-6"
    >
      <div className="md:h-16 h-auto leading-10">
        <h3 className="md:text-3xl text-[26px] font-semibold line-clamp-2">
          {title}
        </h3>
      </div>
      <span
        role="img"
        className="sr-only"
        aria-label={`Rating: ${starRating} out of 5 stars`}
      />
      <div className="mt-12" aria-hidden="true">
        <TrustpilotStars trustScore={starRating} height={28} />
      </div>
      <blockquote className="mt-6 md:text-md text-sm max-h-[90px] ">
        <div className="line-clamp-3 font-thin">{reviewText}</div>
        <div className="mt-4 md:text-md text-sm font-bold">{author}</div>
      </blockquote>
    </article>
  );
};
