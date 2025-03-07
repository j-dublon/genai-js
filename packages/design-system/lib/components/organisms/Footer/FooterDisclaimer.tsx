export interface FooterDisclaimerProps {
  footerDisclaimerText: string;
}

export const FooterDisclaimer = ({
  footerDisclaimerText,
}: FooterDisclaimerProps) => {
  return (
    <p className="ds:text-xs ds:core-ui-grey-500 ds:whitespace-pre-line">
      {footerDisclaimerText}
    </p>
  );
};
