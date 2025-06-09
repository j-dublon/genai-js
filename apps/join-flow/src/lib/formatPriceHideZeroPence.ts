export const formatPriceHideZeroPence = (amountPence: number): string => {
  return `£${(amountPence / 100).toFixed(2).replace(/\.00/, "")}`;
};
