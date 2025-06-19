import { format } from "date-fns";

export const formatDisplayDate = (dateString: string): string => {
  const date = new Date(dateString);

  return format(date, "EEEE d MMMM yyyy");
};

export const formatDisplayDateMonthYear = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, "MMMM yyyy");
};

export const getApril = (date: Date, yearsAhead: number = 0): string => {
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();

  // If we're in Jan-March (months 0-2), use base year + yearsAhead
  // If we're past March (months 3-11), use base year + yearsAhead + 1
  const targetYear =
    currentMonth <= 2 ? currentYear + yearsAhead : currentYear + yearsAhead + 1;
  const aprilDate = new Date(targetYear, 3, 1);

  return format(aprilDate, "MMMM yyyy");
};

// Convenience functions
export const nextApril = (date: Date): string => getApril(date, 0);
export const followingApril = (date: Date): string => getApril(date, 1);

export const formatDateOfBirth = (
  day: string,
  month: string,
  year: string,
  time: string = "00:00:00",
  timezone: string = "+00:00",
): string => {
  const paddedDay = day.padStart(2, "0");
  const paddedMonth = month.padStart(2, "0");

  return `${year}-${paddedMonth}-${paddedDay}T${time}${timezone}`;
};
