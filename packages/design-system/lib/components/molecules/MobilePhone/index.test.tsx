import { MobilePhone } from "@components/molecules/MobilePhone";
import { render, screen } from "@testing-library/react";

describe("MobilePhone Component", () => {
  it("renders the first mobile screen", () => {
    render(<MobilePhone selectedTextIndex={0} />);
    expect(
      screen.getByTestId("Phone displaying the account overview"),
    ).toBeInTheDocument();
  });
  it("renders the second mobile screen", () => {
    render(<MobilePhone selectedTextIndex={1} />);
    expect(
      screen.getByTestId("Phone displaying the bills overview"),
    ).toBeInTheDocument();
  });
  it("renders the third mobile screen", () => {
    render(<MobilePhone selectedTextIndex={2} />);
    expect(
      screen.getByTestId("Phone displaying the plan details"),
    ).toBeInTheDocument();
  });
  it("renders the fourth mobile screen", () => {
    render(<MobilePhone selectedTextIndex={3} />);
    expect(
      screen.getByTestId("Phone displaying the eero screen"),
    ).toBeInTheDocument();
  });
});
