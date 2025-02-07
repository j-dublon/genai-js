import { vi } from "vitest";

const mockedFetch = vi.fn() as unknown as jest.MockedFunction<typeof fetch>;
global.fetch = mockedFetch;

export { mockedFetch };
