import { useEffect, useRef, useState } from "react";

interface Props {
  topText: string;
  bottomText: string;
  backgroundColor?: string;
  className: string;
}

export const ScaledText = ({ topText, bottomText }: Props) => {
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
      const newScale = Math.min(widthScale, heightScale) * 1.8;
      setScale(newScale);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [topText, bottomText]);

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
  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col bg-secondary-blue rounded-lg overflow-hidden px-8 py-12 gap-14"
    >
      <h1
        ref={textRef}
        className="text-[80px] font-bold text-indigo-300 leading-none tracking-wide skew-x-12 w-full flex gap-12"
      >
        {wavy(topText, 1)}
      </h1>
      <h1 className="text-[80px] font-bold text-indigo-300 leading-none tracking-wide skew-x-12 w-full flex gap-12">
        {wavy(bottomText, 1)}
      </h1>
    </div>
  );
};
