"use client";
import { ImageMarquee } from "@react-component-library/ui";

import { imageMarqueeProps } from "./imageMarqueeProps";

export const LifeAtCuckoo = () => {
  return (
    <div className="bg-ui-grey-100 lg:py-40">
      <div className="flex justify-center items-center pb-16">
        <div className="py-14 px-5 lg:p-0 md:max-w-[1152px] w-full">
          <div className="md:max-w-[760px] w-full">
            <h2 className="md:text-5xl text-4xl font-semibold md:pb-5 pb-3">
              {imageMarqueeProps.headingText}
            </h2>

            <p className="md:text-[26px] text-xl font-normal">
              {imageMarqueeProps.paragraphText}
            </p>
          </div>
        </div>
      </div>
      <div className="md:py-5 md:px-10 w-full overflow-hidden flex">
        <ImageMarquee images={imageMarqueeProps.images} />
      </div>
    </div>
  );
};
