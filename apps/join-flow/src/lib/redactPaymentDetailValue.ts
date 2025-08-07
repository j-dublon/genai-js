export const redactPaymentDetailValue = (
  value: string | number,
  maskChar: string = "X",
): string => {
  const str = value.toString();

  const sortCodeRegex = /^\d{2}-\d{2}-\d{2}$/;
  if (sortCodeRegex.test(str)) {
    const parts = str.split("-");
    return `${maskChar}${maskChar}-${maskChar}${maskChar}-${parts[2]}`;
  }

  const visibleDigits = 4;
  const maskLength = Math.max(0, str.length - visibleDigits);
  const mask = maskChar.repeat(maskLength);
  return mask + str.slice(-visibleDigits);
};
