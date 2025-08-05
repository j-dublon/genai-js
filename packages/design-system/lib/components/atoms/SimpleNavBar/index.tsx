import { CuckooLogo } from "@icons/CuckooLogo";
import Link from "next/link";
import { JSX } from "react";

interface SimpleNavBarProps {
  logo?: JSX.Element;
  fixed?: boolean;
  backgroundColor?: "yellow" | "white";
}

export const SimpleNavBar = ({
  logo = <CuckooLogo className="ds:min-w-[130px] ds:min-h-[50px]" />,
  children,
  fixed = true,
  backgroundColor = "white",
}: React.PropsWithChildren<SimpleNavBarProps>) => {
  return (
    <header
      className={`ds:w-full ds:top-0 ds:z-50 ds:transition-all ds:duration-300 ${fixed ? "ds:sticky" : ""} ${backgroundColor === "yellow" ? "ds:border-core-grey-200 ds:border-b" : "ds:md:border-b-[0.25px] ds:border-transparent ds:md:border-ui-grey-300"}`}
      role="banner"
    >
      <nav
        aria-label="Simple navigation"
        className={`ds:flex ds:justify-between ds:items-center ds:h-20 ds:py-4 ds:px-5 ds:md:px-12 ds:w-full ds:relative ds:z-50 ${backgroundColor === "yellow" ? "ds:bg-core-yellow" : "ds:bg-core-white"}`}
      >
        <Link href="/" className="ds:cursor-pointer">
          {logo}
        </Link>
        {children}
      </nav>
    </header>
  );
};
