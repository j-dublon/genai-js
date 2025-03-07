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
        "ds:relative ds:overflow-x-hidden ds:md:py-5 ds:md:px-10 ds:w-full",
        backgroundColor,
      )}
    >
      <div className="ds:hidden ds:md:flex ds:justify-around">
        {logos.map((logo: CompanyLogoProps, index: number) => (
          <div key={index} className="ds:m-4 ds:flex">
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
      <div className="ds:animate-marquee ds:whitespace-nowrap ds:flex ds:justify-around ds:md:hidden">
        {logos.map((logo: CompanyLogoProps, index: number) => (
          <div key={index} className="ds:m-4 ds:flex">
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
      <div className="ds:md:hidden ds:absolute ds:top-0 ds:animate-marquee2 ds:whitespace-nowrap ds:flex ds:justify-around">
        {logos.map((logo: CompanyLogoProps, index: number) => (
          <div key={index} className="ds:m-4 ds:flex">
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
  );
};
