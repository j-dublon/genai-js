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
  trustPilotLogo: {
    altText: string;
    imgSrc: string;
  };
}

export const Footer: React.FC<FooterProps> = ({
  titleText,
  trustScore,
  footerSections,
  footerDisclaimerText,
  trustPilotLogo,
}) => {
  return (
    <footer className="bg-[#FCFF59] flex justify-center items-center p-[144px]">
      <div className="flex justify-between w-full max-w-[1200px]">
        <div className="flex flex-col justify-between w-1/2 p-4">
          <div className="max-w-[313px]">
            <h2 className="font-bold text-[26px] md:text-5xl">{titleText}</h2>
          </div>
          <div className="flex items-end space-x-12">
            <TrustpilotVertical
              width={128}
              height={72}
              trustScore={trustScore}
              trustPilotLogo={trustPilotLogo}
            />
            <div className="flex space-x-8">
              <div className="flex items-end">
                <InstagramIcon aria-label="Instagram" />
              </div>
              <div className="flex items-end">
                <TwitterIcon aria-label="Twitter" />
              </div>
              <div className="flex items-end">
                <FacebookIcon aria-label="Facebook" />
              </div>
              <div className="flex items-end">
                <LinkedInIcon aria-label="LinkedIn" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between w-1/2 p-4 space-y-8">
          <FooterLinks sections={footerSections} />
          <FooterDisclaimer footerDisclaimerText={footerDisclaimerText} />
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";
