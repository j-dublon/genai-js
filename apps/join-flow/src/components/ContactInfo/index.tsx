interface ContactInfoProps {
  phoneNumber: string;
  openingHoursText: string;
}

export const ContactInfo = ({
  phoneNumber,
  openingHoursText,
}: ContactInfoProps) => {
  const numberWithoutSpaces = phoneNumber.replace(/\s/g, "");

  return (
    <>
      <span className="md:hidden">Prefer to talk to a person? </span>
      <span>Call us on </span>
      <a
        href={`tel:${numberWithoutSpaces}`}
        className="font-normal md:font-medium underline pointer-events-auto text-ui-link"
        aria-label={`Call us directly on ${phoneNumber}`}
      >
        {phoneNumber}
      </a>
      <span>. {openingHoursText}</span>
    </>
  );
};
