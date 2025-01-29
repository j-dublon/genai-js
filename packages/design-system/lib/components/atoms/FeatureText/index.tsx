import { useEffect, useRef, useState } from "react";

interface Props {
  topText: string;
  bottomText: string;
  backgroundColor?: string;
  textScale?: number;
  textGap?: number;
  image?: {
    url: string;
    alt: string;
  };
}

export const FeatureText = ({
  topText,
  bottomText,
  backgroundColor,
  textScale = 1.8,
  textGap = 12,
  image,
}: Props) => {
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

  const containerClasses = `${backgroundColor ? `bg-${backgroundColor}` : ""} w-full h-full flex flex-col rounded-lg overflow-hidden px-8 py-12 gap-14`;
  const textClasses = `text-[80px] font-bold text-indigo-300 leading-none tracking-wide skew-x-12 w-full flex gap-${textGap}`;

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Feature text display"
      className={containerClasses}
    >
      {image && (
        <div className="absolute z-10 flex w-1/2 h-1/2 left-36">
          <img src={image.url} alt={image.alt} />
        </div>
      )}
      <div className="sr-only">
        <h1>{topText}</h1>
        <h1>{bottomText}</h1>
      </div>
      <div
        role="presentation"
        aria-hidden="true"
        ref={textRef}
        className={textClasses}
      >
        {wavy(topText, 1)}
      </div>
      <div role="presentation" aria-hidden="true" className={textClasses}>
        {wavy(bottomText, 1)}
      </div>
    </div>
  );
};
