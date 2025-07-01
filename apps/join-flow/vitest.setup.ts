import "@testing-library/jest-dom";
// This is required for fake timers to play nicely with userEvent
vi.stubGlobal("jest", { advanceTimersByTime: vi.advanceTimersByTime.bind(vi) });
