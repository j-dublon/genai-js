"use client";
import { ImageMarquee } from "@react-component-library/ui";

import { imageMarqueeProps } from "./imageMarqueeProps";

export const LifeAtCuckoo = () => {
  return (
    <section
      aria-label="Life at Cuckoo"
      className="bg-ui-grey-100 py-14 md:py-40"
    >
      <div className="flex justify-center items-center md:pb-16 pb-10 px-mobile sm:px-tablet lg:px-desktop">
        <div className="w-full lg:max-w-[1152px]">
          <div className="md:max-w-[760px] w-full">
            <h2 className="md:text-5xl text-3xl font-semibold md:pb-5 pb-3 leading-[1.4] md:leading-[1.2]">
              {imageMarqueeProps.headingText}
            </h2>

            <p className="md:text-[26px] text-md font-normal">
              {imageMarqueeProps.paragraphText}
            </p>
          </div>
        </div>
      </div>
      <ImageMarquee images={imageMarqueeProps.images} />
    </section>
  );
};
