import React from "react";

interface Props {
  text: string;
}

export const PhoneTextContent = ({ text }: Props) => {
  // UK phone number regex
  // Matches formats like:
  // 0330 912 9955
  // 03309129955
  // +44 330 912 9955
  // +44 (0)330 912 9955
  // 44 20 1234 5678
  const phoneRegex =
    /(?:\+?44\s?(?:\(0\))?\s?|0)\s?\d{2,5}[\s-]?\d{3,4}[\s-]?\d{3,4}/g;

  // Split the text by phone numbers
  const parts = text.split(phoneRegex);
  const matches = text.match(phoneRegex) || [];

  const formatPhoneNumber = (number: string) => {
    // First remove spaces, parentheses, and dashes
    let cleaned = number.replace(/[\s()-]/g, "");

    // Remove any 0 that follows +44 or 44
    cleaned = cleaned.replace(/^(?:\+44|44)0+/, "44");

    // Convert UK numbers starting with 0
    if (cleaned.startsWith("0")) {
      return `+44${cleaned.substring(1)}`;
    }

    // Add + to numbers starting with 44 if not present
    if (cleaned.startsWith("44")) {
      return `+${cleaned}`;
    }

    return cleaned;
  };

  return (
    <>
      {parts.map((part, i) => {
        if (i === parts.length - 1) {
          return (
            <React.Fragment key={`text-section-${part}`}>{part}</React.Fragment>
          );
        }

        const phoneNumber = matches[i];
        const formattedNumber = formatPhoneNumber(phoneNumber);

        return (
          <React.Fragment key={`phone-section-${formattedNumber}`}>
            {part}
            {phoneNumber && (
              <a
                href={`tel:${formattedNumber}`}
                className="ds:text-inherit ds:underline ds:pointer-events-auto ds:md:no-underline ds:md:pointer-events-none"
                aria-label={`Call us directly on ${phoneNumber}`}
                title={`Call us directly on ${phoneNumber}`}
              >
                {phoneNumber}
              </a>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};
