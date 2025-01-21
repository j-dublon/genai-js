import { JSX } from "react";
import { TrustpilotVertical } from "@components/molecules/TrustpilotVertical";
import { TwitterIcon } from "@icons/Twitter";
import { InstagramIcon } from "@icons/Instagram";
import { FacebookIcon } from "@icons/Facebook";
import { LinkedInIcon } from "@icons/LinkedIn";

export interface FooterProps {
  titleText: string;
  trustScore: number;
  numberOfReviews: number;
}

export function Footer(props: FooterProps): JSX.Element {
  const { titleText, trustScore, numberOfReviews } = props;

  return (
    <div className="order-none z-10 p-10 w-fit">
      <h2 className="md:w-[59%] font-bold md:text-5xl text-[26px]">
        {titleText}
      </h2>

      {/* Icon Group with TrustPilot Score */}
      <div className="flex items-center mt-8">
        {/* <img src={trustPilotScore} alt="TrustPilot Score" className="mr-12" /> */}

        {/* Social Media Icons */}
        <div className="flex space-x-8">
          <TrustpilotVertical
            trustScore={trustScore}
            numberOfReviews={numberOfReviews}
          />
          <InstagramIcon />
          <TwitterIcon />
          <FacebookIcon />
          <LinkedInIcon />
        </div>
      </div>

      {/* Footer Disclaimer */}
      <p className="mt-8 text-sm text-gray-600">
        {/* Add any footer disclaimer here */}
      </p>
    </div>
  );
}

Footer.displayName = "Footer";
