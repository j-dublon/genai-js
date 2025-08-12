import { Appointment } from "@/services/helpers/getEngineerAppointments";

export type TimeSlot = {
  label: string;
  selectionIdentifier: string;
};

export const getTimeSlotsForDate = (
  appointments: Appointment[],
  selectedDate: string,
): TimeSlot[] => {
  const timeSlotLabelMap: Record<string, string> = {
    am: "8am - 1pm",
    pm: "1pm - 6pm",
  };
  const selected = new Date(selectedDate);
  selected.setHours(0, 0, 0, 0);

  const appointmentsOnDate = appointments.filter((appt) => {
    const apptDate = new Date(appt.startDateTime);
    apptDate.setHours(0, 0, 0, 0);
    return apptDate.getTime() === selected.getTime();
  });

  // To avoid duplicates, use a Map keyed by type or selectionIdentifier
  const uniqueSlotsMap = new Map<string, TimeSlot>();

  appointmentsOnDate.forEach((appt) => {
    const label = timeSlotLabelMap[appt.type];
    if (
      label &&
      appt.selectionIdentifier &&
      !uniqueSlotsMap.has(appt.selectionIdentifier)
    ) {
      uniqueSlotsMap.set(appt.selectionIdentifier, {
        label,
        selectionIdentifier: appt.selectionIdentifier,
      });
    }
  });

  return Array.from(uniqueSlotsMap.values());
};
