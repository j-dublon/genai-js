import cx from "classnames";

export interface CompanyLogoStripProps {
  logos: CompanyLogoProps[];
  backgroundColor?: string;
}

type CompanyLogoProps = {
  altText: string;
  width: string;
  height: string;
  imgSrc: string;
};

export const CompanyLogoStrip = ({
  logos,
  backgroundColor,
}: CompanyLogoStripProps) => {
  return (
    <div
      className={cx(
        "ds:relative ds:overflow-x-hidden ds:pt-4 ds:pb-[40px] ds:md:pt-[30px] ds:md:px-36 ds:w-full",
        backgroundColor,
      )}
    >
      <p className="ds:max-w-[1152px] ds:mx-auto ds:px-5 ds:md:px-0 ds:font-semibold ds:text-core-black">
        Trusted by
      </p>
      <div className="ds:hidden ds:md:flex ds:justify-between ds:gap-3 ds:max-w-[1152px] ds:mx-auto ds:mt-1 ds:opacity-70">
        {logos.map((logo: CompanyLogoProps, index: number) => (
          <div key={index} className="ds:flex ds:items-center">
            <img
              alt={logo.altText}
              loading="lazy"
              width={logo.width}
              src={logo.imgSrc}
              className={`ds:max-h-[${logo.height}px] ds:object-contain`}
            />
          </div>
        ))}
      </div>
      <div className="ds:md:hidden ds:relative ds:overflow-hidden ds:mt-4 ds:opacity-70">
        <div className="ds:animate-marquee ds:whitespace-nowrap ds:flex ds:justify-between ds:w-[1152px] ds:gap-3">
          {logos.map((logo: CompanyLogoProps, index: number) => (
            <div key={index} className="ds:flex ds:items-center">
              <img
                alt={logo.altText}
                loading="lazy"
                width={logo.width}
                src={logo.imgSrc}
                className={`ds:max-h-[${logo.height}px] ds:object-contain`}
              />
            </div>
          ))}
        </div>
        <div className="ds:absolute ds:top-0 ds:left-[5vw] ds:animate-marquee2 ds:whitespace-nowrap ds:flex ds:justify-between ds:w-[1152px] ds:gap-3">
          {logos.map((logo: CompanyLogoProps, index: number) => (
            <div key={index} className="ds:flex ds:items-center">
              <img
                alt={logo.altText}
                loading="lazy"
                width={logo.width}
                src={logo.imgSrc}
                className={`ds:max-h-[${logo.height}px] ds:object-contain`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
