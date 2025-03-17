"use client";
import { InfoCard } from "@react-component-library/ui";

import { getAssetPath } from "@/lib/get-asset-path";

import { InfoCardProps, props } from "./cardSectionWrapperProps";

export interface CardSectionProps {
  cardSectionHeading: string;
  cardSectionText: string;
  infoCardContent: [InfoCardProps, InfoCardProps];
  detailedCardContent?: InfoCardProps;
}

export const CardSectionWrapper = () => {
  const {
    cardSectionHeading,
    cardSectionText,
    infoCardContent,
    detailedCardContent,
  } = props;

  return (
    <div className="flex flex-col md:items-center bg-core-white py-12 gap-6 px-mobile sm:px-tablet lg:px-desktop">
      <div className="relative flex flex-col bg-ui-grey-200 justify-between md:gap-12 gap-6 md:max-w-[1152px] md:pb-6.5 md:pt-12 pt-6 items-stretch rounded-lg">
        <div className="md:px-10 px-5 flex gap-6 relative z-10">
          <div className="flex flex-col gap-6 md:w-1/2">
            <h1 className="font-semibold md:text-5xl text-4xl">
              {cardSectionHeading}
            </h1>
            <p className="font-normal md:text-md text-[16px]">
              {cardSectionText}
            </p>
          </div>
        </div>

        <div className="absolute top-0 right-0 h-full overflow-hidden hidden md:block">
          <img
            src={getAssetPath("/images/3d_evolve.svg")}
            alt="Egg slices with white and pink colours"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative flex flex-col bg-core-pink md:bg-transparent md:flex-row md:gap-6 md:px-6 z-20 rounded-lg">
          {infoCardContent.map((card) => (
            <InfoCard
              key={`${card.titleText} ?? ${card.colorPillText}`}
              colorPillText={card.colorPillText}
              colorPillBackgroundColor={card.colorPillBackgroundColor}
              infoCardBackgroundColor={card.infoCardBackgroundColor}
              listItems={card.listItems}
            />
          ))}
        </div>
      </div>

      {detailedCardContent && (
        <InfoCard
          titleText={detailedCardContent.titleText}
          colorPillText={detailedCardContent.colorPillText}
          subHeading={detailedCardContent.subHeading}
          colorPillBackgroundColor={
            detailedCardContent.colorPillBackgroundColor
          }
          infoCardBackgroundColor={detailedCardContent.infoCardBackgroundColor}
          additionalText={detailedCardContent.additionalText}
          buttonText={detailedCardContent.buttonText}
          featureImageProps={detailedCardContent.featureImageProps}
        />
      )}
    </div>
  );
};
