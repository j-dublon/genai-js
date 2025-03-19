import { BackgroundColors } from "@lib/types";
import { bgColorVariants } from "@lib/variants";
import { useRef } from "react";

export interface FeatureImageProps {
  backgroundColor: BackgroundColors;
  backgroundImage: {
    url: string;
    alt: string;
  };
  infoCard?: boolean;
  overlayImage?: {
    url: string;
    alt: string;
  };
  promotionImage?: {
    url: string;
    alt: string;
  };
}

export const FeatureImage = ({
  backgroundColor = "blue",
  infoCard = false,
  backgroundImage,
  overlayImage,
  promotionImage,
}: FeatureImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerClasses = `${bgColorVariants[backgroundColor]} ${infoCard ? "ds:rounded-t-lg" : "ds:rounded-lg"} ds:flex ds:flex-col ds:overflow-hidden ds:w-full ds:h-auto ds:min-w-0`;

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Feature image display"
      className={containerClasses}
    >
      <div className="ds:relative ds:w-full ds:h-full">
        <div className="ds:w-full ds:min-w-0">
          <img
            src={backgroundImage.url}
            alt={backgroundImage.alt}
            className="ds:w-full ds:h-auto ds:min-w-0 ds:transform ds:scale-110 ds:origin-center"
          />
        </div>
        {overlayImage && (
          <div className="ds:absolute ds:inset-0 ds:z-10 ds:flex ds:justify-center ds:items-center">
            <div className="ds:w-[38vw] ds:h-[38vw] ds:max-w-[400px] ds:max-h-[400px] ds:lg:max-w-[425px] ds:lg:max-h-[425px]">
              <img
                src={overlayImage.url}
                alt={overlayImage.alt}
                className="ds:w-full ds:h-full ds:object-contain"
              />
            </div>
          </div>
        )}
        {promotionImage && (
          <div className="ds:hidden ds:md:inline ds:md:absolute ds:md:inset-0 ds:md:-right-2 ds:md:z-10">
            <div className="">
              <img
                src={promotionImage.url}
                alt={promotionImage.alt}
                className="ds:w-full ds:h-full ds:object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
