import { beforeEach, describe, expect, it, Mock, vi } from "vitest";

import { squidAPI } from "@/services/payloadClient";
import { FetchError, ValidationError } from "@/services/payloadTypes";

import { getEngineerAppointments } from "./getEngineerAppointments";

vi.mock("@/services/payloadClient", () => ({
  squidAPI: {
    createEngineerAppointmentSync: vi.fn(),
  },
}));

describe("getEngineerAppointments", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns appointments on successful response", async () => {
    const mockResponse = {
      state: "success",
      data: {
        response: {
          appointments: [
            {
              startDateTime: "2023-01-01T10:00:00Z",
              endDateTime: "2023-01-01T11:00:00Z",
              type: "inspection",
            },
          ],
        },
      },
    };
    (squidAPI.createEngineerAppointmentSync as Mock).mockResolvedValue(
      mockResponse,
    );

    const result = await getEngineerAppointments("some-id");

    expect(result.error).toBeUndefined();
    expect(result.appointments).toHaveLength(1);
    expect(result.appointments[0].type).toBe("inspection");
    expect(result.appointments[0].startDateTime).toBeInstanceOf(Date);
  });

  it("returns noAppointmentsFound error when specific error block is present", async () => {
    const mockResponse = {
      state: "error",
      data: {
        errors: [
          {
            blockType: "EngineerAppointmentsNonAvailable",
            errorMessage: "No appointments available",
          },
        ],
      },
    };
    (squidAPI.createEngineerAppointmentSync as Mock).mockResolvedValue(
      mockResponse,
    );

    const result = await getEngineerAppointments("some-id");

    expect(result.appointments).toEqual([]);
    expect(result.error).toMatchObject({
      type: "noAppointmentsFound",
      message: "No appointments found at this time",
    });
  });

  it("returns generalError with details when error response without noAppointments error", async () => {
    const mockResponse = {
      state: "error",
      data: {
        errors: [
          {
            blockType: "SomeOtherError",
            errorMessage: "Something went wrong",
          },
          {
            blockType: "AnotherError",
          },
        ],
      },
    };
    (squidAPI.createEngineerAppointmentSync as Mock).mockResolvedValue(
      mockResponse,
    );

    const result = await getEngineerAppointments("some-id");

    expect(result.appointments).toEqual([]);
    expect(result.error).toMatchObject({
      type: "generalError",
      message: "There was a problem with the engineer appointment lookup",
      details: ["Something went wrong", "AnotherError"],
    });
  });

  it("returns generalError when no appointment data is returned", async () => {
    const mockResponse = {
      state: "success",
      data: {},
    };
    (squidAPI.createEngineerAppointmentSync as Mock).mockResolvedValue(
      mockResponse,
    );

    const result = await getEngineerAppointments("some-id");

    expect(result.appointments).toEqual([]);
    expect(result.error).toMatchObject({
      type: "generalError",
      message: "No appointment data was returned",
    });
  });

  it("returns validationError when ValidationError is thrown", async () => {
    const validationError = new ValidationError([
      { path: "id", message: "Must be a string" },
    ]);
    (squidAPI.createEngineerAppointmentSync as Mock).mockRejectedValue(
      validationError,
    );

    const result = await getEngineerAppointments("some-id");

    expect(result.appointments).toEqual([]);
    expect(result.error).toMatchObject({
      type: "validationError",
      message: "The quoting code is invalid",
      details: ["id is invalid: Must be a string"],
    });
  });

  it("returns networkError when FetchError is thrown", async () => {
    const fetchError = new FetchError(
      500,
      "Internal Server Error",
      "http://example.com/api",
      {},
      new Response(null, { status: 500, statusText: "Internal Server Error" }),
    );
    (squidAPI.createEngineerAppointmentSync as Mock).mockRejectedValue(
      fetchError,
    );

    const result = await getEngineerAppointments("some-id");

    expect(result.appointments).toEqual([]);
    expect(result).toEqual({
      appointments: [],
      error: {
        type: "networkError",
        message: "Server error: HTTP Error: 500 Internal Server Error",
        details: ["Status: 500"],
      },
    });
  });

  it("returns unknownError for unexpected errors", async () => {
    const unknownError = new Error("Unexpected failure");
    (squidAPI.createEngineerAppointmentSync as Mock).mockRejectedValue(
      unknownError,
    );

    const result = await getEngineerAppointments("some-id");

    expect(result.appointments).toEqual([]);
    expect(result.error).toMatchObject({
      type: "unknownError",
      message: "An unexpected error occurred",
      details: ["Unexpected failure"],
    });
  });
});
