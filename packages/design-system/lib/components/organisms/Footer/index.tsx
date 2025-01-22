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
    <footer className="h-[471px] bg-[#FCFF59] flex justify-center items-center p-[144px]">
      {/* Title and Footer Links Section */}
      <div className="flex justify-between w-full max-w-[1200px]">
        <div className="flex flex-col justify-between w-1/2 p-4">
          <div className="max-w-[313px]">
            <h2 className="font-bold text-[26px] md:text-5xl">{titleText}</h2>
          </div>
          {/* Trustpilot and Social Media Section */}
          <div className="flex items-end space-x-12">
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
        <div className="flex flex-col justify-between w-1/2 p-4 space-y-8">
          <FooterLinks sections={footerSections} />
          <FooterDisclaimer footerDisclaimerText={footerDisclaimerText} />
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";
