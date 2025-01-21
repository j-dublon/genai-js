import React, { JSX } from "react";

//import from where?
import trustPilotScore from "../../../../public/images/trustPilotScore.png";
export interface FooterProps {
  titleText: string;
}

export function Footer(props: FooterProps): JSX.Element {
  const { titleText } = props;

  return (
    <div className="order-none z-10 p-10 w-fit">
      {/* footer heading */}
      <h2 className="md:w-[59%] font-bold md:text-5xl text-[26px]">
        {titleText}
      </h2>

      {/* column of footerlinks */}

      {/* Trust pilot score */}
      {/* social media links */}
      <TwitterIcon />
      <InstagramIcon />
      <FacebookIcon />
      <LinkedInIcon />
      {/* footer disclaimer */}
    </div>
  );
}

Footer.displayName = "Footer";
