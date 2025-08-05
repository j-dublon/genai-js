import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StoreAddress } from "@/store/useJoinFlowStore";

import { AddressInfo } from "./AddressInfo";

describe("AddressInfo", () => {
  const mockAddress: StoreAddress = {
    line1: "123",
    line2: "Test Street",
    line3: "Test City",
    postcode: "ABC 123",
    identifiers: [],
  };

  const mockTitle = "Your Address";

  const defaultProps = {
    title: mockTitle,
    address: mockAddress,
  };

  it("should render the title correctly", () => {
    render(<AddressInfo {...defaultProps} />);

    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      mockTitle,
    );
  });

  it("should format and display complete address correctly", () => {
    render(<AddressInfo {...defaultProps} />);

    expect(
      screen.getByText("123 Test Street, Test City, ABC 123"),
    ).toBeInTheDocument();
  });

  it("should handle missing line2 in address", () => {
    const addressWithoutLine2: StoreAddress = {
      line1: "456",
      line2: "",
      line3: "Another City",
      postcode: "XYZ 789",
      identifiers: [],
    };

    render(
      <AddressInfo title="Service Address" address={addressWithoutLine2} />,
    );

    expect(screen.getByText("456, Another City, XYZ 789")).toBeInTheDocument();
  });

  it("should handle missing line3 in address", () => {
    const addressWithoutLine3: StoreAddress = {
      line1: "789",
      line2: "Main Road",
      line3: "",
      postcode: "DEF 456",
      identifiers: [],
    };

    render(
      <AddressInfo title="Billing Address" address={addressWithoutLine3} />,
    );

    expect(screen.getByText("789 Main Road, DEF 456")).toBeInTheDocument();
  });

  it("should handle address with only line1 and postcode", () => {
    const minimalAddress: StoreAddress = {
      line1: "999",
      line2: "",
      line3: "",
      postcode: "MIN 001",
      identifiers: [],
    };

    render(<AddressInfo title="Minimal Address" address={minimalAddress} />);

    expect(screen.getByText("999, MIN 001")).toBeInTheDocument();
  });
});
