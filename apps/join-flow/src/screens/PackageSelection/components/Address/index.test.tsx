import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useAddress } from "@/hooks/useAddress";
import { Address } from "@/screens/PackageSelection/components/Address";

vi.mock("@/hooks/useAddress", () => ({
  useAddress: vi.fn(),
}));

describe("Address", () => {
  const mockUseAddress = (options = {}) => {
    vi.mocked(useAddress).mockReturnValue({
      selectedAddress: null,
      loading: false,
      error: null,
      addresses: [],
      fetchAddresses: vi.fn(),
      selectAddress: vi.fn(),
      ...options,
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAddress();
  });

  it("shows loading state when address is loading", () => {
    mockUseAddress({ loading: true });

    render(<Address />);
    expect(screen.getByText("Loading your address...")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows error state when there is an address error", () => {
    const errorMessage = "Failed to load address";
    mockUseAddress({ error: errorMessage });

    render(<Address />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("shows the formatted address when an address is selected", () => {
    const mockAddress = {
      addressKey: "12345",
      addressKeyType: "UPRN",
      line1: "123 Test Street",
      line2: "Apt 4B",
      line3: "Test Area",
      nad: "NAD12345",
      postcode: "TE1 1ST",
      uprn: "100123456789",
    };

    mockUseAddress({ selectedAddress: mockAddress });

    render(<Address />);
    expect(
      screen.getByText("123 Test Street, Apt 4B, Test Area, TE1 1ST"),
    ).toBeInTheDocument();
  });

  it("shows 'No address information available' when no address is selected", () => {
    render(<Address />);
    expect(
      screen.getByText("No address information available"),
    ).toBeInTheDocument();
  });

  it("renders the 'Change my address' link when address is not loading", () => {
    render(<Address />);
    expect(
      screen.getByRole("link", { name: "Change my address" }),
    ).toBeInTheDocument();
  });

  it("does not render the 'Change my address' link when address is loading", () => {
    mockUseAddress({ loading: true });

    render(<Address />);
    expect(screen.queryByText("Change my address")).not.toBeInTheDocument();
  });
});
