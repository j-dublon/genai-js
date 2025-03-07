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
      <div className="ds:hidden ds:md:flex ds:justify-between ds:max-w-[1152px] ds:mx-auto ds:mt-1">
        {logos.map((logo: CompanyLogoProps, index: number) => (
          <div key={index} className="ds:flex">
            <img
              alt={logo.altText}
              loading="lazy"
              width={logo.width}
              height={logo.height}
              src={logo.imgSrc}
            />
          </div>
        ))}
      </div>
      <div className="ds:md:hidden ds:relative ds:overflow-hidden ds:mt-4">
        <div className="ds:animate-marquee ds:whitespace-nowrap ds:flex ds:justify-between ds:w-[800px]">
          {logos.map((logo: CompanyLogoProps, index: number) => (
            <div key={index} className="flex">
              <img
                alt={logo.altText}
                loading="lazy"
                width={logo.width}
                height={logo.height}
                src={logo.imgSrc}
              />
            </div>
          ))}
        </div>
        <div className="ds:absolute ds:top-0 ds:animate-marquee2 ds:whitespace-nowrap ds:flex ds:justify-between ds:w-[800px] ds:ml-[75px]">
          {logos.map((logo: CompanyLogoProps, index: number) => (
            <div key={index} className="ds:flex">
              <img
                alt={logo.altText}
                loading="lazy"
                width={logo.width}
                height={logo.height}
                src={logo.imgSrc}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
