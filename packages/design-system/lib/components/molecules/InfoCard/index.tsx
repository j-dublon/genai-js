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
          ? "ds:md:max-w-[1152px] ds:md:min-w-[564px] ds:min-w-0"
          : "ds:md:flex ds:md:flex-col ds:md:w-1/2"
      }`}
    >
      {featureImageProps && <FeatureImage {...featureImageProps} />}

      <div
        className={cx(
          {
            "ds:md:px-10 ds:px-5 ds:md:py-15 ds:py-6": additionalText,
            "ds:p-6": !additionalText,
            "ds:rounded-b-lg": featureImageProps,
            "ds:rounded-lg": !featureImageProps,
            "ds:flex ds:md:flex-row ds:flex-col ds:md:gap-6 ds:gap-5":
              additionalText,
          },
          bgColorVariants[infoCardBackgroundColor],
          "ds:flex-1",
        )}
      >
        {titleText && subHeading ? (
          <div
            className={`ds:flex ds:flex-col ds:md:gap-10 ds:gap-4 ${additionalText && "ds:md:w-[50%]"}`}
          >
            <h1 className="ds:font-bold ds:md:text-5xl ds:text-4xl">
              {titleText}
            </h1>
            <div className="ds:flex ds:flex-col ds:gap-3">
              <div className="ds:pb-2 ds:w-fit">
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
                      ? "ds:md:text-[26px] ds:text-md ds:font-semibold"
                      : "ds:md:text-5xl ds:text-4xl ds:font-semibold"
                  }
                >
                  {subHeading}
                </h2>
              </div>
            </div>
          </div>
        ) : (
          <div {...(additionalText ? { className: "ds:md:w-[50%]" } : {})}>
            {titleText && (
              <h1 className="ds:font-bold ds:md:text-5xl ds:text-4xl ds:md:pb-7 ds:pb-4 ds:w-3/4">
                {titleText}
              </h1>
            )}
            <div className="ds:pb-5 ds:w-fit">
              <ColorPill
                colorPillText={colorPillText}
                backgroundColor={colorPillBackgroundColor}
                size="medium"
              />
            </div>

            {listItems && (
              <ul className="ds:list-disc ds:pl-5">
                {listItems.map((item) => (
                  <li
                    key={item}
                    className="ds:md:font-medium ds:font-semibold ds:md:text-md ds:text-[16px] ds:mb-2"
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
                      ? "ds:md:text-[26px] ds:text-md ds:md:font-light ds:font-semibold"
                      : "ds:md:text-5xl ds:text-4xl ds:font-semibold"
                  }
                >
                  {subHeading}
                </p>
              )}
            </div>
          </div>
        )}

        {additionalText && (
          <div className="ds:md:w-[55%]">
            <p className="ds:pb-9 ds:md:text-[20px] ds:text-[16px] ds:font-normal ds:whitespace-pre-line">
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
