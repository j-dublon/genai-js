import { Button } from "@components/atoms/Button";
import { ColorPill } from "@components/atoms/ColorPill";
import {
  FeatureImage,
  FeatureImageProps,
} from "@components/atoms/FeatureImage";
import { BackgroundColors } from "@lib/types";
import { bgColorVariants } from "@lib/variants";
import cx from "classnames";

export interface InfoCardProps {
  titleText?: string;
  colorPillText: string;
  colorPillBackgroundColor: BackgroundColors;
  infoCardBackgroundColor: BackgroundColors;
  subHeading?: string;
  additionalText?: string;
  buttonText?: string;
  featureImageProps?: FeatureImageProps;
  listItems?: string[];
}

export const InfoCard = ({
  titleText,
  colorPillText,
  colorPillBackgroundColor,
  infoCardBackgroundColor,
  subHeading,
  additionalText,
  buttonText,
  featureImageProps,
  listItems,
}: InfoCardProps) => {
  return (
    <div
      className={`${
        additionalText || featureImageProps
          ? "md:max-w-[1152px] md:min-w-[564px] min-w-0"
          : "md:flex md:flex-col md:w-1/2"
      }`}
    >
      {featureImageProps && <FeatureImage {...featureImageProps} />}

      <div
        className={cx(
          {
            "md:px-10 px-5 md:py-15 py-6": additionalText,
            "p-6": !additionalText,
            "rounded-b-lg": featureImageProps,
            "rounded-lg": !featureImageProps,
            "flex md:flex-row flex-col md:gap-6 gap-5": additionalText,
          },
          bgColorVariants[infoCardBackgroundColor],
          `md:w-${additionalText ? "" : "fit"} flex-1`,
        )}
      >
        {titleText && subHeading ? (
          <div
            className={`flex flex-col md:gap-10 gap-4 ${additionalText && "md:w-[50%]"}`}
          >
            <h1 className="font-bold md:text-5xl text-4xl">{titleText}</h1>
            <div className="flex flex-col gap-3">
              <div className="pb-2 w-fit">
                <ColorPill
                  colorPillText={colorPillText}
                  backgroundColor={colorPillBackgroundColor}
                  size="medium"
                />
              </div>
              <div>
                <h2
                  className={
                    titleText
                      ? "md:text-[26px] text-md font-semibold"
                      : "md:text-5xl text-4xl font-semibold"
                  }
                >
                  {subHeading}
                </h2>
              </div>
            </div>
          </div>
        ) : (
          <div {...(additionalText ? { className: "md:w-[50%]" } : {})}>
            {titleText && (
              <h1 className="font-bold md:text-5xl text-4xl md:pb-7 pb-4 w-3/4">
                {titleText}
              </h1>
            )}
            <div className="pb-5 w-fit">
              <ColorPill
                colorPillText={colorPillText}
                backgroundColor={colorPillBackgroundColor}
                size="medium"
              />
            </div>

            {listItems && (
              <ul className="list-disc pl-5">
                {listItems.map((item, index) => (
                  <li
                    key={`${item}${index}`}
                    className="md:font-medium font-semibold md:text-md text-[16px] mb-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}

            <div>
              {subHeading && (
                <p
                  className={
                    titleText
                      ? "md:text-[26px] text-md md:font-light font-semibold"
                      : "md:text-5xl text-4xl font-semibold"
                  }
                >
                  {subHeading}
                </p>
              )}
            </div>
          </div>
        )}

        {additionalText && (
          <div className="md:w-[55%]">
            <p className="pb-9 md:text-[20px] text-[16px] font-normal whitespace-pre-line">
              {additionalText}
            </p>
            {buttonText && (
              <Button aria-label={`Open ${buttonText} page`}>
                {buttonText}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
