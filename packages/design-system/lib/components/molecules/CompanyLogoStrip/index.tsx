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
        "relative overflow-x-hidden md:py-5 md:px-10 w-full",
        backgroundColor,
      )}
    >
      <div className="hidden md:flex justify-around">
        {logos.map((logo: CompanyLogoProps, index: number) => (
          <div key={index} className="m-4 flex">
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
      <div className="animate-marquee whitespace-nowrap flex justify-around md:hidden">
        {logos.map((logo: CompanyLogoProps, index: number) => (
          <div key={index} className="m-4 flex">
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
      <div className="md:hidden absolute top-0 animate-marquee2 whitespace-nowrap flex justify-around">
        {logos.map((logo: CompanyLogoProps, index: number) => (
          <div key={index} className="m-4 flex">
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
