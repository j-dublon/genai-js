"use client";
import { Button } from "@react-component-library/ui";

import { NavBar } from "@/components/NavBar";
import { getAssetPath } from "@/lib/get-asset-path";

export interface ErrorPageProps {
  title: string;
  button?: {
    text: string;
    onClick: () => void;
  };
  paragraphs: string[];
}

export const ErrorPage = ({
  title,
  button,
  paragraphs = [],
}: ErrorPageProps) => {
  const errorParagraphs = paragraphs.map((value, index) => (
    <p
      key={index}
      className="text-xs leading-[160%] font-normal md:text-sm md:leading-[162.5%]"
    >
      {value}
    </p>
  ));

  return (
    <div className="w-full">
      <NavBar isContentPage={true} />
      <div className="relative flex min-h-[calc(100vh-100px)] flex-row overflow-x-hidden px-6 pt-4 pb-10 md:py-20 md:px-40">
        <div className="pointer-events-none absolute top-[-50px] left-[800px] -z-10 hidden h-[850px] w-[850px] md:block">
          <img
            role="presentation"
            src={getAssetPath("/images/3d_evolve_full.png")}
            alt=""
            className="scale-x-[-1] rotate-[-65deg] transform"
            aria-hidden="true"
          />
        </div>
        <div className="flex w-full flex-col gap-2 md:gap-4 items-start sm:max-w-[565px]">
          <h1 className="text-[26px] leading-[150%] font-semibold md:text-5xl md:leading-[120%]">
            {title}
          </h1>

          {errorParagraphs}

          {button && (
            <Button
              onClick={button.onClick}
              size="large"
              variant="solid"
              tint="yellow"
              type="button"
              className="mt-4"
              fullWidth
            >
              {button.text}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
