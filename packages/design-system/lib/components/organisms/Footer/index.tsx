import React from "react";
import { TrustpilotVertical } from "@components/molecules/TrustpilotVertical";
import { TwitterIcon } from "@icons/Twitter";
import { InstagramIcon } from "@icons/Instagram";
import { FacebookIcon } from "@icons/Facebook";
import { LinkedInIcon } from "@icons/LinkedIn";
import { FooterLinks, FooterLinksProps } from "./FooterLinks";

export interface FooterProps {
  titleText: string;
  trustScore: number;
  footerSections: FooterLinksProps["sections"];
}

export const Footer: React.FC<FooterProps> = ({
  titleText,
  trustScore,
  footerSections,
}) => {
  return (
    <footer className="relative h-[471px] bg-[#FCFF59]">
      {/* Title Text */}
      <div className="absolute left-[144px] top-[85px] max-w-[313px]">
        <h2 className="font-bold text-[26px] md:text-5xl">{titleText}</h2>
      </div>

      {/* Footer Links */}
      <FooterLinks sections={footerSections} />

      {/* Trustpilot and Social Media Section */}
      <div className="absolute left-[144px] bottom-[56px] flex items-end space-x-[48px]">
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

      {/* Footer Disclaimer */}
      <p className="absolute bottom-8 left-[144px] text-sm text-gray-600">
        {/* Add any footer disclaimer here */}
      </p>
    </footer>
  );
};

Footer.displayName = "Footer";
