type TermsAndConditionsProps = {
  termsAndConditionsText: string;
};

export const TermsAndConditions = ({
  termsAndConditionsText,
}: TermsAndConditionsProps) => {
  return (
    <div className="px-5 py-1.75 text-xs font-normal md:block hidden">
      <div className="max-w-[1152px] mx-auto">{termsAndConditionsText}</div>
    </div>
  );
};
