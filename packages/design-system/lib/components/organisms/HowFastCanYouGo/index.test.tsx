import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { vi } from "vitest";

import { HowFastCanYouGo } from "./index";

describe("HowFastCanYouGo component", () => {
  const props: React.ComponentProps<typeof HowFastCanYouGo> = {
    postcode: "PO9 6YA",
    setPostcode: vi.fn(),
    onPostcodeSubmit: vi.fn(),
  };

  it("renders the PostcodeChecker", () => {
    render(<HowFastCanYouGo {...props} />);
    expect(
      screen.getByText("Ready for ridiculously fast full fibre?"),
    ).toBeInTheDocument();
    expect(screen.getByText("Let's go")).toBeInTheDocument();
  });

  it("fires the onPostcodeSubmit function when the submit button is clicked", async () => {
    render(<HowFastCanYouGo {...props} />);
    await userEvent.click(screen.getByText("Let's go"));
    expect(props.onPostcodeSubmit).toHaveBeenCalledTimes(1);
  });
});
