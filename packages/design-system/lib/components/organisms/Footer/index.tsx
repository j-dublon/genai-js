import { TrustpilotVertical } from "@components/molecules/TrustpilotVertical";
import { FacebookIcon } from "@icons/Facebook";
import { InstagramIcon } from "@icons/Instagram";
import { LinkedInIcon } from "@icons/LinkedIn";
import { TwitterIcon } from "@icons/Twitter";

import { FooterDisclaimer } from "./FooterDisclaimer";
import { FooterLinks, FooterLinksProps } from "./FooterLinks";

export interface FooterProps {
  titleText: string;
  trustScore?: number;
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
    <footer className="bg-core-yellow flex md:justify-center md:items-center px-5 py-5 md:pt-14 lg:py-10 lg:px-36  md:py-7">
      <div className="flex flex-col md:flex-row md:justify-between w-full md:max-w-[1152px]">
        <div className="flex flex-col md:flex-auto md:justify-between md:w-1/2">
          <div className="md:max-w-[313px]">
            <h2 className="font-bold text-4xl md:text-5xl">{titleText}</h2>
          </div>
          <div className="flex items-end space-x-12 pt-10 md:pb-0 md:pt-5 pb-10">
            {trustScore !== undefined && (
              <div className="hidden md:block">
                <TrustpilotVertical
                  width={100}
                  height={36}
                  trustScore={trustScore}
                />
              </div>
            )}
            <div className="flex space-x-8">
              <a
                className="flex items-end"
                href="https://twitter.com/cuckoointernet"
              >
                <TwitterIcon aria-label="Twitter" />
              </a>
              <a
                className="flex items-end"
                href="https://www.instagram.com/cuckoobroadband/"
              >
                <InstagramIcon aria-label="Instagram" />
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
        <div className="flex flex-col justify-between md:w-1/2 space-y-8">
          <FooterLinks sections={footerSections} />
          {trustScore && (
            <div className="visible md:invisible">
              <TrustpilotVertical
                width={100}
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
