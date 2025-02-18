import "@testing-library/jest-dom/vitest";
import { MockedFunction, vi } from "vitest";

const mockedFetch = vi.fn() as MockedFunction<typeof fetch>;
global.fetch = mockedFetch;

export { mockedFetch };
