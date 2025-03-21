import cx from "classnames";

interface CompanyLogoProps {
  altText: string;
  width: string;
  height: string;
  imgSrc: string;
}

export interface CompanyLogoStripProps {
  logos: CompanyLogoProps[];
  backgroundColor?: string;
}

const LogoSet = ({
  logos,
  keyPrefix,
}: CompanyLogoStripProps & {
  keyPrefix: "desktop" | "mobile-1" | "mobile-2";
}) => {
  return (
    <div className="ds:flex ds:justify-between ds:gap-3 ds:w-[1152px]">
      {logos.map((logo: CompanyLogoProps) => (
        <div
          key={`${keyPrefix}-${logo.altText}`}
          className="ds:flex ds:items-center"
        >
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
  );
};

export const CompanyLogoStrip = ({
  logos,
  backgroundColor,
}: CompanyLogoStripProps) => {
  return (
    <div
      className={cx(
        "ds:relative ds:overflow-x-hidden ds:pt-4 ds:pb-10 ds:md:pt-[30px] ds:md:px-tablet ds:lg:px-desktop ds:w-full",
        backgroundColor,
      )}
    >
      <p className="ds:max-w-[1152px] ds:px-mobile ds:sm:px-tablet ds:lg:px-0 ds:lg:mx-auto ds:font-semibold ds:text-core-black">
        Trusted by
      </p>

      <div
        data-testid="desktop-logo-container"
        className="ds:hidden ds:md:flex ds:max-w-[1152px] ds:mx-auto ds:mt-1 ds:opacity-70"
      >
        <LogoSet logos={logos} keyPrefix="desktop" />
      </div>

      <div
        data-testid="mobile-logo-container"
        className="ds:md:hidden ds:flex ds:flex-in-line ds:overflow-hidden ds:mt-4 ds:opacity-70"
      >
        <div className="ds:animate-marquee ds:mr-12">
          <LogoSet logos={logos} keyPrefix="mobile-1" />
        </div>
        <div className="ds:animate-marquee ds:mr-12" aria-hidden="true">
          <LogoSet logos={logos} keyPrefix="mobile-2" />
        </div>
      </div>
    </div>
  );
};
