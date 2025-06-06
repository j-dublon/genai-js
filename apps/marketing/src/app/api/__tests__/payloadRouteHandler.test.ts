import logger from "@/lib/logger";

import { payloadRouteHandler } from "../payload/payloadRouteHandler";
import { successResponse } from "./assets/responses";

describe("When payload env vars are missing", () => {
  let url: string | undefined;

  beforeEach(() => {
    url = process.env.PAYLOAD_DOMAIN_NAME;
    process.env.PAYLOAD_DOMAIN_NAME = "";
  });

  afterEach(() => {
    process.env.PAYLOAD_DOMAIN_NAME = url;
  });

  it("returns a 500 response if the payload url hasnt been configured", async () => {
    const response = await payloadRouteHandler();
    const res = await response.json();
    expect(logger.error).toHaveBeenCalledWith(
      "Missing PAYLOAD_DOMAIN_NAME env variable",
    );
    expect(res).toStrictEqual({
      success: false,
      error: "Missing PAYLOAD_DOMAIN_NAME",
    });
  });
});

describe("Fetching dynamic content for the front page", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("returns a 200 response with hero banner content", async () => {
    const mockFetch = vi.fn((url: string) => {
      // Testing that fetch matches the get url exactly, otherwise fails
      if (url === "https://cms-cuckoo.com/api/pages/homepage") {
        return Promise.resolve({
          ok: true,
          json: () => successResponse,
        });
      }

      return Promise.resolve({
        ok: false,
        json: () => {},
      });
    });

    vi.stubGlobal("fetch", mockFetch);
    vi.mock("@/lib/logger");

    const response = await payloadRouteHandler();
    const res = await response.json();

    expect(res).toStrictEqual({ success: true, data: successResponse });
    expect(logger.info).toHaveBeenCalledWith("Fetching Payload data");
    expect(logger.info).toHaveBeenCalledWith(
      "Successfully fetched Payload data",
      successResponse,
    );
  });
});
