import { format } from "date-fns";

export const formatDisplayDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, "EEEE d MMMM yyyy");
};
