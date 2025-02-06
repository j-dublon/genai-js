import { useEffect, useRef, useState } from "react";

export interface FeatureTextProps {
  topText: string;
  bottomText: string;
  backgroundColor?: string;
  textColor?: string;
  textScale?: number;
  textGap?: number;
  infoCard?: boolean;
  image?: {
    url: string;
    alt: string;
  };
}

export const FeatureText = ({
  topText,
  bottomText,
  backgroundColor,
  textColor = "indigo-300",
  textScale = 1.8,
  textGap = 12,
  infoCard = false,
  image,
}: FeatureTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current || !textRef.current) {
        return;
      }
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      const textWidth = textRef.current.offsetWidth;
      const textHeight = textRef.current.offsetHeight;
      const widthScale = containerWidth / textWidth;
      const heightScale = containerHeight / textHeight;
      const newScale = Math.min(widthScale, heightScale) * textScale;
      setScale(newScale);
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, [topText, bottomText, textScale]);

  const wavy = (text: string, waveIntensity: number) => {
    return [...text].map((char, i) => (
      <span
        key={i}
        className="inline-block"
        style={{
          transform: `translateY(${Math.sin(i * waveIntensity) * -30}px) scale(${scale})`,
          display: "inline-block",
        }}
      >
        {char}
      </span>
    ));
  };

  const containerClasses = `${backgroundColor ? `bg-${backgroundColor}` : ""} ${infoCard ? "rounded-t-lg" : "rounded-lg"} flex flex-col overflow-hidden px-8 py-12 gap-14`;
  const textClasses = `md:text-[80px] text-[30px] font-bold text-${textColor} leading-none tracking-wide skew-x-12 w-full flex gap-${textGap} justify-between`;

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Feature text display"
      className={containerClasses}
    >
      <div className="sr-only">
        <h1>{topText}</h1>
        <h1>{bottomText}</h1>
      </div>
      <div className="relative w-full h-full">
        <div className="flex flex-col md:gap-36 gap-16">
          <div
            role="presentation"
            aria-hidden="true"
            ref={textRef}
            className={textClasses}
          >
            {wavy(topText, 0.5)}
          </div>

          <div role="presentation" aria-hidden="true" className={textClasses}>
            {wavy(bottomText, 0.5)}
          </div>
        </div>

        {image && (
          <div className="absolute inset-0 z-10 flex justify-center items-center">
            <div className="md:w-[450px] md:h-[450px] w-[200px] h-[200px]">
              <img src={image.url} alt={image.alt} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
