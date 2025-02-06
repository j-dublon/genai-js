import { TrustpilotVertical } from "@components/molecules/TrustpilotVertical";
import { TwitterIcon } from "@icons/Twitter";
import { InstagramIcon } from "@icons/Instagram";
import { FacebookIcon } from "@icons/Facebook";
import { LinkedInIcon } from "@icons/LinkedIn";
import { FooterLinks, FooterLinksProps } from "./FooterLinks";
import { FooterDisclaimer } from "./FooterDisclaimer";

export interface Image {
  altText: string;
  imgSrc: string;
}

export interface FooterProps {
  titleText: string;
  trustScore: number;
  footerSections: FooterLinksProps["sections"];
  footerDisclaimerText: string;
}

export const Footer = ({
  titleText,
  trustScore,
  footerSections,
  footerDisclaimerText,
}: FooterProps) => {
  return (
    <footer className="bg-core-yellow flex md:justify-center md:items-center px-5 py-10 lg:pr-36  md:py-14">
      <div className="flex flex-col md:flex-row justify-between w-full md:max-w-[1200px]">
        <div className="flex flex-col md:flex-auto justify-between md:w-1/2 p-4">
          <div className="md:max-w-[313px] pt-9">
            <h2 className="font-bold text-4xl md:text-5xl">{titleText}</h2>
          </div>
          <div className="flex items-end space-x-12">
            {trustScore && (
              <div className="invisible md:visible">
                <TrustpilotVertical
                  width={144}
                  height={36}
                  trustScore={trustScore}
                />
              </div>
            )}
            <div className="flex space-x-8">
              <a
                className="flex items-end"
                href="https://www.instagram.com/cuckoobroadband/"
              >
                <InstagramIcon aria-label="Instagram" />
              </a>
              <a
                className="flex items-end"
                href="https://twitter.com/cuckoointernet"
              >
                <TwitterIcon aria-label="Twitter" />
              </a>
              <a
                className="flex items-end"
                href="https://www.facebook.com/cuckoointernet/"
              >
                <FacebookIcon aria-label="Facebook" />
              </a>
              <a
                className="flex items-end"
                href="https://www.linkedin.com/company/19113678/"
              >
                <LinkedInIcon aria-label="LinkedIn" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between md:w-1/2 p-4 space-y-8">
          <FooterLinks sections={footerSections} />
          {trustScore && (
            <div className="visible md:invisible">
              <TrustpilotVertical
                width={144}
                height={36}
                trustScore={trustScore}
              />
            </div>
          )}
          <FooterDisclaimer footerDisclaimerText={footerDisclaimerText} />
        </div>
      </div>
    </footer>
  );
};
