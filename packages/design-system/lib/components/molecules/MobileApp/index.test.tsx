import { render, screen } from "@testing-library/react";
import { MobileApp } from "@components/molecules/MobileApp";

describe("MobileApp Component", () => {
  const mockProps = {
    headingText: "It's all in hand with the app",
    textItems: [
      {
        itemText: "Manage your order and installation",
      },
    ],
  };
  it("renders the component", () => {
    render(<MobileApp {...mockProps} />);

    const heading = screen.getByRole("heading", {
      name: "It's all in hand with the app",
    });

    expect(heading).toBeInTheDocument();

    const boldText = screen.getAllByText(
      /Manage your order and installation/i
    )[0];

    expect(boldText).toBeInTheDocument();
  });
});
