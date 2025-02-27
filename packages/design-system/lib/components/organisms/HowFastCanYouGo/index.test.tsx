import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { HowFastCanYouGo } from "./index";

describe("HowFastCanYouGo component", () => {
  const props = {
    postcode: "PO9 6YA",
    setPostcode: vi.fn(),
  };
  it("renders the PostcodeChecker", () => {
    render(<HowFastCanYouGo {...props} />);
    expect(
      screen.getByText("Ready for ridiculously fast full fibre?"),
    ).toBeInTheDocument();
    expect(screen.getByText("Let's go")).toBeInTheDocument();
  });
});
