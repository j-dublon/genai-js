import { useEffect, useRef, useState } from "react";

interface Props {
  topText: string;
  bottomText: string;
  backgroundColor: string;
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

      const newScale = Math.min(widthScale, heightScale) * 1.2;
      setScale(newScale);
    };

    updateScale();

    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [topText, bottomText]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden bg-blue-500"
    >
      <div
        ref={textRef}
        className="transform origin-center text-white/10 flex items-center justify-center h-full"
        style={{ transform: `scale(${scale})` }}
      >
        <div className="flex flex-col text-9xl">
          <div>{topText}</div>
          <div>{bottomText}</div>
        </div>
      </div>
    </div>
  );
};
