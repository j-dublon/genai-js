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
    <footer className="ds:bg-core-yellow ds:flex ds:md:justify-center ds:md:items-center ds:px-5 ds:py-10 ds:md:py-14 ds:md:px-36">
      <div className="ds:flex ds:flex-col ds:md:flex-row ds:md:justify-between ds:w-full ds:md:max-w-[1152px]">
        <div className="ds:flex ds:flex-col ds:md:flex-auto ds:md:justify-between ds:md:w-1/2">
          <div className="ds:max-w-[313px] ds:lg:max-w-[50%]">
            <h2 className="ds:font-bold ds:text-4xl ds:md:text-5xl">
              {titleText}
            </h2>
          </div>
          <div className="ds:flex ds:items-end ds:space-x-12 ds:pt-10 ds:md:pb-0 ds:md:pt-5 ds:pb-10">
            {trustScore !== undefined && (
              <div className="ds:hidden ds:md:block">
                <TrustpilotVertical
                  width={100}
                  height={36}
                  trustScore={trustScore}
                />
              </div>
            )}
            <div className="ds:flex ds:space-x-8">
              <a
                className="ds:flex ds:items-end"
                href="https://twitter.com/cuckoointernet"
                aria-label="Go to our twitter account"
              >
                <TwitterIcon />
              </a>
              <a
                className="ds:flex ds:items-end"
                href="https://www.instagram.com/cuckoobroadband/"
                aria-label="Go to our Instagram account"
              >
                <InstagramIcon />
              </a>
              <a
                className="ds:flex ds:items-end"
                href="https://www.facebook.com/cuckoointernet/"
                aria-label="Go to our Facebook account"
              >
                <FacebookIcon aria-label="Facebook" />
              </a>
              <a
                className="ds:flex ds:items-end"
                href="https://www.linkedin.com/company/19113678/"
                aria-label="Go to our Linkedin account"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
        <div className="ds:flex ds:flex-col ds:justify-between ds:md:w-1/2 ds:space-y-8">
          <FooterLinks sections={footerSections} />
          {trustScore && (
            <div className="ds:visible ds:md:invisible">
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
