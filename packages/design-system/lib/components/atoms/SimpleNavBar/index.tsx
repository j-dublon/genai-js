import Link from "next/link";
import { JSX } from "react";

interface SimpleNavBarProps {
  logo: JSX.Element;
  infoText?: string;
  additionalInfoText?: string;
  onInfoClick?: () => void;
}

export const SimpleNavBar = ({
  logo,
  infoText,
  additionalInfoText,
  onInfoClick,
}: SimpleNavBarProps) => {
  return (
    <header
      className="ds:w-full ds:top-0 ds:z-50 ds:transition-all ds:duration-300"
      role="banner"
    >
      <nav
        aria-label="Simple navigation"
        className="ds:flex ds:justify-between ds:items-center ds:h-20 ds:py-4 ds:px-5 ds:md:pl-11 ds:md:pr-18 ds:w-full ds:relative ds:z-50 ds:bg-core-yellow ds:border-b ds:border-[#1f1f1f1a]"
      >
        <Link href="/" className="ds:cursor-pointer">
          {logo}
        </Link>
        <div className="ds:flex ds:items-center ds:gap-2 ds:ml-2 ds:text-nowrap ds:text-right ds:font-medium ds:leading-[1.6] ds:text-core-black ds:text-xxs ds:sm:text-sm">
          {infoText && (
            <button
              onClick={onInfoClick}
              className="ds:leading-[1.6] ds:underline ds:cursor-pointer ds:text-core-purple"
            >
              {infoText}
            </button>
          )}
          {additionalInfoText && (
            <span className="ds:hidden ds:md:inline">{additionalInfoText}</span>
          )}
        </div>
      </nav>
    </header>
  );
};
