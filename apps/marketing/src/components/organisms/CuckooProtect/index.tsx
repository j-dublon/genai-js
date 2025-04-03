"use client";
import { TextWithTickList } from "@react-component-library/ui";

import { getAssetPath } from "@/lib/get-asset-path";

import { textItems } from "./cuckooProtectProps";

export const CuckooProtect = () => {
  return (
    <section
      aria-label="Cuckoo Protect Section"
      className="relative z-10 order-none"
    >
      <video
        data-testid="cuckoo-protect-video"
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
      <div className="z-20 flex flex-col items-center py-10 md:justify-between w-full md:gap-14 md:py-40 px-mobile sm:px-tablet lg:px-desktop">
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
            <TextWithTickList textItems={textItems} />
          </div>
        </div>
      </div>
    </section>
  );
};
