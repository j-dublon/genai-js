import { CuckooLogo } from "@icons/CuckooLogo";
import Link from "next/link";
import { JSX } from "react";

interface SimpleNavBarProps {
  logo?: JSX.Element;
}

export const SimpleNavBar = ({
  logo = <CuckooLogo className="ds:min-w-[130px] ds:min-h-[50px]" />,
  children,
}: React.PropsWithChildren<SimpleNavBarProps>) => {
  return (
    <header
      className="ds:w-full ds:top-0 ds:z-50 ds:transition-all ds:duration-300"
      role="banner"
    >
      <nav
        aria-label="Simple navigation"
        className="ds:flex ds:justify-between ds:items-center ds:h-20 ds:py-4 ds:px-5 ds:md:px-12 ds:w-full ds:relative ds:z-50 ds:bg-core-yellow ds:border-b ds:border-[#1f1f1f1a]"
      >
        <Link href="/" className="ds:cursor-pointer">
          {logo}
        </Link>
        {children}
      </nav>
    </header>
  );
};
