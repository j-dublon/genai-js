import { format } from "date-fns";

export const formatDisplayDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, "EEEE d MMMM yyyy");
};

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
