import { InfoCard, InfoCardProps } from "@components/molecules/InfoCard";

export interface CardSectionProps {
  infoCardContent: [InfoCardProps, InfoCardProps];
  detailedCardContent?: InfoCardProps;
}

export const CardSection = (props: CardSectionProps) => {
  const { infoCardContent, detailedCardContent } = props;

  return (
    <div className="flex flex-col md:items-center bg-core-white md:p-36 px-[20px] py-[56px]">
      <div className="flex md:flex-row flex-col justify-between gap-6 md:max-w-[1152px] pb-6 items-stretch">
        {infoCardContent.map((card, index) => (
          <InfoCard
            key={`${card.titleText}${index}`}
            titleText={card.titleText}
            colorPillText={card.colorPillText}
            subHeading={card.subHeading}
            colorPillBackgroundColor={card.colorPillBackgroundColor}
            infoCardBackgroundColor={card.infoCardBackgroundColor}
          />
        ))}
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
          featureTextProps={detailedCardContent.featureTextProps}
        />
      )}
    </div>
  );
};
