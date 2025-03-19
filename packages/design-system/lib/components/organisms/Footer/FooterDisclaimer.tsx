export interface FooterDisclaimerProps {
  footerDisclaimerText: string;
}

export const FooterDisclaimer = ({
  footerDisclaimerText,
}: FooterDisclaimerProps) => {
  return (
    <p className="ds:text-[12px] ds:core-ui-grey-500 ds:whitespace-pre-line ds:leading-[1.6]">
      {footerDisclaimerText}
    </p>
  );
};
