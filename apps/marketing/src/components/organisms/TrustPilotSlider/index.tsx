import {
  ReviewCard,
  ReviewCardProps,
  Slider,
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
      className="bg-ui-grey-200 pb-12 md:pb-40"
      aria-labelledby="trust-pilot-heading"
    >
      <div className="py-12 px-mobile sm:px-tablet lg:px-desktop md:pt-40">
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

      <div className="px-mobile sm:px-tablet lg:px-desktop">
        <h4 className="max-w-[1152px] mx-auto text-md md:text-lg">
          Showing our 5-star reviews
        </h4>
      </div>

      <Slider
        draggable
        aria-label="Customer reviews"
        aria-roledescription="carousel"
        margin="before:ml-mobile before:sm:ml-tablet before:lg:ml-desktop before:xl:ml-[calc(((100vw-1152px)/3)+5vw)] before:2xl:ml-[calc(((100vw-1152px)/2.5)+5vw)]"
        trustScore={trustScore}
        numberOfReviews={reviewCount}
        sectionName="Customer reviews"
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
    </section>
  );
};
