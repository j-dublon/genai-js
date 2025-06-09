import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { OtsFailBanner } from "./OtsFailBanner";

vi.mock("next/link", () => {
  return {
    default: function MockLink({
      children,
      href,
      className,
    }: {
      children: React.ReactNode;
      href: string;
      className?: string;
    }) {
      return (
        <a href={href} className={className}>
          {children}
        </a>
      );
    },
  };
});

const mockBannerText =
  "We couldn't find your current provider. Please let them know you are switching!";

describe("OtsFailBanner", () => {
  it("should render the banner with correct content", () => {
    render(<OtsFailBanner bannerText={mockBannerText} />);

    expect(screen.getByText("Important info:")).toBeInTheDocument();
    expect(
      screen.getByText(/We couldn't find your current provider/),
    ).toBeInTheDocument();
  });

  it("should render the InsertLink component with correct props", () => {
    render(<OtsFailBanner bannerText={mockBannerText} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
    expect(link).toHaveTextContent("let them know");
  });
});
