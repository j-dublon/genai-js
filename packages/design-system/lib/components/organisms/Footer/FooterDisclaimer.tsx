export interface FooterDisclaimerProps {
  footerDisclaimerText: string;
}

export const FooterDisclaimer: React.FC<FooterDisclaimerProps> = ({
  footerDisclaimerText,
}) => {
  return (
    <p className="text-sm text-[#565656] max-w-[313px]">
      {footerDisclaimerText}
    </p>
  );
};
