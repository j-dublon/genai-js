import { render, screen } from "@testing-library/react";

import { LegalClaims } from "./";

describe("LegalClaims", () => {
  test("renders the component", () => {
    render(<LegalClaims />);
    const headingElement = screen.getByText("Stats and claims");
    expect(headingElement).toBeInTheDocument();
  });

  test("renders the correct number of list items", () => {
    render(<LegalClaims />);
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(7);
  });

  test("renders links with correct URLs", () => {
    render(<LegalClaims />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute(
      "href",
      "https://www.cuckoo.co/legal/terms",
    );
    expect(links[1]).toHaveAttribute(
      "href",
      "https://www.ofcom.org.uk/siteassets/resources/documents/consultations/category-1-10-weeks/254969-improving-broadband-information-for-customers-/associated-documents/broadband-info-terminology-report.pdf?v=321949",
    );
    expect(links[2]).toHaveAttribute(
      "href",
      "https://www.ofcom.org.uk/siteassets/resources/documents/research-and-data/multi-sector/infrastructure-research/connected-nations-2024/connected-nations-uk-report-2024.pdf?v=386497",
    );
    expect(links[3]).toHaveAttribute("href", "http://eero.com/eero-plus");
    expect(links[4]).toHaveAttribute(
      "href",
      "https://www.cuckoo.co/legal/terms",
    );
  });

  test("applies the correct background color class when specified", () => {
    const { container } = render(<LegalClaims backgroundColor="blue" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("ds:bg-secondary-blue");
  });

  test("applies the default white background color class when not specified", () => {
    const { container } = render(<LegalClaims />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("ds:bg-core-white");
  });
});
