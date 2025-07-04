export const isBillingAddressesEqual = (
  address1:
    | {
        line1?: string | null;
        line2?: string | null;
        line3?: string | null;
        postcode?: string | null;
      }
    | null
    | undefined,
  address2:
    | {
        line1?: string | null;
        line2?: string | null;
        line3?: string | null;
        postcode?: string | null;
      }
    | null
    | undefined,
): boolean => {
  if (!address1 && !address2) return true;

  if (!address1 || !address2) return false;

  const normalize = (value: string | null | undefined): string => value || "";

  return (
    normalize(address1.line1) === normalize(address2.line1) &&
    normalize(address1.line2) === normalize(address2.line2) &&
    normalize(address1.line3) === normalize(address2.line3) &&
    normalize(address1.postcode) === normalize(address2.postcode)
  );
};
