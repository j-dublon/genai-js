import React from "react";

export interface FooterDisclaimerProps {
  footerDisclaimerText: string;
}

export const FooterDisclaimer: React.FC<FooterDisclaimerProps> = ({
  footerDisclaimerText,
}) => {
  return <p className="text-sm core-ui-grey-500">{footerDisclaimerText}</p>;
};
