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
}

export const FeatureImage = ({
  backgroundColor = "blue",
  infoCard = false,
  backgroundImage,
  overlayImage,
}: FeatureImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerClasses = `${bgColorVariants[backgroundColor]} ${infoCard ? "rounded-t-lg" : "rounded-lg"} flex flex-col overflow-hidden w-full h-auto min-w-0`;

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Feature image display"
      className={containerClasses}
    >
      <div className="relative w-full h-full">
        <div className="w-full min-w-0">
          <img
            src={backgroundImage.url}
            alt={backgroundImage.alt}
            className="w-full h-auto min-w-0 transform scale-110 origin-center"
          />
        </div>
        {overlayImage && (
          <div className="absolute inset-0 z-10 flex justify-center items-center">
            <div className="w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] lg:max-w-[550px] lg:max-h-[550px]">
              <img
                src={overlayImage.url}
                alt={overlayImage.alt}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
