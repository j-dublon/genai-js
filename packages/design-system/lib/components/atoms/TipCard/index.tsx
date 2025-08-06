import { TextColors } from "@lib/types";
import { textColorVariants } from "@lib/variants";
import Image from "next/image";
import { PropsWithChildren } from "react";

export const tipCardColors = {
  white: "ds:bg-core-white",
  blue: "ds:bg-tertiary-blue-light",
  orange: "ds:bg-tertiary-orange-light",
  green: "ds:bg-secondary-green",
  peach: "ds:bg-tertiary-peach-light",
  grey: "ds:bg-ui-grey-100",
};

interface TipCardProps {
  subtitle?: string;
  image?: string;
  backgroundColor?: keyof typeof tipCardColors;
  subtitleColor?: TextColors;
  className?: string;
  hideImageOnMobile?: boolean;
  textStyling?: string;
}

export const TipCard = ({
  children,
  subtitle,
  image,
  backgroundColor = "white",
  subtitleColor = "black",
  textStyling = "",
  className = "",
  hideImageOnMobile = false,
}: PropsWithChildren<TipCardProps>) => {
  return (
    <div
      className={`ds:rounded-md ds:px-4 ds:py-3 ds:md:p-6 ds:flex ds:gap-3  ${tipCardColors[backgroundColor]} ${className}`}
      aria-label="Tip card"
    >
      {image && (
        <Image
          src={image}
          alt=""
          width={60}
          height={60}
          className={`ds:max-w-10 ds:md:max-w-12 ds:h-auto ${hideImageOnMobile ? "ds:hidden ds:md:block" : ""}`}
          role="presentation"
        />
      )}
      <div
        className={`ds:flex-1 ds:text-xs ds:md:text-sm ds:leading-[1.6] ds:font-normal ds:text-core-black ${textStyling}`}
      >
        {subtitle && (
          <span
            className={`ds:mr-1 ds:inline-block ds:font-semibold ${textColorVariants[subtitleColor]}`}
          >
            {subtitle}
          </span>
        )}
        {children}
      </div>
    </div>
  );
};
