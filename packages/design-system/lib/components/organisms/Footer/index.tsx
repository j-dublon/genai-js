import React from "react";
import { TrustpilotVertical } from "@components/molecules/TrustpilotVertical";
import { TwitterIcon } from "@icons/Twitter";
import { InstagramIcon } from "@icons/Instagram";
import { FacebookIcon } from "@icons/Facebook";
import { LinkedInIcon } from "@icons/LinkedIn";
import { FooterLinks, FooterLinksProps } from "./FooterLinks";
import { FooterDisclaimer } from "./FooterDisclaimer";

export interface FooterProps {
  titleText: string;
  trustScore: number;
  footerSections: FooterLinksProps["sections"];
  footerDisclaimerText: string;
}

export const Footer: React.FC<FooterProps> = ({
  titleText,
  trustScore,
  footerSections,
  footerDisclaimerText,
}) => {
  return (
    <footer className="h-[471px] bg-[#FCFF59] flex flex-col justify-between p-[144px]">
      {/* Title and Footer Links Section */}
      <div className="flex justify-between bg-core-blue">
        <div className="flex flex-col justify-between">
          <div className="max-w-[313px]">
            <h2 className="font-bold text-[26px] md:text-5xl">{titleText}</h2>
          </div>
          {/* Trustpilot and Social Media Section */}
          <div className="flex items-end">
            {/* Trustpilot Section */}
            <TrustpilotVertical trustScore={trustScore} />

            {/* Social Media Icons */}
            <div className="flex space-x-8">
              <div className="flex items-end">
                <InstagramIcon />
              </div>
              <div className="flex items-end">
                <TwitterIcon />
              </div>
              <div className="flex items-end">
                <FacebookIcon />
              </div>
              <div className="flex items-end">
                <LinkedInIcon />
              </div>
            </div>
          </div>
        </div>
        {/* Footer Links Section */}
        <div className="space-y-8 bg-core-pink">
          <FooterLinks sections={footerSections} />
          <FooterDisclaimer footerDisclaimerText={footerDisclaimerText} />
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";
