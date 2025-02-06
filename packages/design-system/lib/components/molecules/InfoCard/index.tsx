import cx from "classnames";
import { ColorPill } from "@components/atoms/ColorPill";
import { FeatureText, FeatureTextProps } from "@components/atoms/FeatureText";
export interface InfoCardProps {
  titleText: string;
  colorPillText: string;
  colorPillBackgroundColor: string;
  infoCardBackgroundColor: string;
  contextText: string;
  additionalText?: string;
  buttonText?: string;
  featureTextProps?: FeatureTextProps;
}

export const InfoCard = ({
  titleText,
  colorPillText,
  colorPillBackgroundColor,
  infoCardBackgroundColor,
  contextText,
  additionalText,
  buttonText,
  featureTextProps,
}: InfoCardProps) => {
  return (
    <div
      className={`${additionalText || featureTextProps ? "md:max-w-[1152px] md:max-h-[409px] min-w-[350px] min-h-sm" : "w-fit h-fit"}`}
    >
      {featureTextProps && (
        <div>
          <FeatureText {...featureTextProps} />
        </div>
      )}

      <div
        className={cx(
          `p-5 ${featureTextProps ? "rounded-b-lg" : "rounded-lg"}  ${additionalText && "flex md:flex-row flex-col md:gap-16 gap-5"}`,
          `md:w-${additionalText ? "" : "fit"}`,
          infoCardBackgroundColor,
        )}
      >
        <div className={`md:p-5 ${additionalText && "md:w-[50%]"}`}>
          <h1 className="font-bold md:text-5xl text-4xl md:pb-7 pb-4">
            {titleText}
          </h1>
          <div className="md:pb-5 pb-2">
            <ColorPill
              colorPillText={colorPillText}
              backgroundColor={colorPillBackgroundColor}
            />
          </div>
          <div>
            <p className="md:text-[26px] text-[16px] md:font-light font-medium">
              {contextText}
            </p>
          </div>
        </div>
        {additionalText && (
          <div className="md:p-5 md:w-[75%]">
            <p className="pb-5 md:text-[26px] text-[16px] font-normal">
              {additionalText}
            </p>
            {buttonText && (
              <button className="rounded-md border-2 border-core-black p-4 font-bold md:text-[20px] text-[15px]">
                {buttonText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
