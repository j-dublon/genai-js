export interface FooterDisclaimerProps {
  footerDisclaimerText: string;
}

export const FooterDisclaimer = ({
  footerDisclaimerText,
}: FooterDisclaimerProps) => {
  return <p className="text-sm core-ui-grey-500">{footerDisclaimerText}</p>;
};
