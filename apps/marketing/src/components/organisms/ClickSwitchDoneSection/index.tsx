"use client";
import { Button, TimelineCardList } from "@react-component-library/ui";
import Link from "next/link";

import { getAssetPath } from "@/lib/get-asset-path";

import { timelineCardProps } from "./clickSwitchDoneProps";

export const ClickSwitchDoneSection = () => {
  return (
    <div className="bg-core-white flex justify-center items-center py-14 md:py-40 px-mobile sm:px-tablet lg:px-desktop ">
      <div className="flex flex-col md:gap-16 gap-8 max-w-[1152px]">
        <div className="max-w-[956px]">
          <div className="flex items-center md:pb-7 pb-8 gap-2">
            <h2 className="md:text-5xl text-[28px] font-bold md:pb-5 pb-3 leading-[1.2]">
              Click. Switch.
            </h2>
            <img
              src={getAssetPath("/images/done_button.svg")}
              alt="The word done in a pink coloured pill with an arrow icon pointing at it"
              className="w-32 md:w-56 h-auto"
            />
          </div>

          <p className="md:text-[26px] text-md font-normal">
            In literally just one click, we’ll handle the whole broadband move
            for you. That’s right – you won’t have to get in touch with your
            current provider at all. And if you prefer doing things over the
            phone, you can always call our dedicated UK-based switch team.
          </p>
        </div>

        <div className="flex md:flex-row flex-col">
          <TimelineCardList timelineCardProps={timelineCardProps} />
        </div>
        <Link href="/switching" passHref>
          <Button
            variant="outline"
            size="large"
            tint="white"
            aria-label={`Open website page`}
          >
            <span className="block md:hidden">Find out more</span>
            <span className="hidden md:block">
              Find out more about switching to Cuckoo
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
