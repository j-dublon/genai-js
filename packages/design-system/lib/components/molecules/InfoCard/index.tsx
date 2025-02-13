import { ColorPill } from "@components/atoms/ColorPill";
import { FeatureText, FeatureTextProps } from "@components/atoms/FeatureText";
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
  featureTextProps?: FeatureTextProps;
}

export const InfoCard = ({
  titleText,
  colorPillText,
  colorPillBackgroundColor,
  infoCardBackgroundColor,
  subHeading,
  additionalText,
  buttonText,
  featureTextProps,
}: InfoCardProps) => {
  return (
    <div
      className={`${additionalText || featureTextProps ? "md:max-w-[1152px] md:min-w-[564px] min-w-[350px] min-h-sm" : "flex flex-col"}`}
    >
      {featureTextProps && <FeatureText {...featureTextProps} />}

      <div
        className={cx(
          `p-5 ${featureTextProps ? "rounded-b-lg" : "rounded-lg"} ${additionalText && "flex md:flex-row flex-col md:gap-16 gap-5"} ${bgColorVariants[infoCardBackgroundColor]}`,
          `md:w-${additionalText ? "" : "fit"} flex-1`,
        )}
      >
        {titleText && subHeading ? (
          <div className={`md:p-5 ${additionalText && "md:w-[55%]"}`}>
            <h1 className="font-bold md:text-5xl text-4xl md:pb-7 pb-4">
              {titleText}
            </h1>
            <div>
              <p
                className={
                  titleText
                    ? "md:text-[26px] text-[16px] md:font-light font-semibold"
                    : "md:text-5xl text-4xl font-semibold"
                }
              >
                {subHeading}
              </p>
            </div>
            <div className="md:pt-5 pb-2 w-fit">
              <ColorPill
                colorPillText={colorPillText}
                backgroundColor={colorPillBackgroundColor}
              />
            </div>
          </div>
        ) : (
          <div className={`md:p-5 ${additionalText && "md:w-[50%]"}`}>
            {titleText && (
              <h1 className="font-bold md:text-5xl text-4xl md:pb-7 pb-4">
                {titleText}
              </h1>
            )}
            <div className="md:pt-5 pb-7 w-fit">
              <ColorPill
                colorPillText={colorPillText}
                backgroundColor={colorPillBackgroundColor}
              />
            </div>

            <div>
              {subHeading && (
                <p
                  className={
                    titleText
                      ? "md:text-[26px] text-[16px] md:font-light font-semibold"
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
          <div className="md:p-5 md:w-[75%]">
            <p className="pb-5 md:text-[26px] text-[16px] font-normal whitespace-pre-line">
              {additionalText}
            </p>
            {buttonText && (
              <button
                className="rounded-md border-2 border-core-black p-4 font-bold md:text-[20px] text-[15px]"
                aria-label={`Open ${buttonText} page`}
              >
                {buttonText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
