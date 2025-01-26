import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";

describe("Page", () => {
  it("renders the link to join flow", () => {
    // render(<Page />);

    // Check if the link is in the document
    const link = screen.getByText("Link to join flow");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/join-flow");
    expect(link).toHaveClass("rounded-full");
  });
});
