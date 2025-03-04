import { MobileApp } from "@components/molecules/MobileApp";
import { render, screen } from "@testing-library/react";

describe("MobileApp Component", () => {
  const mockProps = {
    headingText: "It's all in hand with the app",
    textItems: [
      {
        itemText: "Manage your order and installation",
      },
    ],
    selectedTextIndex: 0,
    setSelectedTextIndex: vi.fn(),
  };
  it("renders the component", () => {
    render(<MobileApp {...mockProps} />);

    const heading = screen.getByRole("heading", {
      name: "It's all in hand with the app",
    });

    expect(heading).toBeInTheDocument();

    const boldText = screen.getAllByText(
      /Manage your order and installation/i,
    )[0];

    expect(boldText).toBeInTheDocument();
  });
});
