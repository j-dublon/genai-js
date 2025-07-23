import { beforeEach, describe, expect, it, vi } from "vitest";

import * as getEngineerAppointmentsModule from "@/services/helpers/getEngineerAppointments";
import {
  Appointment,
  EngineerAppointmentLookupResult,
} from "@/services/helpers/getEngineerAppointments";

import {
  fetchEngineerAppointments,
  getTimeSlotsForDate,
  type TimeSlot,
} from "./GoLiveDateUtils";

describe("fetchEngineerAppointments", () => {
  const setAppointmentError = vi.fn();
  const setAvailableAppointments = vi.fn();
  const setDocumentID = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sets appointments and document ID on successful fetch", async () => {
    const mockResponse: EngineerAppointmentLookupResult = {
      error: undefined,
      appointments: [
        {
          startDateTime: new Date("2024-07-01T09:00:00Z"),
          endDateTime: new Date("2024-07-01T10:00:00Z"),
          type: "am",
          selectionIdentifier: "slot1",
        },
      ],
      documentID: "doc123",
    };

    vi.spyOn(
      getEngineerAppointmentsModule,
      "getEngineerAppointments",
    ).mockResolvedValue(mockResponse);

    await fetchEngineerAppointments(
      setAppointmentError,
      setAvailableAppointments,
      setDocumentID,
      "quote123",
    );

    expect(setAppointmentError).not.toHaveBeenCalled();
    expect(setAvailableAppointments).toHaveBeenCalledWith(
      mockResponse.appointments,
    );
    expect(setDocumentID).toHaveBeenCalledWith(mockResponse.documentID);
  });

  it("handles response with error property true", async () => {
    const mockResponse: EngineerAppointmentLookupResult = {
      error: {
        type: "noAppointmentsFound",
        message: "No appointments available",
      },
      appointments: [],
      documentID: "doc123",
    };

    vi.spyOn(
      getEngineerAppointmentsModule,
      "getEngineerAppointments",
    ).mockResolvedValue(mockResponse);
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await fetchEngineerAppointments(
      setAppointmentError,
      setAvailableAppointments,
      setDocumentID,
      "quote123",
    );

    expect(setAppointmentError).toHaveBeenCalledWith(
      "Failed to fetch engineer appointments",
    );
    expect(setAvailableAppointments).toHaveBeenCalledWith([]);
    expect(setDocumentID).toHaveBeenCalledWith(mockResponse.documentID);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to fetch engineer appointments",
    );

    consoleErrorSpy.mockRestore();
  });

  it("handles exceptions and calls error handler", async () => {
    const error = new Error("Network failure");
    vi.spyOn(
      getEngineerAppointmentsModule,
      "getEngineerAppointments",
    ).mockRejectedValue(error);
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await fetchEngineerAppointments(
      setAppointmentError,
      setAvailableAppointments,
      setDocumentID,
      "quote123",
    );

    expect(setAppointmentError).toHaveBeenCalledWith(
      "Failed to fetch engineer appointments",
    );
    expect(setAvailableAppointments).not.toHaveBeenCalled();
    expect(setDocumentID).not.toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to fetch engineer appointments",
      error,
    );

    consoleErrorSpy.mockRestore();
  });
});

describe("getTimeSlotsForDate", () => {
  const baseAppointments: Appointment[] = [
    {
      startDateTime: new Date("2024-07-01T09:00:00Z"),
      endDateTime: new Date("2024-07-01T10:00:00Z"),
      type: "am",
      selectionIdentifier: "slot1",
    },
    {
      startDateTime: new Date("2024-07-01T14:00:00Z"),
      endDateTime: new Date("2024-07-01T15:00:00Z"),
      type: "pm",
      selectionIdentifier: "slot2",
    },
    {
      startDateTime: new Date("2024-07-02T09:00:00Z"),
      endDateTime: new Date("2024-07-02T10:00:00Z"),
      type: "am",
      selectionIdentifier: "slot3",
    },
    // Duplicate slot on same day should be ignored
    {
      startDateTime: new Date("2024-07-01T10:00:00Z"),
      endDateTime: new Date("2024-07-01T11:00:00Z"),
      type: "am",
      selectionIdentifier: "slot1",
    },
    // Appointment with unknown type or missing selectionIdentifier ignored
    {
      startDateTime: new Date("2024-07-01T10:00:00Z"),
      endDateTime: new Date("2024-07-01T11:00:00Z"),
      type: "unknown",
      selectionIdentifier: "slot4",
    },
    {
      startDateTime: new Date("2024-07-01T10:00:00Z"),
      endDateTime: new Date("2024-07-01T11:00:00Z"),
      type: "am",
      selectionIdentifier: undefined,
    },
  ];

  it("returns correct time slots for given date without duplicates", () => {
    const date = "2024-07-01";

    const slots: TimeSlot[] = getTimeSlotsForDate(baseAppointments, date);

    expect(slots).toHaveLength(2);
    expect(slots).toEqual(
      expect.arrayContaining([
        { label: "8am - 1pm", selectionIdentifier: "slot1" },
        { label: "1pm - 6pm", selectionIdentifier: "slot2" },
      ]),
    );
  });

  it("returns empty array if no appointments on date", () => {
    const date = "2024-07-03";

    const slots = getTimeSlotsForDate(baseAppointments, date);

    expect(slots).toEqual([]);
  });

  it("ignores appointments with unknown type or missing selectionIdentifier", () => {
    const date = "2024-07-01";

    const slots = getTimeSlotsForDate(baseAppointments, date);

    // slot4 (unknown type) and undefined selectionIdentifier are ignored
    expect(
      slots.find((slot) => slot.selectionIdentifier === "slot4"),
    ).toBeUndefined();
    expect(
      slots.find((slot) => slot.selectionIdentifier === undefined),
    ).toBeUndefined();
  });
});
