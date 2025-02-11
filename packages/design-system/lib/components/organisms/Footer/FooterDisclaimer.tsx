export interface FooterDisclaimerProps {
  footerDisclaimerText: string;
}

export const FooterDisclaimer = ({
  footerDisclaimerText,
}: FooterDisclaimerProps) => {
  return (
    <p className="text-xs core-ui-grey-500 whitespace-pre-line">
      {footerDisclaimerText}
    </p>
  );
};
