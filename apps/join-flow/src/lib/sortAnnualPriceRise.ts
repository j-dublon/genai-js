export type AnnualPriceRise = {
  price: number;
  date: string;
  id?: string | null;
};

export const sortAnnualPriceRiseByDate = (
  annualPriceRise: AnnualPriceRise[] | null | undefined,
): AnnualPriceRise[] | null => {
  if (!annualPriceRise || !Array.isArray(annualPriceRise)) {
    return null;
  }

  return [...annualPriceRise].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });
};
