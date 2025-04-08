import { TextWithTickList } from "@react-component-library/ui";
import Image from "next/image";

import { getAssetPath } from "@/lib/get-asset-path";

import { featureImage, heading, reminders } from "./RemindersProps";

export const Reminders = () => {
  return (
    <section
      className="bg-core-white px-mobile sm:px-tablet lg:px-desktop py-10 md:pt-17 md:pb-12"
      aria-label="Reminders section"
    >
      <div className="md:max-w-[1152px] mx-auto">
        <div className="flex flex-col md:flex-row w-full gap-6 md:gap-0">
          <div className="flex flex-col gap-8 md:gap-10 md:w-1/2">
            <h2 className="font-semibold leading-[1.5] md:leading-[1.4] text-[26px] md:text-3xl md:max-w-[522px]">
              {heading}
            </h2>
            <div className="flex flex-col gap-4">
              <TextWithTickList textItems={reminders} />
            </div>
          </div>
          <div className="md:w-1/2 overflow-hidden flex items-center justify-center">
            <Image
              src={getAssetPath(featureImage.src)}
              alt={featureImage.alt}
              width={300}
              height={300}
              className="relative max-w-[50vw] md:w-full h-auto md:-right-[15px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
