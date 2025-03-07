"use client";
import { TextWithTickList } from "@react-component-library/ui";
import { ComponentProps } from "react";

import { getAssetPath } from "@/lib/get-asset-path";

export const CuckooProtect = () => {
  const TextItemList: ComponentProps<typeof TextWithTickList> = {
    TextWithTickList: [
      {
        textInput: "Included for free (worth £XX/month)",
        broadbandOffer: true,
      },
      {
        textInput: "Parental controls",
        backgroundColor: "yellow",
      },
      {
        textInput: "Guest networks",
        backgroundColor: "yellow",
      },
      { textInput: "Ad and app blocking", backgroundColor: "yellow" },
      {
        textInput: "Automatic security updates",
        backgroundColor: "yellow",
      },
    ],
  };

  return (
    <div className="relative z-10 order-none">
      <video
        data-test-id="cuckoo-protect-video"
        autoPlay
        playsInline
        loop
        muted
        className="absolute order-1 h-full w-full object-cover col-start-5 col-span-8 row-start-1 row-span-3 -z-10"
      >
        <source
          src="https://cuckoo-egg.cdn.prismic.io/cuckoo-egg/Z7S70p7c43Q3f74L_Cuckooprotect_motion_bg.mp4"
          type="video/mp4"
        />
      </video>
      <div className="z-20 flex flex-col items-center p-10 md:justify-between w-full md:gap-14 bg-cover bg-center md:py-40 md:px-36">
        <div className="flex flex-col md:flex-row rounded-[22px] bg-core-white w-full md:max-w-[1152px] h-fit md:col-start-1 md:col-span-6 md:row-start-2 md:px-10 md:py-16 gap-7 py-6 px-5">
          <div className="flex-2 flex flex-col gap-7 min-w-0">
            <img
              src={getAssetPath("/images/cuckoo_protect_logo.svg")}
              alt="Cuckoo protect logo"
              className="md:w-[337px] w-[250px]"
            />
            <p className="md:text-md text-[16px] font-normal">
              Security and privacy are absolute broadband essentials. Which is
              why every single one of our plans comes with advanced protection,
              built-in.
              <br />
              <br /> From website blocking to to anti-virus software, it’s
              complete peace of mind (and a hacker’s nightmare) when it comes to
              staying safe online.
            </p>
          </div>
          <div className="flex-2 flex flex-col gap-2 min-w-0 font-medium">
            <TextWithTickList
              TextWithTickList={TextItemList.TextWithTickList}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
