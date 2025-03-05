import {
  ReviewCard,
  ReviewCardProps,
  Slider,
  TrustpilotStars,
} from "@react-component-library/ui";
import { ReviewCardSkeleton } from "@react-component-library/ui/server";

import { useTrustpilotReviews } from "@/hooks/useTrustpilotReviews";

import { reviewIds } from "./trustpilotSliderProps";

interface TrustPilotSliderProps {
  title: string;
  subtitle: string;
  reviewCount: number;
  trustScore: number;
  reviews: ReviewCardProps[];
  isLoading?: boolean;
}

export const TrustPilotSliderWrapper = ({
  reviewCount,
  trustScore,
}: {
  reviewCount: number;
  trustScore: number;
}) => {
  const title = "Lovely things our flock say";
  const subtitle = "(Not that we're bragging)";
  const {
    data: reviews,
    loading: reviewsLoading,
    error,
  } = useTrustpilotReviews(reviewIds);

  // if there's no reviews, don't render the review section
  if (error) {
    return null;
  }

  return (
    <TrustPilotSlider
      title={title}
      subtitle={subtitle}
      reviewCount={reviewCount}
      trustScore={trustScore}
      reviews={reviews || []}
      isLoading={reviewsLoading || !reviews}
    />
  );
};

export const TrustPilotSlider = ({
  title,
  subtitle,
  reviewCount,
  trustScore,
  reviews,
  isLoading,
}: TrustPilotSliderProps) => {
  return (
    <section
      className="bg-ui-grey-200 pb-12 lg:pb-40"
      aria-labelledby="trust-pilot-heading"
    >
      <div className="py-12 px-5 lg:px-36 lg:pt-40">
        <div className="max-w-[1152px] mx-auto">
          <h2
            id="trust-pilot-heading"
            className="sm:text-5xl text-3xl font-semibold"
          >
            {title}
          </h2>
          <h3 className="sm:text-4xl text-2xl font-semibold">{subtitle}</h3>
        </div>
      </div>

      <div className="px-5 lg:px-36">
        <h4 className="max-w-[1152px] mx-auto text-md md:text-lg">
          Showing our 5-star reviews
        </h4>
      </div>

      <Slider
        draggable
        aria-label="Customer reviews"
        aria-roledescription="carousel"
        margin="before:ml-5 before:lg:ml-36 before:xl:ml-[calc(((100vw-1152px)/3)+5vw)] before:2xl:ml-[calc(((100vw-1152px)/2.5)+5vw)]"
      >
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                aria-roledescription="slide"
                aria-label={`Loading review ${i + 1} of 5`}
              >
                <ReviewCardSkeleton />
              </div>
            ))
          : reviews.map((r: ReviewCardProps, i) => (
              <div
                key={r.author + r.title}
                aria-roledescription="slide"
                aria-label={`Review ${i + 1} of ${reviews.length}`}
              >
                <ReviewCard
                  author={r.author}
                  reviewText={r.reviewText}
                  starRating={r.starRating}
                  title={r.title}
                  id={r.id}
                />
              </div>
            ))}
      </Slider>

      <div className="md:pt-4 px-5 lg:px-36">
        <div className="max-w-[1152px] mx-auto flex flex-row gap-4 mt-4 sm:mt-0 items-center px-4 md:px-0">
          <picture>
            <source
              media="(min-width: 640px)"
              srcSet="assets/images/trustpilot-logo.svg"
              width="105"
              height="26"
            />
            <source
              media="(max-width: 639px)"
              srcSet="assets/images/trustpilot-logo.svg"
              width="80"
              height="20"
            />
            <img
              src="assets/images/trustpilot-logo.svg"
              alt="Trustpilot logo"
              className="w-20 sm:w-[105px] h-auto"
            />
          </picture>
          <div className="w-26 h-7 sm:w-[105px] sm:h-[26px] flex items-center justify-center overflow-hidden">
            <TrustpilotStars trustScore={trustScore} width={105} height={26} />
          </div>
          <span className="md:text-sm text-xs">
            Based on <strong>{reviewCount.toLocaleString()}</strong> reviews
          </span>
        </div>
      </div>
    </section>
  );
};
