interface AddressLookup {
  line1: string;
  line2: string;
  line3: string;
  postcode: string;
}

export const formatServiceAddress = (address: AddressLookup) => {
  return [
    [address.line1, address.line2].filter(Boolean).join(" "),
    address.line3,
    address.postcode,
  ]
    .filter(Boolean)
    .join(", ");
};
