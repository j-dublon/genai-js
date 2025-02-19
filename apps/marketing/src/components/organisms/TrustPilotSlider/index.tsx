import { Slider, TrustpilotStars } from "@react-component-library/ui";
import {
  ReviewCard,
  ReviewCardProps,
} from "@react-component-library/ui/server";

interface TrustPilotSliderProps {
  title: string;
  subtitle: string;
  reviewCount: number;
  trustScore: number;
  reviews: ReviewCardProps[];
}

export const TrustPilotSliderWrapper = ({
  reviewCount,
  trustScore,
  reviews,
}: {
  reviewCount: number;
  trustScore: number;
  reviews: ReviewCardProps[];
}) => {
  const title = "Lovely things our flock say";
  const subtitle = "(Not that we're bragging)";
  return (
    <TrustPilotSlider
      title={title}
      subtitle={subtitle}
      reviewCount={reviewCount}
      trustScore={trustScore}
      reviews={reviews}
    />
  );
};

export const TrustPilotSlider = ({
  title,
  subtitle,
  reviewCount,
  trustScore,
  reviews,
}: TrustPilotSliderProps) => {
  return (
    <section
      className="bg-ui-grey-200 sm:py-24 pl-4 sm:pl-12 py-12 flex flex-col justify-center"
      aria-labelledby="trust-pilot-heading"
    >
      <div className=" md:max-w-[1152px] overflow-x-auto">
        <div className="mb-12 md:px-0 px-8">
          <h2
            id="trust-pilot-heading"
            className="sm:text-5xl text-3xl font-semibold"
          >
            {title}
          </h2>
          <p className="sm:text-4xl text-2xl font-semibold">{subtitle}</p>
        </div>
        <div className="pl-8 sm:pl-0"></div>
      </div>
      <Slider
        draggable
        aria-label="Customer reviews"
        aria-roledescription="carousel"
      >
        {reviews.map((r: ReviewCardProps, i) => (
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
            />
          </div>
        ))}
      </Slider>

      <div className="md:pt-4 md:max-w-[1152px] overflow-x-auto">
        <div className="flex flex-row gap-4 mt-4 sm:mt-0 items-center px-4 md:px-0">
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
          <TrustpilotStars
            aria-label={`Trust score: ${trustScore} out of 5`}
            trustScore={trustScore}
            width={
              typeof window !== "undefined" && window.innerWidth < 640
                ? 80
                : 105
            }
            height={
              typeof window !== "undefined" && window.innerWidth < 640 ? 20 : 26
            }
          />
          <span className="md:text-sm text-xs">
            Based on <strong>{reviewCount.toLocaleString()}</strong> reviews
          </span>
        </div>
      </div>
    </section>
  );
};
