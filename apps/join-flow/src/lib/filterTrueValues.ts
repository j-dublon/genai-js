export const filterTrueValues = <T extends Record<string, boolean | string>>(
  obj: T | undefined,
): Partial<T> => {
  if (!obj) return {};

  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) =>
        value === true || (typeof value === "string" && value.length > 0),
    ),
  ) as Partial<T>;
};

export const filterTrueBooleans = (
  obj: Record<string, boolean | string> | undefined,
): Record<string, boolean> => {
  if (!obj) return {};

  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value === true),
  ) as Record<string, boolean>;
};
