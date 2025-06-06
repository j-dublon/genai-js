import "@testing-library/jest-dom/vitest";
import { MockedFunction, vi } from "vitest";

const mockedFetch = vi.fn() as MockedFunction<typeof fetch>;
global.fetch = mockedFetch;
process.env.PAYLOAD_DOMAIN_NAME = "https://cms-cuckoo.com";

export { mockedFetch };
