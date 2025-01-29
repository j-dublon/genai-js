import { render, screen } from "@testing-library/react";
import { AccountAppButton } from ".";

describe("AccountAppButton Component", () => {
  it("renders the AccountAppButton with the app store and google play logo", () => {
    render(<AccountAppButton />);

    const appStore = screen.getAllByRole("link")[0];
    const googlePlay = screen.getAllByRole("link")[1];
    expect(appStore).toBeInTheDocument();
    expect(googlePlay).toBeInTheDocument();
  });
});
